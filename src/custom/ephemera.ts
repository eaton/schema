import { z } from 'zod';
import { CreativeWorkSchema } from "../schema-org/creative-work.js";

export const EphemeraSchema = CreativeWorkSchema.extend({
  type: z.literal('ephemera').default('ephemera'),
  private: z.boolean().default(false),
});
export type Ephemera = z.infer<typeof EphemeraSchema>;
