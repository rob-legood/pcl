import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Single long-form page collections: one entry each, migrated from a
// corresponding file in source-docs/.
const longFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const philosophy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/philosophy' }),
  schema: longFormSchema,
});

const firstNinetyDays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/first-90-days' }),
  schema: longFormSchema,
});

const engineering = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/engineering' }),
  schema: longFormSchema,
});

const sustainability = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sustainability' }),
  schema: longFormSchema,
});

// One entry per scenario, from source-docs/scenario-playbooks.md.
const playbooks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playbooks' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    summary: z.string(),
    tags: z.array(z.string()),
  }),
});

// One entry per template, from source-docs/templates.md, grouped by tier.
const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    tier: z.enum(['daily-weekly', 'onboarding-transitions', 'engineering-rituals']),
    order: z.number(),
    usageNote: z.string(),
  }),
});

export const collections = {
  philosophy,
  'first-90-days': firstNinetyDays,
  playbooks,
  engineering,
  templates,
  sustainability,
};
