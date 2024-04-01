import { z } from 'zod';
import { CreativeWorkSchema } from "../schema-org/creative-work/creative-work.js";
import { SocialMediaPostingSchema } from '../schema-org/index.js';
import { reference } from '../util.js';

export const NoteSchema = CreativeWorkSchema.extend({
  type: z.literal('creativeWork').default('creativeWork'),
  additionalType: z.literal('note').default('note'),
}).describe("Ephemera, personal journal entries, annontations, commentary about my own prior posts, and content in progress.");
export type Note = z.infer<typeof NoteSchema>;

export const CommentSchema = SocialMediaPostingSchema.extend({
  type: z.literal('post').default('post'),
  additionalType: z.literal('comment').default('comment'),
  inReplyTo: reference(CreativeWorkSchema).optional(),
}).describe("Archival copies of comments I posted somewhere else on the internet, in reply to someone else's content.");
export type Comment = z.infer<typeof CommentSchema>;

export const StatusSchema = SocialMediaPostingSchema.extend({
  type: z.literal('post').default('post'),
  additionalType: z.literal('status').default('status'),
  inReplyTo: reference(CreativeWorkSchema).optional(),
}).describe("Tweets, Mastodon posts, and other microblog-style content. The isPartOf property should point to a Blog or account URL.");
export type Status = z.infer<typeof StatusSchema>;

// Used for shared/saved bookmarks from various services like
// Pinboard, ReadItLater, and so on.
export const BookmarkSchema = SocialMediaPostingSchema.extend({
  type: z.literal('post').default('post'),
  additionalTypes: z.literal('bookmark').default('bookmark'),
}).describe("Shared and saved bookmarks from services like Pinboard, ReadItLater, etc.");
export type Bookmark = z.infer<typeof BookmarkSchema>;

// See https://schema.org/Photo for details.
export const PhotoSchema = CreativeWorkSchema.extend({
  type: z.literal('photo').default('photo'),
}).describe("A photograph.");
export type Photo = z.infer<typeof PhotoSchema>;
