import { z } from 'zod';
import { oneOrDict, reference } from '../util.js';
import { ThingSchema } from '../schema-org/thing.js';

// Absolute baseline relationship

export const ConnectionSchema = z.object({
  _from: reference(ThingSchema),
  _to: reference(ThingSchema),
  type: z.string().optional()
});
export type Connection = z.infer<typeof ConnectionSchema>;