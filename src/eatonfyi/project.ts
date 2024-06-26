import { z } from 'zod';
import { reference } from '../util.js';
import { CreativeWorkSchema } from "../schema-org/creative-work/creative-work.js";
import { OrganizationSchema } from '../schema-org/organization.js';

export const ProjectSchema = CreativeWorkSchema.extend({
  type: z.literal('project').default('project'),
  employer: reference(OrganizationSchema).optional(),
  client: reference(OrganizationSchema).optional(),
}).describe("A project I personally worked on, either for myself or someone else. subType can be used to capture things like Podcast, WebSite, Software, SoftwareSourceCode, etc.");
export type Project = z.infer<typeof ProjectSchema>;
