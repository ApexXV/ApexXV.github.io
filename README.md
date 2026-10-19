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

## Rules

- This repository is public. Never commit tokens, keys or the Apps Script
  `/exec` URL.
- Keep `.nojekyll` and `CNAME` at the root.
- Rebuild from `source/` rather than editing the exported HTML. React
  re-renders the page on load, so hand edits to the body are discarded.
