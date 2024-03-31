import { z } from 'zod';
import { PersonSchema } from "../person.js";
import { OrganizationSchema } from "../organization.js";
import { oneOrDict, reference } from '../util.js';

// Schema.org has one-off properties for a bunch of different person-to-org and
// person-to-person roles. We have a single Affiliation, and disambuguate with the
// 'role' property. For official jobs, 'jobTitle' can be added as well.

// This mixes things like 'bob is sarah's parent' and 'bob founded GE' and 'bob
// worked for intel' into one pile of relationships, but so be it.

export const AffiliationSchema = z.object({
  person: reference(PersonSchema),
  organization: reference(OrganizationSchema),
  role: z.string().optional(),
  jobTitle: z.string().optional(),
  date: oneOrDict(z.date()).optional()
});
export type Affiliation = z.infer<typeof AffiliationSchema>;