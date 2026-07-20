import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const locale = z.enum(['en', 'zh']);

export const projectSchema = z
  .object({
    translationKey: z.string().min(1),
    locale,
    title: z.string().min(1),
    summary: z.string().min(1),
    period: z.string().min(1),
    role: z.string().min(1),
    category: z.enum(['open-source', 'applied-ai', 'medical-ai', 'research', 'competitions']),
    technologies: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.url() }).strict()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  })
  .strict();

export const writingSchema = z
  .object({
    translationKey: z.string().min(1),
    locale,
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  })
  .strict();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{en,zh}.md', base: './src/content/projects' }),
  schema: projectSchema,
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{en,zh}.md', base: './src/content/writing' }),
  schema: writingSchema,
});

export const collections = { projects, writing };
