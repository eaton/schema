import { z } from 'zod';

// Supported MimeTypes will probably be something along the lines of:
//
// - text/plain
// - text/markdown
// - text/html
// - text/csv
// - text/tsv
// - application/xml
// - application/json
// - application/ld+json
// - application/x-ndjson 

// @see {@link https://www.iana.org/assignments/markdown-variants/markdown-variants.xhtml}

export const ContentSchema = z.object({
  id: z.string(),
  thing: z.string(),
  property: z.string().default('body'),
  mime: z.string().default('text/markdown'),
  value: z.string()
})
export type Content = z.infer<typeof ContentSchema>;
