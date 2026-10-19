"""Build the website photos from the edited masters, with the AP3X logo in a corner.

Usage (from source/): python3 scripts/photo-assets.py
Requires Pillow. Reads photo-masters/*.jpg and public/brand/*, writes public/work/*.webp.

The masters are already colour-corrected and cropped (house keys blurred). Each output
gets the horizontal logo in its calmest corner (bottom-right unless another is clearly cleaner): the navy/teal version on light backgrounds and
the white/cyan version on dark ones, chosen from the brightness under the logo.
"""
from pathlib import Path
from PIL import Image, ImageFilter, ImageStat

root = Path(__file__).resolve().parent.parent
masters = root / "photo-masters"
out = root / "public" / "work"
out.mkdir(parents=True, exist_ok=True)

logo_light_bg = Image.open(root / "public/brand/ap3x-logo-horizontal.png").convert("RGBA")
logo_dark_bg = Image.open(root / "public/brand/ap3x-logo-horizontal-reversed.png").convert("RGBA")

LOGO_WIDTH = 0.24   # share of image width
MARGIN = 0.035      # share of image width
OPACITY = 0.92


def busyness(region):
    """Edge energy plus tonal spread: low means a calm patch for the logo."""
    g = region.convert("L")
    edges = ImageStat.Stat(g.filter(ImageFilter.FIND_EDGES)).mean[0]
    return edges * 2 + ImageStat.Stat(g).stddev[0]


def stamp(img, corner=None, variant=None):
    img = img.convert("RGB")
    w, h = img.size
    lw = round(w * LOGO_WIDTH)
    m = round(w * MARGIN)
    lh = round(logo_light_bg.height * lw / logo_light_bg.width)
    boxes = {
        "bottom-right": (w - m - lw, h - m - lh, w - m, h - m),
        "bottom-left": (m, h - m - lh, m + lw, h - m),
        "top-right": (w - m - lw, m, w - m, m + lh),
        "top-left": (m, m, m + lw, m + lh),
    }
    if corner is None:
        # Prefer bottom-right; move only if another corner is clearly calmer.
        scores = {k: busyness(img.crop(b)) * (0.8 if k == "bottom-right" else 1.0) for k, b in boxes.items()}
        corner = min(scores, key=scores.get)
    box = boxes[corner]
    lum = ImageStat.Stat(img.crop(box).convert("L")).mean[0]
    if variant is None:
        variant = "navy" if lum >= 128 else "white"
    logo = logo_light_bg if variant == "navy" else logo_dark_bg
    logo = logo.resize((lw, lh), Image.LANCZOS)
    logo.putalpha(logo.getchannel("A").point(lambda a: round(a * OPACITY)))
    canvas = img.convert("RGBA")
    canvas.alpha_composite(logo, (box[0], box[1]))
    return canvas.convert("RGB"), corner, variant, round(lum)


def fit_width(img, width):
    return img if img.width <= width else img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)


# name: (master file, crop box or None, output width[, forced corner, forced logo variant])
JOBS = {
    "homelab-rack": ("homelab-rack.jpg", None, 700),
    "homelab-rack-thumb": ("homelab-rack.jpg", (0, 700, 825, 1731), 640),
    "key-rack": ("key-rack.jpg", None, 880),
    "key-rack-thumb": ("key-rack.jpg", (0, 0, 880, 1100), 640),
    "batch-plate": ("batch-plate.jpg", None, 900),
    "batch-plate-thumb": ("batch-plate.jpg", (0, 44, 1050, 1356), 640),
    "x1c-ams": ("x1c-ams.jpg", None, 900),
    # 16:9, bottom-aligned so the logo sits below the units' own labels.
    "ams-ht": ("ams-ht.jpg", (0, 413, 1310, 1150), 900, "bottom-right", "white"),
