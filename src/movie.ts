import { z } from 'zod';
import { reference, oneOrMore, oneOrDict, DimensionsSchema } from './util.js';
import { OrganizationSchema } from './organization.js';
import { CreativeWorkSchema } from './creative-work.js';

export const BookSchema = CreativeWorkSchema.extend({
  type: z.literal('movie').default('movie'),

  identifiers: oneOrDict(z.string()),
  duration: z.string().optional(),
  
  series: z.object({
    name: z.string().trim().optional(),
    order: z.coerce.number().optional(),
    total: z.coerce.number().optional(),
  }).optional(),
  dimensions: DimensionsSchema.optional(),
})
export type Book = z.infer<typeof BookSchema>;

