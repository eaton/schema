import { z } from 'zod';
import { reference } from '../../util.js';
import { CreativeWorkSchema } from './creative-work.js';
import { PersonSchema } from '../person.js';

// See https://schema.org/Quotation for details.
export const QuotationSchema = CreativeWorkSchema.extend({
  type: z.literal('quotation').default('quotation'),
  location: z.string().optional().describe("A duration, page number, or other indication of where the quote can be found inf the work it belongs to."),
  spokenByCharacter: reference(PersonSchema).optional(),
}).describe("A memorable quote, from a real or fictional person or any other work. isPartOf should store the original source, creator should store the author, and isSpokenBy should store a fictional character's name, if applicable.");
export type Quotation = z.infer<typeof QuotationSchema>;

