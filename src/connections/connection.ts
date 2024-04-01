import { z } from 'zod';
import { oneOrDict, reference } from '../util.js';
import { ThingSchema } from '../schema-org/thing.js';

// Absolute baseline relationship; describes a connection between any two things.
// subType can be used to 

export const ConnectionSchema = z.object({
  _from: reference(ThingSchema),
  _to: reference(ThingSchema),
  type: z.literal('connection'),
  relationship: z.string().describe("A keyword indicating the nature of the connection."),
}).describe("A named, directional connection from one Thing to another.")
export type Connection = z.infer<typeof ConnectionSchema>;

