import { z } from 'zod';
import { CreativeWorkSchema } from "../schema-org/creative-work/creative-work.js";
import { EventSchema } from '../schema-org/event.js';
import { oneOrMore } from '../util.js';

export const PresentationSchema = CreativeWorkSchema.extend({
  type: z.literal('presentation').default('presentation'),
  presentedAt: oneOrMore(EventSchema).optional(),
  slides: z.string().url().optional(),
  transcript: z.string().url().optional(),
  recording: z.string().url().optional(),
}).describe("An presentation or lecture. ");
export type Presentation = z.infer<typeof PresentationSchema>;
