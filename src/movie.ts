import { z } from 'zod';
import { reference, oneOrMore, oneOrDict, DimensionsSchema } from './util.js';
import { OrganizationSchema } from './organization.js';
import { CreativeWorkSchema } from './creative-work.js';

export const MovieSchema = CreativeWorkSchema.extend({
  type: z.literal('movie').default('movie'),
  duration: z.string().optional(),
  contentRating: z.string().optional(),
  dimensions: DimensionsSchema.optional(),
})
export type Movie = z.infer<typeof MovieSchema>;

