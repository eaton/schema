import { z } from 'zod';
import { PersonSchema } from "../person.js";
import { OrganizationSchema } from "../organization.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';

// Schema.org has one-off properties for a bunch of different person-to-org roles.
// We have a single Affiliation, and disambuguate with the 'role' property. For
// official jobs, 'jobTitle' can be added as well.

export const AffiliationSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(OrganizationSchema),
  type: z.string().optional(),
  jobTitle: z.string().optional(),
  date: oneOrDict(z.date()).optional()
});
export type Affiliation = z.infer<typeof AffiliationSchema>;