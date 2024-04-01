import { z } from 'zod';
import { PersonSchema } from "../schema-org/person.js";
import { OrganizationSchema } from "../schema-org/organization.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';

/**
 * Schema.org has one-off properties for a bunch of different person-to-org roles.
 * We have a single Affiliation, and disambuguate with the 'relationship' property inherited
 * from {@see ConnectionSchema}. Official job titles can be captured in the 'jobTitle' property.
 * 
 * @see {@link https://schema.org/Role} for details.
 * 
 * Examples include:
 * 
 * - {@link https://schema.org/alumni | alumni}
 * - {@link https://schema.org/employee | employee}
 * - {@link https://schema.org/founder | founder}
 * - {@link https://schema.org/funder | funder}
 * - {@link https://schema.org/sponsor | sponsor}
 */
export const RoleSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(OrganizationSchema),
  type: z.literal('role').default('role'),
  jobTitle: z.string().optional(),
  date: oneOrDict(z.date()).optional().describe('Should contain start and end dates for the role, if appropriate.')
}).describe("A person's membership in or affiliation with an organization. This may include an official job title.")
export type Role = z.infer<typeof RoleSchema>;