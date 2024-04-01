import { z } from 'zod';
import { reference, oneOrMore, oneOrDict } from '../util.js';

// TODO: I'd like to use URIs as unique identifiers for things. That would allow
// both remote URLs and my own invented cluster of URNs to serve as identifiers.
// Each different kind of thing will probably require its own URN generator, though.

// This is the base schema for all 
export const ThingSchema = z.object({
  // We're going to use URNs as identifiers, because why the hell not.
  // We probably want to create a custom zod type to validate them.
  identifier: z.string(),

  // Concrete subtypes overwrite this their own value.
  type: z.literal('thing').default('thing'),
  additionalType: z.string().optional(), // This can be used to supply a more specific sub-type.

  // This is the absolute baseline human-visible name for a thing; we ALMOST always want
  // it to be required, but some things (like tweets or untitled blog posts) make it
  // tricky.
  name: z.string().optional(),

  // Alternate name for disambiguation purposes.
  alternateName: oneOrMore(z.string()).optional(),

  description: z.string().optional(),
  sameAs: oneOrMore(z.string()).optional(),

   // A canonical URL, if one exists. There may actually be quite a few URLs for some
  // entities. Horrifyingly, this may need to be a `oneOrDict` sitaution.
  url: z.string().optional(),
  image: z.string(),
});
export type Thing = z.infer<typeof ThingSchema>;
