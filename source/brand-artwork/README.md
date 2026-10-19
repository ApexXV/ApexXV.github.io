# AP3X Operations LLC — Artwork Handoff

**Package:** Initial artwork set · 19 October 2026  
**Business:** AP3X Operations LLC  
**Website address used in the artwork:** https://ap3xoperations.com  
**Prepared for:** Sebastien Gifford

## Start here

This package contains the four new AP3X graphics created in this conversation, together with practical context for a developer, designer, or another AI agent implementing them. The original PNG files are preserved byte-for-byte; the package gives them descriptive filenames.

Use **`logos/ap3x-symbol-navy-teal-transparent.png`** as the standalone business emblem. Use **`logos/ap3x-logo-horizontal-navy-teal-transparent.png`** when the emblem and full company name should appear together.

The user's defining instruction was:

> “i dont want just AP3X Or the long text in the logo i want some genuine logo”

The user subsequently requested this ZIP and README so they could push the new artwork. Carry forward the actual symbol shown in these files. The company name must remain **AP3X Operations LLC**, with the numeral **3** in AP3X.

## Contents and intended uses

| File | Dimensions | Background | Intended use |
| --- | --- | --- | --- |
| `logos/ap3x-symbol-navy-teal-transparent.png` | 1254 × 1254 px | Transparent RGBA | Standalone emblem for branding, compact identity placements, and source artwork for future icon exports. |
| `logos/ap3x-logo-horizontal-navy-teal-transparent.png` | 1942 × 809 px | Transparent RGBA | Full company logo for light website headers, document headers, proposals, and other placements requiring the company name. |
| `graphics/ap3x-banner-dark.png` | 1983 × 793 px | Opaque RGB; dark navy composition | Wide business graphic containing the company name, reversed emblem, and website address. |
| `reference/ap3x-visual-identity-overview.png` | 1536 × 1024 px | Opaque RGB; mixed light and dark panels | Visual reference showing the logo treatment, proposed palette, and examples of reversed and monochrome treatments. |
| `brand-colors.css` | Text | Not applicable | Optional CSS custom properties implementing the intended colour values below. |
| `asset-manifest.json` | JSON | Not applicable | Image paths, dimensions, colour modes, transparency information, file sizes, SHA-256 hashes, and intended colour values. |
| `README.md` | Markdown | Not applicable | This handoff document. |

The two transparent PNGs contain actual alpha transparency. If a viewer displays black, white, or a checkerboard behind them, that may be the viewer's transparency display. Preserve their alpha channel when adding them to the project.

## Design concept

The emblem consists of two opposing, interlocking geometric components, separated by a stepped diagonal open channel. The lower-left component is navy and the upper-right component is teal. The design intent is coordination, stable systems, and forward movement, expressed through substantial, precision-shaped forms.

The company name is separate from the emblem in the horizontal logo. The symbol can therefore identify the business on its own. The visual direction uses dark navy, teal, cyan, and off-white, with a restrained technical and professional appearance.

Preserve the emblem's orientation, silhouette, spacing, and relative component proportions. Retain the complete open channel. Do not stretch, skew, rotate, mirror, crop through the symbol, recolour it arbitrarily, or introduce shadows and decorative effects during implementation.

Use the **standalone symbol PNG** as the primary geometry reference. The other images are generated applications of that design; the overview is a visual reference rather than a measured construction drawing.

## Intended colour values

These are the intended values used in the design brief and on the overview. They are useful implementation tokens for surrounding website elements. Generated pixels include antialiasing and tonal variation, so use these explicit values rather than trying to sample a perfectly flat colour from every part of a PNG.

| Token | Value | Role |
| --- | --- | --- |
| Midnight | `#102936` | Main dark brand colour and dark graphic backgrounds. |
| Teal | `#087E91` | Primary accent and colour emblem component. |
| Cyan | `#38BDCA` | Brighter accent in dark-background applications. |
| White / off-white | `#F5F7F6` | Light surfaces and reverse-branding direction. |

`brand-colors.css` defines these four values under `--ap3x-midnight`, `--ap3x-teal`, `--ap3x-cyan`, and `--ap3x-white`. It only declares custom properties; it does not change page layout or apply global styles.

Choose accessible text/background combinations within the actual page. The palette table is a colour specification, not a certification of every possible colour pairing.

## Adding the artwork to a website

1. Extract the archive and inspect the existing site's asset conventions. A suggested destination is `public/brand/ap3x/v1/` **if the project serves its `public` directory from the site root**. Otherwise adapt the destination and URLs to the project's existing setup.
2. Copy the `logos/` and `graphics/` folders into that destination. Keep the filenames descriptive. The overview can remain with project documentation rather than become a visible website section.
3. Place the horizontal logo on a white or light surface. Its lettering and one symbol component are dark navy, so the supplied transparent version is intended for light backgrounds. On a dark navigation bar, give it a suitable light container or create a dedicated reversed asset as a separate follow-up.
4. Use the standalone emblem where a compact symbol is appropriate. Maintain its natural aspect ratio and preserve the surrounding clear space. The supplied square image includes transparent margins; account for those margins when judging the visible size in a layout.
5. Use the wide banner as a finished composition when its full text and website address fit the intended placement. Avoid a forced crop that cuts off the name, emblem, or address. For a responsive section, preserve the full aspect ratio or implement an adaptive layout using the separate logo asset and live text.
6. Add useful alternative text. Suggested text: `AP3X Operations LLC` for an identity image or home link. For the banner, use `AP3X Operations LLC — ap3xoperations.com` when that information is not already stated alongside it. A purely decorative duplicate should have empty alt text.
7. Review the result on desktop and mobile: confirm legibility, contrast, spacing, successful loading, and an intact symbol. The ordinary build or preview process for the existing project should catch integration errors.

### Framework-neutral image example

The URL below assumes the suggested directory above is served at `/brand/ap3x/v1/`. Adapt it to the actual project; this package does not establish the site's framework or file structure.

```html
<a href="/" aria-label="AP3X Operations LLC home">
  <img
    src="/brand/ap3x/v1/logos/ap3x-logo-horizontal-navy-teal-transparent.png"
    alt="AP3X Operations LLC"
    width="1942"
    height="809"
    class="ap3x-company-logo"
  />
</a>
```

```css
.ap3x-company-logo {
  display: block;
  width: 18rem;
  max-width: 100%;
  height: auto;
}
```

The width is a starting point, not a fixed brand rule. Inspect the actual layout and adjust it to keep the small company-name line legible. Keep the intrinsic width and height attributes or equivalent aspect-ratio handling to reserve space while the image loads.

## Ready-to-use handoff for another agent

> Integrate the AP3X Operations LLC artwork from this package into the existing project. Read this README and inspect the current site before editing. Use the supplied standalone emblem as the business symbol, and use the transparent horizontal company logo on suitable light surfaces. Retain the exact business spelling and the emblem's proportions and orientation. Use the dark banner where its wide composition fits without losing text. Apply the supplied colour tokens selectively to related branding. Follow the project's existing asset and component conventions, and preserve its content, routes, forms, and integrations while updating the visual branding. Verify desktop and mobile layouts and run the project's usual build checks. Report the files changed and any variant that still needs separate artwork. Follow the user's current deployment instructions; this archive itself does not supply deployment credentials or a hosting configuration.

## Asset status and practical limits

- These are the **four PNG artworks delivered in the design conversation**. The package does not contain an editable SVG, EPS, Illustrator file, a font file, or a vector construction master.
- The company lettering inside the logo and banner is flattened into the images. No exact font family has been established by this package; do not invent a named typeface as an official brand specification.
- White/cyan and single-colour variations appear in the banner or overview. **Separate transparent reversed and monochrome logo files are not included.** The overview should not be treated as a sheet of final export-ready production logos.
- A square source symbol is included, but dedicated favicon, ICO, app-icon, and social-preview sizes have not been exported. Create and inspect those separately if the target site needs them; do not assume the complete wide banner will fit every social-preview crop.
- These files are raster assets. For specialist engraving, embroidery, cut vinyl, or large-format production, prepare an actual vector master and the production format required by the supplier. Changing a PNG extension to `.svg` does not convert it to vector artwork.
- The package is an **artwork handoff**. Website source, an application build, hosting settings, DNS records, email configuration, and credentials are not part of this ZIP. The domain is included only as business context and embedded banner text; no hosting or DNS change was performed while creating the package.

## Provenance and integrity

The images were created with image generation on 19 October 2026 for this AP3X Operations LLC branding request. Packaging copied the original files without pixel edits, resizing, recompression, or flattening transparency. `asset-manifest.json` records each original PNG's dimensions and SHA-256 hash under its package filename so a recipient can verify the copied files.

The ZIP was checked for readable contents and complete inclusion of all four artworks and this README.
