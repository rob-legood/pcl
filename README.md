# People Centric Leadership

A calm, editorial reference site teaching people-centric leadership. Built
with [Astro](https://astro.build) as a fully static site — no backend, no
database, everything client-side.

The design system, content (philosophy, the first-90-days manual, playbooks,
engineering, templates, sustainability), sitewide search, and interactive
tools (the first-90-days tracker, the reflection self-check) are all built.
See [DEPLOY.md](DEPLOY.md) for shipping it to Cloudflare Pages.

## Running it locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Astro rebuilds on save.

Other commands:

| Command            | What it does                                                            |
| ------------------ | ------------------------------------------------------------------------ |
| `npm run build`    | Builds the static site into `dist/`, then indexes it for search (`postbuild` runs Pagefind) |
| `npm run preview`  | Serves the built `dist/` locally, to sanity-check the production build (search only works here or on the deployed site — see below) |
| `npx astro check`  | TypeScript / Astro type-checking (not wired to a package.json script)   |

## Where the design tokens live

Everything tunable — color, type scale, spacing rhythm — is in
**[`src/styles/tokens.css`](src/styles/tokens.css)**. That's the one file to
edit to reshape the visual identity:

- **Color** — warm paper background, deep ink text, one restrained accent
  (a muted pine/teal). Defined as plain CSS custom properties in `:root`,
  with a `prefers-color-scheme: dark` override for dark mode (no JS toggle —
  it follows the system setting).
- **Type scale** — a hand-tuned scale (`--text-xs` through `--text-hero`)
  optimized for long-form reading rather than UI density. Headings use
  [Fraunces](https://fonts.google.com/specimen/Fraunces) (serif, variable
  font, self-hosted); body uses [Inter](https://fonts.google.com/specimen/Inter)
  (humanist sans, self-hosted). Both are loaded via `@fontsource-variable`
  packages — no external font requests at runtime.
- **Measure & spacing** — a `--measure` token (66ch) caps line length for
  reading comfort, and `--space-section` / `--space-section-lg` set the
  vertical rhythm between major page sections.

These raw values feed into a Tailwind v4 `@theme` block (also in
`tokens.css`), which turns them into utility classes: `bg-paper`,
`text-ink`, `text-accent`, `font-display`, `text-hero`, `p-section`, etc.
`src/styles/global.css` imports `tokens.css`, the font files, and holds base
element styles (link/selection/focus colors, and the
`prefers-reduced-motion` override that neutralizes all animation for users
who ask for it).

## Structure

```
src/
├── components/
│   ├── Header.astro     # site nav + mobile menu
│   ├── Footer.astro
│   ├── Search.astro     # sitewide search modal (lazy-loads Pagefind's UI)
│   └── Toc.astro        # sticky/collapsible on-page table of contents
├── content/              # one folder per collection — see src/content.config.ts
│   ├── philosophy/, first-90-days/, engineering/, sustainability/  (single long-form entry each)
│   ├── playbooks/        # one file per scenario
│   └── templates/        # one file per copy-paste template
├── layouts/
│   └── BaseLayout.astro # <html> shell: meta/OG tags, imports global.css, wraps Header/Footer around a slot
├── pages/
│   ├── index.astro, philosophy.astro, first-90-days.astro, engineering.astro, sustaining-yourself.astro, reflection.astro
│   ├── playbooks/, templates/  # index + [slug] routes reading from the content collections
│   └── 404.astro
└── styles/
    ├── tokens.css        # design tokens — edit here
    └── global.css        # font imports, base element styles, reduced-motion, print rules
```

MDX is installed and configured (`@astrojs/mdx`) if any page needs richer
embedded components later; all current content is plain Markdown.

## Sitewide search

Search is powered by [Pagefind](https://pagefind.app), which indexes the
built `dist/` output rather than the source content — that's why it's
wired up as a `postbuild` script in `package.json` (`pagefind --site dist`)
instead of an Astro integration. Its UI assets live at `/pagefind/*` in the
built site and are only fetched when a visitor opens the search modal, so
it costs nothing on a normal page load.

Because indexing needs a real build, search doesn't function under
`npm run dev` — the modal shows a "not available in this preview" message
instead of failing silently. Test it with `npm run preview` after a build,
or on the deployed site.

## Deploying

See **[DEPLOY.md](DEPLOY.md)** for both supported paths: connecting the
repo to Cloudflare Pages, or a direct `wrangler pages deploy`.
