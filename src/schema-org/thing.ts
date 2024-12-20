import { z } from 'zod';
import { idSchema, oneOrMany, urlStringSchema } from '../fragments/index.js';

export const ThingSchema = z
  .object({
    id: idSchema,
    type: z.string().default('Thing'),
    name: z.string().optional(),
    alternateName: oneOrMany(z.string()).optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    url: urlStringSchema.optional(),
    keywords: z.array(z.string()).optional(),
    isPartOf: oneOrMany(z.string()).optional(), // none, one, or more string or string/order objects
    hasPart: oneOrMany(z.string()).optional(), // none, one, or more string or string/order objects
    me: z
      .enum(['by', 'about', 'with', 'via'])
      .optional()
      .describe(
        'Nonstandard flag to quickly indicate that an entitiy is canonically owned/created by me. Simpler than jamming myself in the creator field of everything.',
      ),
  })
  .passthrough();

export type Thing = z.infer<typeof ThingSchema>;
