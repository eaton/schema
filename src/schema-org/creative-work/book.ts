import { z } from 'zod';
import { reference } from '../../util.js';
import { DimensionsSchema } from '../data-types/dimensions.js';
import { OrganizationSchema } from '../organization.js';
import { CreativeWorkSchema } from './creative-work.js';

// A book's title is stored in the 'name' property, via Thing/CreativeWork.
// Books' "creators" beyond a single author are handled by the ContributorSchema
// object. Membership in a series is stored in the 'partOf' property

// See https://schema.org/Book for details.
export const BookSchema = CreativeWorkSchema.extend({
  type: z.literal('book').default('book'),
  subtitle: z.string().trim().optional(),
  format: z.string().trim().optional(),
  edition: z.string().trim().optional(),
  pages: z.coerce.number().optional().describe('Number of pages. For digital books, this may be an estimate or sourced from a similar print edition.'),
  publisher: reference(OrganizationSchema),
  imprint: reference(OrganizationSchema),
  dimensions: DimensionsSchema.optional(),
}).describe("A printed or digital book. Titles should be stored in the name property, and series membership should be indicated using the partOf property.");
export type Book = z.infer<typeof BookSchema>;
