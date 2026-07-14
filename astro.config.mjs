// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Fully static output — no server, no adapter. Cloudflare Pages serves
  // the contents of dist/ directly.
  output: 'static',
  // site: set this to the production URL once the domain is live —
  // it's used for canonical links and any future sitemap/RSS output.

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});