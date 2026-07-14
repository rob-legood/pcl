# People Centric Leadership

A calm, editorial reference site teaching people-centric leadership. Built
with [Astro](https://astro.build) as a fully static site — no backend, no
database, everything client-side.

This is the **foundation stage**: design system, base layout, and one
placeholder home page. No real content pages yet — those come next.

## Running it locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`. Astro rebuilds on save.

Other commands:

| Command           | What it does                              |
| ------------------ | ------------------------------------------ |
| `npm run build`   | Builds the static site into `dist/`        |
| `npm run preview` | Serves the built `dist/` locally, to sanity-check the production build |

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
│   ├── Header.astro     # site title + nav placeholder
│   └── Footer.astro
├── layouts/
│   └── BaseLayout.astro # <html> shell, imports global.css, wraps Header/Footer around a slot
├── pages/
│   └── index.astro      # placeholder home page (hero + lorem paragraph)
└── styles/
    ├── tokens.css        # design tokens — edit here
    └── global.css        # font imports, base element styles, reduced-motion
```

MDX is installed and configured (`@astrojs/mdx`), so future content pages
can be written as `.mdx` files under `src/pages/` or `src/content/` once real
content migration starts.

## How the Cloudflare Pages build works

The site is configured for fully static output (`output: 'static'` in
`astro.config.mjs`) — there's no server adapter, no Cloudflare Functions,
just prerendered HTML/CSS/JS.

To deploy on Cloudflare Pages:

1. Connect the GitHub repo in the Cloudflare Pages dashboard.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Framework preset: **Astro** (Cloudflare's preset sets the two settings
   above automatically).

No environment variables or bindings are needed for this stage. If the site
later needs a production `site:` URL for canonical links, set it in
`astro.config.mjs` once the domain is live.

## Next stage

Not yet built — flagged here so it's clear what's still ahead:

- Content collections for the six source docs (philosophy, manual,
  engineering playbook, personal sustainability, scenario playbooks,
  templates) and the real page/route structure for them.
- Real navigation replacing the header placeholder.
- A page/template for the templates doc's copy-pasteable blocks (likely
  needs its own component for the code-block-style templates).
- Reading-experience details: a table of contents for long pages, in-page
  anchor links, "field notes" callout styling.
- Any shared MDX components (pull quotes, callouts) content will need once
  migration starts.
