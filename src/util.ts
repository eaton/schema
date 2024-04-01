import { z } from 'zod';

/**
 * For my purposes, a 'reference' is either a string or a populated schema entity.
 * If it's a string, it can either be an 'FYID' (:TYPECODE:UNIQUESTRING:OPTIONAL-SUBSTRING)
 * or a URL or a "raw" string that's treated as a one-off name. Those raw names are
 * useful for things that will never actually appear twice but kinda want a name
 * value. The name of a particular podcast, for example.
 */
export function reference<T extends z.ZodTypeAny>(thingType: T) {
  return z.union([
    z.string(),
    thingType
  ]);
}


/**
 * One single item, or an array of items of a given type.
 */
export function oneOrMore<T extends z.ZodTypeAny>(thingType: T) {
  return z.union([
    thingType,
    z.array(thingType)
  ])
}

/**
 * One single item, or a string-keyed dictionary of a given item type.
 * This is used for things like dates, or ID codes (where 'isbn10', 'loc',
 * and 'asin' may all be available for one thing with a single canonical
 * ID.)
 */
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
