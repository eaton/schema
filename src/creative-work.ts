import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict, oneOrMore, reference } from './util.js';

// Note that we're NOT including plaintext representations; this is a way
// of standardizing the metadata about things and their relationships to
// each other, rather than the core content. So, lah.

// See https://schema.org/CreativeWork for details.

export const CreativeWorkSchema = ThingSchema.extend({
  type: z.literal('creativeWork').default('creativeWork'),
  ids: oneOrDict(z.string()).optional(),
  about: oneOrMore(reference(ThingSchema)),
  abstract: z.string().optional(),
  headline: z.string().optional(),
  alternateHeadline: z.string().optional(),
  genre: z.string().optional(),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
  date: oneOrDict(z.date()).optional(),
  archivedAt: z.string().url().optional()
})
export type CreativeWork = z.infer<typeof CreativeWorkSchema>;

// Relationships include:
// isBasedOn (creativeWork)
// isPartOf (creativeWork)
// mentions (anything)