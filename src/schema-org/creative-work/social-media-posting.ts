import { z } from 'zod';
import { oneOrMore, reference } from '../../util.js';
import { CreativeWorkSchema } from "./creative-work.js";

export const SocialMediaPostingSchema = CreativeWorkSchema.extend({
  type: z.literal('post').default('post'),
  sharedContent: oneOrMore(reference(CreativeWorkSchema)).optional(),
  votes: z.number().optional().describe('The number of times the post has been upvoted or favorited.'),
  shares: z.number().optional().describe('The number of times the post has been re-shared on the platform; e.g., retweets on Twitter.'),
}).describe("A piece of content posted on a social media site, including blog posts, bookmarks, tweets, and so on.");
export type SocialMediaPosting = z.infer<typeof SocialMediaPostingSchema>;
