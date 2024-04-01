import { z } from 'zod';
import { reference, oneOrMore, oneOrDict, DimensionsSchema } from './util.js';
import { OrganizationSchema } from './organization.js';
import { CreativeWorkSchema } from './creative-work.js';

// A book's title is stored in the 'name' property, via Thing/CreativeWork.
// Books' "creators" are handled by the ParticipantSchema relationships.

// See https://schema.org/Book for details.
export const BookSchema = CreativeWorkSchema.extend({
  type: z.literal('movie').default('movie'),
  subtitle: z.string().trim().optional(),
  format: z.string().trim().optional(),
  edition: z.string().trim().optional(),
  pages: z.coerce.number().optional(),
  publisher: reference(OrganizationSchema),
  imprint: reference(OrganizationSchema),
  dimensions: DimensionsSchema.optional(),
})
export type Book = z.infer<typeof BookSchema>;

