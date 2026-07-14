# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

People Centric Leadership (PCL) is a calm, editorial reference site teaching
people-centric leadership. It is a fully static [Astro](https://astro.build)
build with no backend and no database — all interactivity is client-side —
deployed to Cloudflare Pages.

The project is currently at the **foundation stage**: the design system,
base layout, and one placeholder home page exist. The real content pages
have not been built yet, and the six source documents in `source-docs/` have
not been migrated into the site.

## Commands

```bash
npm install         # install dependencies
npm run dev          # dev server at http://localhost:4321
npm run build         # static build to dist/
npm run preview        # serve the built dist/ locally
npx astro check       # TypeScript / Astro type-checking (not wired to a package.json script)
```

There is no lint or test setup in this repository yet — don't assume one.

## Architecture

**Rendering.** `output: 'static'` in `astro.config.mjs` — no server adapter,
no Cloudflare Functions. The Cloudflare Pages build is just `npm run build`
with `dist` as the output directory; see README.md for the exact dashboard
settings.

**Design tokens live in one file: `src/styles/tokens.css`.** Colors, the
type scale, and section spacing are all defined there as plain CSS custom
properties, then re-exposed through a Tailwind v4 `@theme` block so they
become utility classes (`bg-paper`, `text-ink`, `text-accent`,
`font-display`, `text-hero`, `p-section`, etc.). When changing the visual
identity, edit this file rather than reaching for arbitrary Tailwind values
in components. Colors use a raw-token indirection (`--paper`, `--ink`, ...)
so that a single `prefers-color-scheme: dark` override block can swap every
color at once — dark mode is system-preference-only, there is no JS toggle.

**`src/styles/global.css`** imports Tailwind, `tokens.css`, and the
self-hosted variable font files (`@fontsource-variable/fraunces` and
`@fontsource-variable/inter` — no external font requests at runtime). It
also holds base element styles (link/selection/focus colors) and the
`prefers-reduced-motion` override, which zeroes out animation/transition
duration globally. Custom utilities not covered by `@theme` (e.g. `.measure`
for the 66ch reading-width cap, `.animate-hero-in` for the hero's load
animation) are defined here via Tailwind's `@utility` directive.

**Layout composition.** `src/layouts/BaseLayout.astro` is the only layout.
It imports `global.css`, sets up the `<html>` shell/meta tags, and wraps
`Header`/`Footer` around a `<slot />`. `Header.astro`'s nav items are
placeholder labels (not `<a>` tags) — they don't point anywhere yet because
the pages they'd link to don't exist. Replace them with real links only
once those routes exist, rather than wiring them to dead or `#` hrefs.

**Content is not yet wired up.** `source-docs/` contains six markdown files
that are the full source material for the site's content, written in a
reflective, direct, first-person voice (leadership philosophy, a 90-day
manual, an engineering management playbook, personal sustainability notes,
scenario playbooks, and copy-paste templates). None of it has been migrated
into `src/pages` or a content collection yet — `@astrojs/mdx` is installed
and configured for when that migration starts, but there is no content
collection schema defined yet. Read these files before making content or
IA decisions; they define the site's voice and subject matter.
