# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

People Centric Leadership (PCL) is a calm, editorial reference site teaching
people-centric leadership. It is a fully static [Astro](https://astro.build)
build with no backend and no database — all interactivity is client-side —
deployed to Cloudflare Pages.

The project is content-complete and deploy-ready: all six source documents
are migrated into content collections and rendered, navigation is real
(no placeholder links), there's a sitewide search, an interactive
first-90-days progress tracker, and full SEO/OG/sitemap coverage. See
**[DEPLOY.md](DEPLOY.md)** for shipping it, and **[FUTURES.md](FUTURES.md)**
for known rough edges and ideas intentionally deferred rather than built —
check both before assuming something is missing or unfinished by accident.

## Commands

```bash
npm install         # install dependencies
npm run dev          # dev server at http://localhost:4321
npm run build         # static build to dist/, then runs postbuild (see below)
npm run preview        # serve the built dist/ locally
npx astro check       # TypeScript / Astro type-checking (not wired to a package.json script)
```

There is no lint or test setup in this repository yet — don't assume one
(tracked in FUTURES.md).

`npm run build`'s `postbuild` hook runs `pagefind --site dist`, which
indexes the built HTML for sitewide search. That index only exists after a
real build — under `npm run dev` the search modal loads lazily and shows a
"not available in this preview" message instead of failing silently. To
test search locally, run `npm run build && npm run preview`.

**"Another astro dev server is already running" on Windows.** This means a
previous `npm run dev` (often one started in the background for testing)
never actually died. On Windows, Git Bash's `pkill -f` frequently fails to
kill `node.exe` processes it spawned via a detached background job — it
matches against MSYS's view of the command line, which doesn't reliably
line up with how Windows launched the process, so `pkill` can exit
successfully while the process keeps running and holds the port. The error
message gives you the real PID directly — use it:

```powershell
Stop-Process -Id <PID> -Force
```

If you don't have the PID, find whatever's bound to the port instead:

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 4321).OwningProcess
Stop-Process -Id <that Id> -Force
```

`npx astro dev --force` also works — it replaces the existing instance
instead of refusing to start. After killing a background dev server
started for testing, verify the PID is actually gone (`Get-Process -Id
<PID>`) rather than trusting `pkill`'s exit code.

## Architecture

**Rendering.** `output: 'static'` in `astro.config.mjs` — no server adapter,
no Cloudflare Functions. `site` is set to `https://pcl.roblegood.ca` (used
for canonical links, the sitemap, and Open Graph URLs — update this the
moment the real domain differs). The Cloudflare Pages build is `npm run
build` with `dist` as the output directory; see DEPLOY.md for both the
Git-connected and direct-Wrangler-upload paths.

**Design tokens live in one file: `src/styles/tokens.css`.** Colors, the
type scale, and section spacing are all defined there as plain CSS custom
properties, then re-exposed through a Tailwind v4 `@theme` block so they
become utility classes (`bg-paper`, `text-ink`, `text-accent`,
`font-display`, `text-hero`, `p-section`, etc.). When changing the visual
identity, edit this file rather than reaching for arbitrary Tailwind values
in components. Colors use a raw-token indirection (`--paper`, `--ink`, ...)
so that a single `prefers-color-scheme: dark` override block can swap every
color at once — dark mode is system-preference-only, there is no JS toggle.
All token pairs (text on paper, text on paper-raised, in both modes) have
been checked against WCAG AA and clear it comfortably — recheck if you
introduce a new color.

**`src/styles/global.css`** imports Tailwind, `tokens.css`, and the
self-hosted variable font files (`@fontsource-variable/fraunces` and
`@fontsource-variable/inter` — no external font requests at runtime). It
also holds base element styles (link/selection/focus colors), the
`prefers-reduced-motion` override that zeroes out animation/transition
duration globally, and the `@media print` rules (`.no-print` hides
chrome like the header/footer/reset buttons; `.template-pre` forces
templates to print as plain high-contrast text). Custom utilities not
covered by `@theme` (e.g. `.measure` for the 66ch reading-width cap,
`.animate-hero-in` for the hero's load animation, `.prose` /
`.prose-pullquotes` for rendered Markdown) are defined here via Tailwind's
`@utility` directive.

**Layout composition.** `src/layouts/BaseLayout.astro` is the only layout.
It sets up the `<html>` shell, canonical link, full OG/Twitter meta tags
(backed by a generated `public/og-image.png`), and wraps `Header`/`Footer`
around a `<slot />`. `<main>` carries `data-pagefind-body`, which scopes
Pagefind's indexing to page content only — if you ever add a second
top-level content wrapper, tag it the same way or search results will
start including header/footer/nav boilerplate on every page.

**Content collections** are defined in `src/content.config.ts`. Four
collections (`philosophy`, `first-90-days`, `engineering`, `sustainability`)
hold a single long-form Markdown entry each, rendered by their matching
`src/pages/*.astro` file. Two collections are multi-entry:
`playbooks` (one file per scenario, schema includes `slug`, `order`,
`summary`, `tags`) and `templates` (one file per template, schema includes
`tier`, `order`, `usageNote`), each with an `index.astro` listing page and a
`[slug].astro` detail page. `source-docs/` still holds the six original
markdown source files the content was migrated from — treat them as
historical reference for voice/subject matter, not as something still
needing migration.

**Interactive, localStorage-backed features** follow the same pattern in
two places — reuse it rather than inventing a new one:
- `src/pages/reflection.astro` — a multi-step self-assessment that scores
  answers client-side and optionally saves a result history.
- `src/pages/first-90-days.astro` — every checklist item is a real
  checkbox with a stable id (`${phase.id}--${groupIndex}-${itemIndex}`,
  derived from static array position), persisted to localStorage as a
  `{ [itemId]: true }` map, driving both an overall and a per-phase
  progress indicator. A "Reset progress" control clears it after a native
  `confirm()`.

Both wrap every `localStorage` read/write in `try/catch` so the feature
still works (just without persistence) if storage is unavailable — keep
that pattern for any future localStorage use.

**Sitewide search** (`src/components/Search.astro`) is a native `<dialog>`
(free focus containment, Escape-to-close, backdrop-click-to-close) that
lazy-loads Pagefind's bundled UI (`/pagefind/pagefind-ui.js` +
`.css`) only when opened, restyled via Pagefind's CSS custom properties to
match the site's tokens rather than shipping its default look. It's wired
into `Header.astro` next to the mobile nav toggle.

**Navigation is real.** `Header.astro`'s nav items are actual `<a>` links
to every top-level route; there is no placeholder-label state anymore.
