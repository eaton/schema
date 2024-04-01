import { z } from 'zod';
import { PersonSchema } from "../person.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';

export const RelatedToSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(PersonSchema),
  type: z.literal('relatedTo'),
  role: z.string().optional(),
  date: oneOrDict(z.date()).optional()
});
export type RelatedTo = z.infer<typeof RelatedToSchema>;