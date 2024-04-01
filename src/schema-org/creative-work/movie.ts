import { z } from 'zod';
import { CreativeWorkSchema } from './index.js';

// Schema.org's "duration" property will be mapped from
// the base 'timeRequired' property of 'CreativeWork'

export const MovieSchema = CreativeWorkSchema.extend({
  type: z.literal('movie').default('movie'),
  contentRating: z.string().optional(),
})
export type Movie = z.infer<typeof MovieSchema>;

