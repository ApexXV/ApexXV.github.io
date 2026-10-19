# AP3X Operations — portable website source

This is an editable, platform-independent static-export edition of **AP3X Operations LLC**, preserved from Sites source version 6, commit `2988b433d096bfaa86727f43a4228ba945a3ff4e`.

The companion `../deploy/` folder is already built and can be hosted immediately. Hosting requires **static files only**. A Next.js server, Vinext, Cloudflare Worker, ChatGPT account, Sites subscription, database, or build service is not required to serve those files.

## Quick handoff to another AI agent

Give the agent this whole source folder and the migration guide in the backup. Say:

> Preserve the current AP3X Operations page and all assets. This project is a Next.js static export. Run npm ci and npm run build; publish the contents of out/ at the root of the new host. Preserve /deductions, metadata, manifests, email links, responsive styling, and the apex domain https://ap3xoperations.com. The Deductions app itself lives privately in Google Apps Script and is not included here. Prepare hosting and TLS before changing DNS. Do not change mail or verification records. Do not retire the current host until the new domain works.

## Rebuild

Use Node.js 22.13 or newer and npm:

```sh
npm ci
npm run build
npm run verify
```

The static output is `out/`. Copy **everything inside** it to the host's web root, including `_next/`, `deductions/`, manifests, images, and the 404 page. Avoid placing the site under a subdirectory: assets and the Deductions route use root-relative URLs. If your host connects to a Git repository, set the project root to this source folder, the build command to `npm run build`, and the publish directory to `out`.

For local inspection after building:

```sh
npm run serve
```

Open `http://127.0.0.1:4173`. The included server is for local inspection, not a production TLS server. To inspect the supplied prebuilt deployment from this source folder:

```sh
node scripts/serve.mjs ../deploy
```

## What is preserved

- Homepage text, navigation anchors, mailto contact actions, accessible skip link, styling, responsive layouts, and icons.
- Original wide and mobile hero artwork, favicon, manifests, and Deductions icons. All public assets are copied without changes.
- `/deductions` browser-local setup and iframe shell, its URL validation and storage key, owner-only deployment instructions, iPhone installation metadata, safe-area behavior, and noindex directive.
- Canonical URLs point to `https://ap3xoperations.com`.

## Exact portability changes

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, and `images: { unoptimized: true }`.
- `package.json` uses standard Next.js commands and exact pinned versions from the original lockfile. The lockfile is reduced to the packages used by these routes; Vinext, Vite, Worker, database, and unused component tooling are unnecessary here.
- `scripts/serve.mjs` and `scripts/verify-export.mjs` provide local inspection and export integrity checks.
- The route source, original CSS, public assets, and vendor CSS are unchanged. `app/chatgpt-auth.ts` is an unused original helper, not an active login requirement for these routes.

Next.js renders static HTML, CSS, and browser scripts for ordinary hosting. Image optimization is disabled so the original bundled WebP files load directly without a Next.js image server. Directory-style `/deductions/` output is normal with trailing slashes; configure the new host to serve directory index files for both `/deductions` and `/deductions/`.

## Deductions: private components are separate

This backup includes the public Deductions **shell**, not the private Google Apps Script application, its source project, deployment, Google Sheet, form submissions, permissions, or data. Those must be backed up from the owner's Google account separately.

The shell stores the private `/exec` deployment URL only in that browser's localStorage under `ap3x-deductions:owner-web-app-url`. No private URL is embedded in source or deployment. If you keep exactly the same origin `https://ap3xoperations.com`, the same browser normally retains that setting through a hosting change. Preview domains, `www`, another protocol, a new browser, cleared storage, and another phone have separate storage: reconnect through `/deductions?setup=1` using the owner's deployment URL. Google account authorization and iframe restrictions still apply.

## Verification and scope

The export was built with Next.js 16.2.6 and passed TypeScript checks and static prerendering for `/` and `/deductions`. The included export check verifies expected homepage copy, navigation targets, canonical metadata, Deductions metadata/noindex/manifest, local script/style/image references, and byte-for-byte preservation of all original public assets.

The original complete Sites source, Git history, platform configuration, and recovery instructions are preserved separately in the main backup. Use that original archive if you need to restore the Sites/Vinext deployment instead of using this portable edition. This conversion does not migrate private account data, Google Apps Script, domain registration, DNS control, email service, or future third-party services automatically.
