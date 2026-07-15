# Futures

Things intentionally left undone or only partially verified as of the
deploy-readiness pass, kept here so the reasoning isn't lost. Nothing on
this list is blocking a launch — it's a punch list for whoever picks this
back up, so a gap reads as "known and deferred" rather than "missed."

## Infrastructure

- **Custom domain isn't live yet.** `astro.config.mjs`'s `site` and
  `public/robots.txt` both point at `https://pcl.roblegood.ca`, which is
  wired into the sitemap, canonical links, and Open Graph tags — but the
  actual Cloudflare Pages custom-domain + DNS setup is a manual dashboard
  step (see DEPLOY.md). Until that's done, those URLs describe a domain
  that isn't serving the site yet.
- **No lint or automated test suite.** Pre-existing gap, not introduced by
  the deploy-readiness pass, but worth deciding on deliberately before the
  codebase grows much further — even a minimal `astro check` + Prettier
  setup in CI would catch a class of regressions the manual review pass
  can't.

## Search / SEO polish

- **OG image is a single static card**, reused for every page (the
  `og:title`/`og:description` meta still vary per page — just not the
  image). Fine for v1. A future pass could generate per-section variants
  (e.g. a distinct card per top-level pillar: Philosophy, First 90 Days,
  Playbooks, Engineering, Templates, Sustaining Yourself) using the same
  Playwright-screenshot-of-a-styled-HTML-template approach used to produce
  the current one.
- **Pagefind result ranking/snippets haven't been tuned.** It works well
  out of the box (indexed 29 pages / ~1700 words, sensible-looking results
  in manual testing), but nobody has spent time on relevance tuning,
  excluding low-value matches, or custom result grouping (e.g. surfacing
  playbooks and templates in separate result sections rather than one
  flat list).

## Verification coverage

- **Dark mode and print were spot-checked, not screenshotted across all 29
  routes.** Verified via the shared design tokens and components (which
  every page uses) plus direct checks on the homepage and the first-90-days
  tracker specifically, since that page has the most novel interactive
  markup. Philosophy, Engineering, Sustaining Yourself, and each individual
  playbook/template weren't individually screenshotted in dark mode or
  print — low risk given they share the same `BaseLayout`/`.prose`
  treatment, but not a substitute for actually looking.
- **Pagefind's bundled UI markup wasn't independently accessibility-audited**
  beyond a basic functional check (opens, focuses the input, returns
  results, closes via Escape/backdrop/close button). It's third-party
  markup inside the restyled `<dialog>` — worth a closer look with a
  screen reader if search becomes a primary navigation path rather than a
  supplement.

## Nice-to-haves, not gaps

- No `apple-touch-icon` or web app manifest — the current favicon.ico/svg
  pair covers browser tabs but not "add to home screen" treatment. Only
  worth doing if the site expects meaningful mobile home-screen usage.
- The on-page table of contents (`Toc.astro`) isn't marked `no-print`, so
  it currently prints along with page content. Existing behavior, not
  something this pass touched — could go either way depending on whether
  a printed copy should include jump links (probably not useful on paper)
  or not.
