import { z } from 'zod';
import { reference } from '../../util.js';
import { CreativeWorkSchema } from './index.js';
import { PersonSchema } from '../person.js';

// A book's title is stored in the 'name' property, via Thing/CreativeWork.
// Books' "creators" are handled by the ParticipantSchema relationships.

// See https://schema.org/Book for details.
export const QuotationSchema = CreativeWorkSchema.extend({
  type: z.literal('quotation').default('quotation'),
  spokenByCharacter: reference(PersonSchema).optional(),
  isBasedOn: reference(CreativeWorkSchema),
})
export type Quotation = z.infer<typeof QuotationSchema>;

