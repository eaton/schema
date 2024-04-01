import { z } from 'zod';
import { CreativeWorkSchema } from "./creative-work.js";

// See https://schema.org/DefinedTermSet for details.
// the identifier property should be used as a unique shortcode for the TermSet.
export const TaxonomySchema = CreativeWorkSchema.extend({
  type: z.literal('taxonomy').default('taxonomy'),
}).describe("A set of defined terms, for example a set of categories or a classification scheme, a glossary, dictionary or enumeration.")
export type Taxonomy = z.infer<typeof TaxonomySchema>;

