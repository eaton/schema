import { z } from 'zod';
import { ThingSchema } from "./thing.js";
import { oneOrDict } from '../util.js';

// See https://schema.org/Organization for details.
// The 'isPartOf' property corresponds to the 'parentOrganization' Schema.org property.

export const OrganizationSchema = ThingSchema.extend({
  type: z.literal('organization').default('organization'),
  date: oneOrDict(z.date()).optional(),
  logo: z.string().optional(),
  slogan: z.string().optional(),
  numberOfMembers: z.number().optional()
}).describe("An organization such as a business, NGO, corporation, club, etc. numberOfMembers is used in place of numberOfEmployees.")
export type Organization = z.infer<typeof OrganizationSchema>;