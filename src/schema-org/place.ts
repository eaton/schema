import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { reference, oneOrMore, oneOrDict } from '../util.js';

// See https://schema.org/Place for details.
// The 'parent' property corresponds to the 'containedInPlace' Schema.org property.

export const PlaceSchema = ThingSchema.extend({
  type: z.literal('place').default('place'),
  parent: z.string().optional(),
  geo: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
export type Place = z.infer<typeof PlaceSchema>;

