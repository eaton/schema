import { z } from 'zod';

export function reference<T extends z.ZodTypeAny>(thingType: T) {
  return z.union([
    z.string(),
    thingType
  ]);
}

export function oneOrMore<T extends z.ZodTypeAny>(thingType: T) {
  return z.union([
    thingType,
    z.array(thingType)
  ])
}

export function oneOrDict<T extends z.ZodTypeAny>(thingType: T) {
  return z.union([
    thingType,
    z.record(thingType)
  ])
}

// Everything is assumed to be in inches; we convert before processing.
export const DimensionsSchema = z.object({
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
});
export type Dimension = z.infer<typeof DimensionsSchema>;
