import { z } from 'zod';
import { CreativeWorkSchema } from "../schema-org/creative-work.js";

export const PresentationSchema = CreativeWorkSchema.extend({
  type: z.literal('presentation').default('presentation'),
  pdf: z.string().url().optional(),
  video: z.string().url().optional(),
});
export type Presentation = z.infer<typeof PresentationSchema>;
