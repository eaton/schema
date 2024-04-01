import { z } from 'zod';
import { ThingSchema } from "../thing.js";
import { oneOrDict, oneOrMore, reference } from '../../util.js';
import { PersonSchema } from '../person.js';

// Note that we're NOT including plaintext content in this schema; this is a way
// of standardizing the metadata about things and their relationships to
// each other, rather than the core content. So, lah.

// See https://schema.org/CreativeWork for details.

// The 'ids' property is a dictionary of named Identifiers like EANs, ISBNs,
// ASINs, and so on for the item. On a per-type basis, we create the 'identifier'
// property by grabbing the best of the ids (ISBN first, then ASIN, then LOC, and
// so forth).

// `isPartOf` is used as a shortcut for several fields: on Books and Movies it's
// used to indicate that the item is part of a series. On SocialMediaPostings and
// its children, it should point to a particular Blog.
//
// `timeRequired` is used as a duration field for Movies, Episodes, and temporal
// media. For text content, it's used to estimate reading time.
// 
// `wordCount` is moved here from `Article` because the majority of stuff I'm
// dealing with is text-based. We might end up jacking this around in the future
// if it's too complicated to do the swapping, but the Schema.org proliferation
// of the-same-but-named-differently properties is a killer.

export const CreativeWorkSchema = ThingSchema.extend({
  type: z.literal('creativeWork').default('creativeWork'),
  ids: oneOrDict(z.string()).optional(),
  date: oneOrDict(z.date()).optional(),

  creator: reference(PersonSchema).optional(),
  about: oneOrMore(reference(ThingSchema)).optional(),
  isBasedOn: z.string().optional(),
  archivedAt: z.string().url().optional(),
  keywords: oneOrMore(reference(ThingSchema)).optional(),

  status: z.string().optional().describe("Equivalent to creativeWorkStatus."),
  credit: z.string().optional().describe("Equivalent to creditText"),
  abstract: z.string().optional(),
  headline: z.string().optional(),
  alternateHeadline: z.string().optional(),
  timeRequired: z.string().optional().describe("Lifted from Article and applied to all works with a temporal duration."),
  wordCount: z.number().optional().describe("Lifted from Article and applied to all works."),
  contentRating: z.string().optional().describe("Lifted from Movie and applied to all works."),
  position: z.number().optional().describe('The position of the item in a series or sequence (usually captured in isPartOf).'),
}).describe("A creative work of any kind; subtypes can be used to distinguish oddballs and outliers.");
export type CreativeWork = z.infer<typeof CreativeWorkSchema>;

// Relationships include:
// isBasedOn (creativeWork)
// mentions (anything)
// creator, author, editor, illustrator, translator, etc: Person, or Contributor with Role.

