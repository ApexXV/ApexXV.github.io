"""Generate web-ready brand assets from the supplied AP3X artwork.
Usage (from source/): python3 scripts/brand-assets.py brand-artwork public
Requires Pillow. Regenerates public/brand/*, favicons, apple-touch-icon, og-image.jpg and hero art.
"""
import sys
from pathlib import Path
from PIL import Image

art = Path(sys.argv[1])
pub = Path(sys.argv[2])
brand = pub / "brand"
brand.mkdir(parents=True, exist_ok=True)

MIDNIGHT = (16, 41, 54)       # #102936
CANVAS = (10, 29, 40)         # #0a1d28, page background
BANNER_BG = (12, 37, 53)      # sampled from the banner's edges
WHITE = (245, 247, 246)       # #F5F7F6
CYAN = (56, 189, 202)         # #38BDCA

symbol = Image.open(art / "logos/ap3x-symbol-navy-teal-transparent.png").convert("RGBA")
horizontal = Image.open(art / "logos/ap3x-logo-horizontal-navy-teal-transparent.png").convert("RGBA")
banner = Image.open(art / "graphics/ap3x-banner-dark.png").convert("RGB")


def trim(img, pad_ratio=0.04):
    bbox = img.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    l, t, r, b = bbox
    pad = int(max(r - l, b - t) * pad_ratio)
    return img.crop((max(0, l - pad), max(0, t - pad), min(img.width, r + pad), min(img.height, b + pad)))


def reverse_colours(img):
    """Navy component -> off-white, teal component -> cyan. Alpha preserved."""
    out = Image.new("RGBA", img.size)
    src = img.load()
    dst = out.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = src[x, y]
            if a == 0:
                dst[x, y] = (0, 0, 0, 0)
                continue
            # Teal pixels have strong green/blue and almost no red; navy is dark overall.
            is_teal = (g + b) > 180 and r < 60
            dst[x, y] = (*(CYAN if is_teal else WHITE), a)
    return out


def fit(img, box, resample=Image.LANCZOS):
    w, h = img.size
    scale = min(box / w, box / h)
    return img.resize((max(1, round(w * scale)), max(1, round(h * scale))), resample)


def icon(size, mark, bg, mark_ratio=0.74, radius_ratio=0.0):
    canvas = Image.new("RGBA", (size, size), (*bg, 255))
    m = fit(mark, int(size * mark_ratio))
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    if radius_ratio:
        from PIL import ImageDraw
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255)
        bgless = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        bgless.paste(canvas, mask=mask)
        return bgless
    return canvas


# 1. Trimmed symbol, original colours (light surfaces) and reversed (dark surfaces).
sym = trim(symbol)
sym_rev = reverse_colours(sym)
fit(sym, 512).save(brand / "ap3x-symbol.png", optimize=True)
fit(sym_rev, 512).save(brand / "ap3x-symbol-reversed.png", optimize=True)

# 2. Trimmed horizontal logo: original for light surfaces, reversed for the dark site.
hor = trim(horizontal, 0.0)
fit(hor, 1400).save(brand / "ap3x-logo-horizontal.png", optimize=True)
hor_rev = reverse_colours(hor)
hor_rev_web = hor_rev.resize((800, round(hor_rev.height * 800 / hor_rev.width)), Image.LANCZOS)
hor_rev_web.save(brand / "ap3x-logo-horizontal-reversed.png", optimize=True)
hor_rev_web.save(brand / "ap3x-logo-horizontal-reversed.webp", lossless=True, method=6)

# 3. Favicons and app icons: reversed symbol on the page background.
for size, name in [(32, "favicon-32.png"), (192, "favicon-192.png"), (512, "favicon-512.png")]:
    icon(size, sym_rev, CANVAS).convert("RGBA").save(pub / name, optimize=True)
icon(180, sym_rev, CANVAS).convert("RGB").save(pub / "apple-touch-icon.png", optimize=True)
icon(48, sym_rev, CANVAS).save(pub / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


# 4b. Hero art: midnight backdrop, faint stepped bands echoing the banner, full emblem.
def hero(w, h, emblem_box, emblem_center, show_emblem=True):
    from PIL import ImageDraw, ImageFilter
    base = Image.new("RGBA", (w, h), (*CANVAS, 255))
    # Soft radial lift behind the emblem area.
    glow = Image.new("L", (w, h), 0)
    gx, gy = emblem_center
    r = int(emblem_box * 1.1)
    ImageDraw.Draw(glow).ellipse((gx - r, gy - r, gx + r, gy + r), fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(r // 2))
    base.paste(Image.new("RGBA", (w, h), (*MIDNIGHT, 255)), mask=glow)
    # Banner-style diagonal bands in the background (not touching the emblem itself).
    bands = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(bands)
    band = (20, 56, 74, 150)
    u = emblem_box / 6
    for i, off in enumerate((-2.2, 1.6, 4.4)):
        x0 = gx + off * u * 1.6
        y0 = gy - 3.4 * u + i * 2.6 * u
        d.polygon([(x0, y0), (x0 + 5 * u, y0), (x0 + 9 * u, y0 + 4 * u), (x0 + 4 * u, y0 + 4 * u)], fill=band)
    base.alpha_composite(bands)
    if show_emblem:
        m = fit(sym_rev, emblem_box)
        base.alpha_composite(m, (gx - m.width // 2, gy - m.height // 2))
    return base.convert("RGB")


# Desktop: emblem near the right edge, clear of the headline (CSS pins this image right).
hero(2400, 900, 400, (2000, 450)).save(pub / "ap3x-hero.webp", quality=88, method=6)
# Phones and tablets: hero text covers the art, so bands only; the header carries the logo.
hero(1080, 1350, 420, (820, 1080), show_emblem=False).save(pub / "ap3x-mobile.webp", quality=88, method=6)

# 4. Social preview: the supplied dark banner, letterboxed to 1200x630 with its own background colour.
og = Image.new("RGB", (1200, 630), BANNER_BG)
b = banner.resize((1200, round(banner.height * 1200 / banner.width)), Image.LANCZOS)
og.paste(b, (0, (630 - b.height) // 2))
og.save(pub / "og-image.jpg", quality=90, optimize=True, progressive=True)

for p in sorted(list(brand.iterdir()) + [pub / n for n in ["favicon-32.png", "favicon-192.png", "favicon-512.png", "favicon.ico", "apple-touch-icon.png", "og-image.jpg", "ap3x-hero.webp", "ap3x-mobile.webp"]]):
    im = Image.open(p)
    print(f"{p.relative_to(pub)}: {im.size[0]}x{im.size[1]} {im.mode} {p.stat().st_size // 1024} KB")
