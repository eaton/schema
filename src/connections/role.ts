import { z } from 'zod';
import { PersonSchema } from "../schema-org/person.js";
import { OrganizationSchema } from "../schema-org/organization.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';

// Schema.org has one-off properties for a bunch of different person-to-org roles.
// We have a single Affiliation, and disambuguate with the 'relationship' property. For
// official jobs, 'jobTitle' can be added as well.

// Examples include 'employee', 'founder', 'sponsor', 'volunteer', etc. Together
// they form a structure like:
//
// person => subType (employee) of => org (jobTitle, date.start, date.end)

// See https://schema.org/Role for details.
export const RoleSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(OrganizationSchema),
  type: z.literal('role').default('role'),
  jobTitle: z.string().optional(),
  date: oneOrDict(z.date()).optional()
}).describe("A person's membership in or affiliation with an organization. This may include an official job title.")
export type Role = z.infer<typeof RoleSchema>;