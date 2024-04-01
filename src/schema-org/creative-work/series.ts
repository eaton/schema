import { z } from 'zod';
import { CreativeWorkSchema } from "./creative-work.js";

export const SeriesSchema = CreativeWorkSchema.extend({
  type: z.literal('series').default('series'),
  entries: z.number().optional(),
}).describe("A collection of multiple creative works, usually sharing a particular theme or narrative arc.");
export type Series = z.infer<typeof SeriesSchema>;
