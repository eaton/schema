import { z } from 'zod';
import { oneOrMore } from '../util.js';

// TODO: I'd like to use URIs as unique identifiers for things. That would allow
// both remote URLs and my own invented cluster of URNs to serve as identifiers.
// Each different kind of thing will probably require its own URN generator, though.

// This is the base schema for all 
export const ThingSchema = z.object({
  // We're going to use 'FYIDs' as identifiers, which are loosely URN-like but
  // without the `urn:` prefix. The idea is to consolidate URLs, ISBNs, ASINs, and
  // custom slugs with a type prefix so things can refer to each other (somewhat)
  // cleanly.
  identifier: z.string(),

  isPartOf: z.string().optional().describe("Captures parent/child relationships, membership in a series, etc., depending on the type of object."),

  type: z.literal('thing').default('thing').describe("Inherited schema types overwrite this literal with their own key."),
  additionalType: z.string().optional().describe("Used to capture unmodeled child types from Schema.org."),

  // This is the absolute baseline human-visible name for a thing; we ALMOST always want
  // it to be required, but some things (like tweets or untitled blog posts) make it
  // tricky.
  name: z.string().optional(),

  // Alternate name for disambiguation purposes.
  alternateName: oneOrMore(z.string()).optional(),

  description: z.string().optional(),
  sameAs: oneOrMore(z.string()).optional().describe("This should be a reference to a Thing, but recursion's a nightmare."),

   // A canonical URL, if one exists. There may actually be quite a few URLs for some
  // entities. Horrifyingly, this may need to be a `oneOrDict` sitaution.
  url: z.string().optional(),
  image: z.string(),
});
export type Thing = z.infer<typeof ThingSchema>;
