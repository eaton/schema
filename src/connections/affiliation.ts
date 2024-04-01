import { z } from 'zod';
import { PersonSchema } from "../schema-org/person.js";
import { OrganizationSchema } from "../schema-org/organization.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';

// Schema.org has one-off properties for a bunch of different person-to-org roles.
// We have a single Affiliation, and disambuguate with the 'subType' property. For
// official jobs, 'jobTitle' can be added as well.

// Examples include 'employee', 'founder', 'sponsor', 'volunteer', etc. Together
// they form a structure like:
//
// person => subType (employee) of => org (jobTitle, date.start, date.end)

export const AffiliationSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(OrganizationSchema),
  type: z.literal('affiliation').default('affiliation'),
  subType: z.string().optional(),
  jobTitle: z.string().optional(),
  date: oneOrDict(z.date()).optional()
});
export type Affiliation = z.infer<typeof AffiliationSchema>;