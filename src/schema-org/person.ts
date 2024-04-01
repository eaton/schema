import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict, reference } from '../util.js';

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

