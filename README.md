# AP3X Operations website

Public site for AP3X Operations LLC, served by GitHub Pages at
https://ap3xoperations.com from the root of the `main` branch.

## Layout

| Path | What it is |
| --- | --- |
| `source/` | The Next.js project. Edit here. |
| everything else at the root | The static export generated from `source/`. Do not edit by hand. |
| `CNAME` | Custom domain for GitHub Pages. Keep. |
| `.nojekyll` | Stops Pages from dropping the `_next/` folder. Keep. |

## Making a change

Requires Node.js 22.13 or newer.

```sh
cd source
npm ci                 # first time, or after package-lock.json changes
# edit app/page.tsx, app/layout.tsx, app/globals.css, public/ ...
npm run build          # writes out/
npm run verify         # checks the export is complete and assets unchanged
node scripts/publish.mjs   # copies out/ to the repo root
cd ..
git add -A && git commit -m "Describe the change" && git push origin main
```

GitHub Pages redeploys within a minute or two of the push.

To preview the export locally before publishing:

```sh
cd source && npm run serve     # http://127.0.0.1:4173
```

## Where things live in the source

- `app/page.tsx`: homepage content. Services, process steps, principles and
  contact details are plain arrays at the top of the file.
- `app/layout.tsx`: site title, description, social preview tags, icons and
  the structured-data block for search engines.
- `app/not-found.tsx`: the 404 page.
- `app/globals.css`: all styling.
- `app/deductions/`: the owner-only Deductions shell. It stores the private
  Apps Script URL in the browser only. Nothing private is in this repo.
- `public/`: images, icons, manifests, `robots.txt`, `sitemap.xml` and the
  social preview image `og-image.jpg`.
- `public/brand/`: web logo files. The reversed horizontal logo is used in
  the header and footer.
- `brand-artwork/`: the original AP3X artwork package of 2026-10-19 with its
  own README and palette. These are the masters; they are not served as-is.
- `scripts/brand-assets.py`: regenerates the logos, favicons, touch icon,
  social image and hero art from `brand-artwork/`. Run it from `source/`
  with `python3 scripts/brand-assets.py brand-artwork public` (needs Pillow),
  then build and publish as above.

## Photos

- `photo-masters/`: the edited photos (color-corrected, cropped, house keys
  blurred), without the logo. Keep originals with personal details out of the
  repo; it is public.
- `scripts/photo-assets.py`: builds `public/work/*.webp` from the masters and
  stamps the AP3X logo in a clean corner. To add a photo, save an edited JPG in
  `photo-masters/`, add a line to `JOBS` in the script, run
  `python3 scripts/photo-assets.py` from `source/`, then reference the new file
  in the page and build and publish as above.

## Brand colours

Defined as CSS variables at the top of `app/globals.css`, based on the
artwork package: midnight `#102936`, teal `#087e91`, cyan `#38bdca` and
off-white `#f5f7f6`. The page background is a slightly deeper midnight,
`#0a1d28`.

## Rules

- This repository is public. Never commit tokens, keys or the Apps Script
  `/exec` URL.
- Keep `.nojekyll` and `CNAME` at the root.
- Rebuild from `source/` rather than editing the exported HTML. React
  re-renders the page on load, so hand edits to the body are discarded.

## Timelapse clips

- `public/video/`: silent looping clips (H.264 MP4 plus VP9 WebM fallback) and
  a WebP poster for each. They play only while on screen.
- `scripts/video-assets.sh`: builds them from the printer's timelapse exports.
  Originals stay out of the repo. Run from `source/` with
  `bash scripts/video-assets.sh <folder with the .mp4 files>`, after adding the
  clip to the `CLIPS` list (name, filename prefix, speed). Then add it to the
  `timelapses` list in `app/printing/page.tsx`, and build and publish.
