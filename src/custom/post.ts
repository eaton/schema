import { z } from 'zod';
import { CreativeWorkSchema } from "../schema-org/creative-work.js";

export const PostSchema = CreativeWorkSchema.extend({
  type: z.literal('post').default('post'),
  dek: z.string().optional(),
});
export type Post = z.infer<typeof PostSchema>;
