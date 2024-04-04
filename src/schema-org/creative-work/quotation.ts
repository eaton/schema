import { z } from 'zod';
import { reference } from '../../util.js';
import { CreativeWorkSchema } from './creative-work.js';
import { PersonSchema } from '../person.js';

// See https://schema.org/Quotation for details.
// thing.partOf should be used to indicate the creative work the Quotation
// is sourced from. creativeWork.creator should be used to indicate an individual
// speaker; if multiples exist it's permissible to refer ONLY to the work the
// quote appears in.
// If the speaker is a fictional character, quotation.spokenBy should store a
// reference to that speaker's person record, or a name/name+url/name+etc bundle.
export const QuotationSchema = CreativeWorkSchema.extend({
  type: z.literal('quotation').default('quotation'),
  location: z.string().optional().describe("A duration, page number, or other indication of where the quote can be found inf the work it belongs to."),
  spokenBy: reference(PersonSchema).optional(),
}).describe("A memorable quote, from a real or fictional person or any other work. partOf should store the original source, creator should store the author, and isSpokenBy should store a fictional character's name, if applicable.");
export type Quotation = z.infer<typeof QuotationSchema>;

