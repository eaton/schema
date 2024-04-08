import { z } from 'zod';
import { reference } from '../../util.js';
import { CreativeWorkSchema } from "./creative-work.js";
import { OrganizationSchema } from '../organization.js';

// See https://schema.org/Blog for details.
export const BlogSchema = CreativeWorkSchema.extend({
  type: z.literal('blog').default('blog'),
  platform: reference(OrganizationSchema).optional()
}).describe("A personal web site or account on a hosted social media service.");
export type Blog = z.infer<typeof BlogSchema>;
