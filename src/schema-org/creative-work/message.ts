import { z } from 'zod';
import { oneOrMore, reference } from '../../util.js';
import { CreativeWorkSchema } from "./creative-work.js";
import { PersonSchema } from '../person.js';

/**
 * An email, usenet, or other form of electronic message archived for posterity.
 * We've shortened the properties from 'recipient' and 'sender' and so on to the
 * much tidier 'from', 'to', 'bcc', and so on.
 * 
 * @see {@link https://schema.org/Message}.
 */
export const MessageSchema = CreativeWorkSchema.extend({
  type: z.literal('message').default('message'),
  from: reference(PersonSchema),
  to: oneOrMore(reference(PersonSchema)),
  bcc: oneOrMore(reference(PersonSchema)).optional(),
  cc: oneOrMore(reference(PersonSchema)).optional(),
  attachment: oneOrMore(reference(CreativeWorkSchema))
}).describe("An email, Usenet post, or some other person-to-person or person-to-group electronic message..");
export type Message = z.infer<typeof MessageSchema>;
