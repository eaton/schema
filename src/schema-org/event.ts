import { z } from 'zod';
import { reference, oneOrDict } from '../util.js';
import { ThingSchema } from "./thing.js";
import { PlaceSchema } from './place.js';


// Subtypes I use may include 'Festival', 'EventSeries', 'SocialEvent', 'Hackathon',
// 'BusinessEvent', 'ScreeningEvent', 'TheaterEvent', 'MusicEvent', and 'LiteraryEvent'

// The 'isPartOf' property corresponds to the 'superEvent' Schema.org property.

// See https://schema.org/Event for details.
export const EventSchema = ThingSchema.extend({
  type: z.literal('event').default('event'),
  date: oneOrDict(z.date()).optional(),
  location: reference(PlaceSchema).optional()
}).describe("An event happening at a certain time and location, such as a concert, lecture, or festival.");
export type Event = z.infer<typeof EventSchema>;
