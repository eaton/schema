import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { reference, oneOrMore, oneOrDict } from './util.js';

// See https://schema.org/Event for details.

export const PlaceSchema = ThingSchema.extend({
  type: z.literal('place').default('place'),
  parent: z.string().optional(),
  geo: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
export type Place = z.infer<typeof PlaceSchema>;

