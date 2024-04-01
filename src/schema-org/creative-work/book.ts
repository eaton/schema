import { z } from 'zod';
import { reference, DimensionsSchema, oneOrMore } from '../../util.js';
import { OrganizationSchema } from '../organization.js';
import { CreativeWorkSchema } from './creative-work.js';
import { PersonSchema } from '../person.js';

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
}).describe("A printed or digital book. Titles should be stored in the name property, and series membership should be indicated using the isPartOf property..");
export type Book = z.infer<typeof BookSchema>;

