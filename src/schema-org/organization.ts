import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict } from '../util.js';


// See https://schema.org/Organization for details.
// The 'parent' property corresponds to the 'parentOrganization' Schema.org property.

export const OrganizationSchema = ThingSchema.extend({
  type: z.literal('organization').default('organization'),
  parent: z.string().optional(), // This is actually a pointer to another organization, but we'll only use its ID.
  date: oneOrDict(z.date()).optional(),
  logo: z.string().optional(),
  slogan: z.string().optional(),
  numberOfEmployees: z.number().optional()
});
export type Organization = z.infer<typeof OrganizationSchema>;