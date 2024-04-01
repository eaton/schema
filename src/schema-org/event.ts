import { z } from 'zod';
import { reference, oneOrDict } from '../util.js';
import { ThingSchema } from "./thing.js";
import { PlaceSchema } from './place.js';

// See https://schema.org/Event for details.

// Subtypes I use may include 'Festival', 'EventSeries', 'SocialEvent', 'Hackathon',
// 'BusinessEvent', 'ScreeningEvent', 'TheaterEvent', 'MusicEvent', and 'LiteraryEvent'
// The 'parent' property corresponds to the 'superEvent' Schema.org property.

export const EventSchema = ThingSchema.extend({
  type: z.literal('event').default('event'),
  date: oneOrDict(z.date()).optional(),
  parent: z.string().optional(),
  location: reference(PlaceSchema).optional()
});
export type Event = z.infer<typeof EventSchema>;
