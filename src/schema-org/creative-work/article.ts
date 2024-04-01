import { z } from 'zod';
import { CreativeWorkSchema } from './creative-work.js';

// See https://schema.org/Article for details.
export const ArticleSchema = CreativeWorkSchema.extend({
  type: z.literal('article').default('article'),
  articleSection: z.string().optional(),
  pagination: z.string().optional(),
}).describe("A written nonfiction work on a specific topic, usually appearing in a publication.");
export type Article = z.infer<typeof ArticleSchema>;

