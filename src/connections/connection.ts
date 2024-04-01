import { z } from 'zod';
import { oneOrDict, reference } from '../util.js';
import { ThingSchema } from '../schema-org/thing.js';

// Absolute baseline relationship; describes a connection between any two things.

export const ConnectionSchema = z.object({
  _from: reference(ThingSchema),
  _to: reference(ThingSchema),
  type: z.literal('connection'),
  subType: z.string().optional(),
});
export type Connection = z.infer<typeof ConnectionSchema>;

