import { z } from 'zod';
import { oneOrMore } from '../util.js';

// TODO: I'd like to use URIs as unique identifiers for things. That would allow
// both remote URLs and my own invented cluster of URNs to serve as identifiers.
// Each different kind of thing will probably require its own URN generator, though.

// This is the base schema for all 
export const ThingSchema = z.object({
  // We're going to use 'FYIDs' as identifiisParters, which are loosely URN-like but
  // without the `urn:` prefix. The idea is to consolidate URLs, ISBNs, ASINs, and
  // custom slugs with a type prefix so things can refer to each other (somewhat)
  // cleanly.
  identifier: z.string(),
  type: z.literal('thing').default('thing').describe("Inherited schema types overwrite this literal with their own key."),
  additionalType: z.string().optional().describe("Used to capture unmodeled child types from Schema.org."),

  name: z.string().optional().describe("Serves as fullName, title, label, etc depending on the object. Unpopulated untitled or datestamped/serialized works."),
  alternateName: oneOrMore(z.string()).optional().describe("Alternate name for disambiguation purposes"),

  description: z.string().optional(),
  sameAs: oneOrMore(z.string()).optional().describe("This should be a reference to a Thing, but recursion's a nightmare."),

  partOf: z.string().optional().describe("Captures any parent/child relationships, membership in a series, etc., depending on the type of object."),

  url: z.string().optional().describe("The best-fit canonical URL for an object."),
  image: z.string().describe("The primary representation of a thing. Cover art for a Book, Poster for a Movie, portrait for a Person, etc."),
});
export type Thing = z.infer<typeof ThingSchema>;
