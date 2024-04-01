import { z } from 'zod';
import { ThingSchema } from "./thing.js";

// The 'isPartOf' property corresponds to the 'containedInPlace' Schema.org property.

// See https://schema.org/Place for details.
export const PlaceSchema = ThingSchema.extend({
  type: z.literal('place').default('place'),
  geo: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}).describe("Entities that have a somewhat fixed, physical extension")
export type Place = z.infer<typeof PlaceSchema>;

