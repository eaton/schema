import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict } from '../util.js';


// See https://schema.org/Organization for details.

export const OrganizationSchema = ThingSchema.extend({
  logo: z.string().optional(),
  slogan: z.string().optional(),
  parentOrganization: z.string().optional(), // This is actually a pointer to another organization, but we'll only use its ID.
  date: oneOrDict(z.date()).optional()
});
export type Organization = z.infer<typeof OrganizationSchema>;