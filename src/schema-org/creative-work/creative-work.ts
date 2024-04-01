import { z } from 'zod';
import { oneOrDict, oneOrMore, reference } from '../../util.js';
import { ThingSchema } from "../thing.js";
import { PersonSchema } from '../person.js';
import { TermSchema } from '../term.js';

// Note that we're NOT including plaintext content in this schema; this is a way
// of standardizing the metadata about things and their relationships to
// each other, rather than the core content. So, lah.

// See https://schema.org/CreativeWork for details.

// The 'ids' property is a dictionary of named Identifiers like EANs, ISBNs,
// ASINs, and so on for the item. On a per-type basis, we create the 'identifier'
// property by grabbing the best of the ids (ISBN first, then ASIN, then LOC, and
// so forth).

// `partOf` is used as a shortcut for several fields: on Books and Movies it's
// used to indicate that the item is part of a series. On SocialMediaPostings and
// its children, it should point to a particular Blog.
//
// `about` and `basedOn` are used to denote a fundamental relationship between
// two objects, not just vague inspiration. A movie might be based on a book of
// the same name, and a review is about the product it discusses.
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
  ids: oneOrDict(z.string()).optional().describe("All meaningfully similar IDs for an item. isbn10, isbn13, asin, upc, ean, gtin, loc, dewey, sku, mpn, and so on."),
  date: oneOrDict(z.date()).optional(),

  creator: reference(PersonSchema).optional().optional().describe('Primary creator or author if one exists.'),
  about: oneOrMore(reference(ThingSchema)).optional().describe('Equivalent to the schema.org about property.'),
  basedOn: z.string().optional(),
  archivedAt: z.string().url().optional().optional().describe('A URL with an archived copy of this item, as an alternative to its primary URL.'),
  keywords: oneOrMore(reference(TermSchema)).optional(),

  status: z.string().optional().describe("Equivalent to creativeWorkStatus."),
  credit: z.string().optional().describe("Equivalent to creditText"),
  headline: z.string().optional(),
  alternateHeadline: z.string().optional(),
  timeRequired: z.string().optional().describe("Lifted from Article and applied to all works with a temporal duration."),
  wordCount: z.number().optional().describe("Lifted from Article and applied to all works."),
  contentRating: z.string().optional().describe("Lifted from Movie and applied to all works."),
  position: z.number().optional().describe('The position of the item in a series or sequence (usually captured in partOf).'),
}).describe("A creative work of any kind; subtypes can be used to distinguish oddballs and outliers.");
export type CreativeWork = z.infer<typeof CreativeWorkSchema>;

