import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict, reference } from '../util.js';

// Other relational stuff I'll want/need to address includes:
//
// birthPlace (0-1 Place)
// deathPlace (0-1 Place)

// affilliation (0-n Organization)
// worksFor (0-n Organization)
// memberOf (0-n Organization)
// funder (0-n Organization or Person)
// sponsor (0-n Organization or Person)
// founded (0-n Organization or Person)

// spouse (0-n Person)
// parent (0-n Person)
// children (0-n Person)
// sibling (0-n Person)
// relatedTo (0-n Person)

// knowsAbout (0-n Thing / Text String / URL)

// See https://schema.org/Person for details.
export const PersonSchema = ThingSchema.extend({
  type: z.literal('person').default('person'),
  date: oneOrDict(z.date()).optional(),
  familyName: z.string().optional(),
  givenName: z.string().optional(),
  honorificPrefix: z.string().optional(),
  honorificSuffix: z.string().optional(),
  fictional: z.boolean().optional(),
}).describe("A person alive, dead, undead, or fictional. Relationships, memberships, jobs, etc. are handled by connection/affiliation records.")
export type Person = z.infer<typeof PersonSchema>;

