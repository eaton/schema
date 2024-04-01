import { z } from 'zod';
import { oneOrMore, reference } from '../../util.js';
import { CreativeWorkSchema } from "./creative-work.js";

export const SocialMediaPostingSchema = CreativeWorkSchema.extend({
  type: z.literal('post').default('post'),
  sharedContent: oneOrMore(reference(CreativeWorkSchema)).optional()
});
export type SocialMediaPosting = z.infer<typeof SocialMediaPostingSchema>;
