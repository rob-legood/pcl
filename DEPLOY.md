# Deploying to Cloudflare Pages

This site is fully static (`output: 'static'` in `astro.config.mjs`) — no
server adapter, no Cloudflare Functions, no bindings. `npm run build`
produces plain HTML/CSS/JS in `dist/`, which Cloudflare Pages serves
directly.

Two paths work. Pick (a) for ongoing deploys tied to git history, (b) for a
one-off push or a repo-less setup.

## Before either path: confirm the build works

```bash
npm install
npm run build
```

This runs two steps in sequence (the second is an npm `postbuild` hook, so
it fires automatically — no separate command needed):

1. `astro build` — writes the static site to `dist/`.
2. `pagefind --site dist` — indexes the built HTML for sitewide search and
   writes the index into `dist/pagefind/`.

Confirm the output looks right before deploying:

```bash
npm run preview   # serves dist/ locally so you can sanity-check the production build
```

## Node version

`package.json` pins `"engines": { "node": ">=22.12.0" }`. Cloudflare Pages
defaults to an older Node version unless told otherwise — set it explicitly
(see below) or the build may fail or silently use a mismatched version.

## Path (a): Connect the Git repo (recommended for ongoing deploys)

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git**, and select this repository.
2. Build settings:
   | Setting | Value |
   | --- | --- |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
3. Environment variables (**Settings → Environment variables**): add
   `NODE_VERSION` = `22.12.0` (or newer 22.x) for both Production and
   Preview environments. Nothing else is required — no secrets, no KV/D1
   bindings, no Functions.
4. Save and deploy. Every push to the production branch triggers a build;
   every other branch/PR gets a preview deployment automatically.

Custom domain: **Workers & Pages → your project → Custom domains**, add the
domain and follow the DNS instructions. Once it's live, confirm
`astro.config.mjs`'s `site` field matches it exactly (used for canonical
links, the sitemap, and Open Graph URLs) — it's currently set to
`https://pcl.roblegood.ca`.

## Path (b): Direct upload via Wrangler (no repo needed)

```bash
npm install -g wrangler   # or use npx wrangler below without a global install
npm run build
npx wrangler pages deploy dist --project-name=people-centric-leadership
```

First run will prompt to log in (`wrangler login`, opens a browser) and to
create the Pages project if it doesn't exist yet. For non-interactive/CI use
instead of `wrangler login`, set:

```bash
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
```

Re-run the same `wrangler pages deploy` command for subsequent deploys —
each one is a new immutable deployment, promoted to production automatically
if you deploy from the production branch name (default `main`), or reachable
via its own preview URL otherwise.

Wrangler only uploads whatever is already in `dist/` — it does not run the
build for you, so always run `npm run build` first or the search index and
recent content changes won't be included.

## Things that only work on the deployed build

- **Sitewide search** — Pagefind's UI assets (`/pagefind/*`) are generated
  by the `postbuild` step against `dist/`. They don't exist under
  `npm run dev`, so the search box shows a friendly "not available in this
  preview" message locally; test it via `npm run preview` or the deployed
  site instead.
