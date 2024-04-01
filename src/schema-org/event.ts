import { z } from 'zod';
import { reference, oneOrDict } from '../util.js';
import { ThingSchema } from "./thing.js";
import { PlaceSchema } from './place.js';

// See https://schema.org/Event for details.

export const EventSchema = ThingSchema.extend({
  type: z.literal('event').default('event'),
  date: oneOrDict(z.date()).optional(),
  location: reference(PlaceSchema).optional()
});
export type Event = z.infer<typeof EventSchema>;
