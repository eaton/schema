import { z } from 'zod';

// Everything is assumed to be in inches; we convert before processing.
export const DimensionsSchema = z.object({
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
});
export type Dimension = z.infer<typeof DimensionsSchema>;
