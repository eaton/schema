import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { TaxonomySchema } from "./creative-work/taxonomy.js";

// See https://schema.org/DefinedTerm for details.
//
// - Use the identifier property as an alias for the schema.org termCode property.
// - Use partOf to assign the term to a specific taxonomy.
// - Use sameAs to denote synonym relationships between terms.

export const TermSchema = ThingSchema.extend({
  type: z.literal('term').default('term'),
}).describe("A  word, name, acronym, phrase, etc. with a formal definition.")
export type Term = z.infer<typeof TermSchema>;

