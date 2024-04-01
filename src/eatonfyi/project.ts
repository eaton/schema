import { z } from 'zod';
import { reference } from '../util.js';
import { CreativeWorkSchema } from "../schema-org/creative-work/index.js";
import { OrganizationSchema } from '../schema-org/organization.js';

export const ProjectSchema = CreativeWorkSchema.extend({
  type: z.literal('project').default('project'),
  employer: reference(OrganizationSchema).optional(),
});
export type Project = z.infer<typeof ProjectSchema>;
