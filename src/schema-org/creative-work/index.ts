import { z } from 'zod';
import { ThingSchema } from "../thing.js";
import { oneOrDict, oneOrMore, reference } from '../../util.js';
import { PersonSchema } from '../person.js';

// Note that we're NOT including plaintext representations; this is a way
// of standardizing the metadata about things and their relationships to
// each other, rather than the core content. So, lah.

// See https://schema.org/CreativeWork for details.

export const CreativeWorkSchema = ThingSchema.extend({
  type: z.literal('creativeWork').default('creativeWork'),
  subType: z.string().optional(), // For types I'm not explicitly modeling, like 'Blog' or 'SocialMediaPost'
  ids: oneOrDict(z.string()).optional(),
  creator: reference(PersonSchema).optional(),
  about: oneOrMore(reference(ThingSchema)).optional(),
  keywords: oneOrMore(reference(ThingSchema)).optional(),
  abstract: z.string().optional(),
  headline: z.string().optional(),
  alternateHeadline: z.string().optional(),
  timeRequired: z.string().optional(),
  genre: z.string().optional(),
  isPartOf: z.string().optional(),
  series: z.string().optional(),
  seriesOrder: z.number().optional(),
  date: oneOrDict(z.date()).optional(),
  archivedAt: z.string().url().optional(),
})
export type CreativeWork = z.infer<typeof CreativeWorkSchema>;

// Relationships include:
// isBasedOn (creativeWork)
// mentions (anything)
// creator, author, editor, illustrator, translator, etc: Person, or Contributor with Role.

export * from './article.js';
export * from './blog.js';
export * from './book.js';
export * from './movie.js';
export * from './quotation.js';
export * from './social-media-posting.js';