import { z } from 'zod';
import { CreativeWorkSchema } from './index.js';

// A book's title is stored in the 'name' property, via Thing/CreativeWork.
// Books' "creators" are handled by the ParticipantSchema relationships.

// See https://schema.org/Article for details.
export const ArticleSchema = CreativeWorkSchema.extend({
  type: z.literal('article').default('article'),
  articleSection: z.string().optional(),
  pagination: z.string().optional(),
})
export type Article = z.infer<typeof ArticleSchema>;

