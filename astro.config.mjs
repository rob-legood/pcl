// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Fully static output — no server, no adapter. Cloudflare Pages serves
  // the contents of dist/ directly.
  output: 'static',
  // Used for canonical links, sitemap.xml, and Open Graph URLs.
  site: 'https://pcl.roblegood.ca',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap()]
});