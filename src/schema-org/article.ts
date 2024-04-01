import { z } from 'zod';
import { CreativeWorkSchema } from './creative-work.js';

// A book's title is stored in the 'name' property, via Thing/CreativeWork.
// Books' "creators" are handled by the ParticipantSchema relationships.

// See https://schema.org/Article for details.
export const ArticleSchema = CreativeWorkSchema.extend({
  type: z.literal('movie').default('movie'),
  articleSection: z.string().optional(),
  backstory: z.string().optional(),
  pageStart: z.number().optional(),
  pageEnd: z.number().optional(),
})
export type Article = z.infer<typeof ArticleSchema>;

