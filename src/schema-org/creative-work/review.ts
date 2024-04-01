import { z } from 'zod';
import { CreativeWorkSchema } from './creative-work.js';

// The inherited 'about' property is mapped to schema.org's 'itemReviewed' property.
// In theory, 'rating' can be a complex structure aggregating many different reviews.

// See https://schema.org/Rating for details.
export const ReviewSchema = CreativeWorkSchema.extend({
  type: z.literal('review').default('review'),
  positive: z.string().optional(),
  negative: z.string().optional(),
  aspect: z.string().optional(),
  rating: z.number().optional(),
}).describe("A review of an item - for example, of a restaurant, movie, or store.");
export type Review = z.infer<typeof ReviewSchema>;

