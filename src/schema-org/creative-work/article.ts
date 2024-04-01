import { z } from 'zod';
import { CreativeWorkSchema } from './creative-work.js';

// See https://schema.org/Article for details.
export const ArticleSchema = CreativeWorkSchema.extend({
  type: z.literal('article').default('article'),
  section: z.string().optional().describe("Mapped to Schema.org's articleSection"),
  pagination: z.string().optional().describe("The pages on which the article appears in a publication's print edition"),
}).describe("A written nonfiction work on a specific topic, usually appearing in a publication.");
export type Article = z.infer<typeof ArticleSchema>;

