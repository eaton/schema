import { z } from 'zod';

// Supported MimeTypes will probably be something along the lines of:
//
// - plain
// - markdown
// - html
// - csv
// - tsv
// - xml
// - json
// - ld+json
// - x-ndjson 

// @see {@link https://www.iana.org/assignments/markdown-variants/markdown-variants.xhtml}

export const BodySchema = z.object({
  entity: z.string(),
  property: z.string().default('body'),
  mime: z.string().default('plain'),
  variation: z.string().optional().describe('Stores variation names for meaningfully different versions of the same content. (Different reading levels, etc).'),
  value: z.string()
})
export type Body = z.infer<typeof BodySchema>;
