import { z } from 'zod';
import { reference } from '../../util.js';
import { CreativeWorkSchema } from "./creative-work.js";
import { OrganizationSchema } from '../organization.js';

export const BlogSchema = CreativeWorkSchema.extend({
  type: z.literal('project').default('project'),
  platform: reference(OrganizationSchema).optional()
});
export type Blog = z.infer<typeof BlogSchema>;
