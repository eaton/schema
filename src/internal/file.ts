import { z } from 'zod';

// Supported MimeTypes will probably be something along the lines of:
//
// - image/*
// - audio/*
// - video/*
// - application/pdf
// - application/zip
// - text/csv
// - text/plain
// - application/json
// - application/x-ndjson
// - text/calendar
// - application/epub+zip
// - application/epub+zip
// - text/html
// - font/otf
// - font/ttf
// - font/woff
// - font/wof2
// - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

// The idea here is to capture a source file and any auto-generated permutations of that source file.
// Quite a bit of this is probably overkill, but hey.
export const FileSchema = z.object({
  id: z.string(),
  variant: z.string(),
  protocol: z.string(),
  server: z.string(),
  path: z.string(),
  name: z.string().optional(),
  alt: z.string().optional(),
  mime: z.string(),
  bytes: z.number().optional(),
  outputFileName: z.string().optional(),
})
export type File = z.infer<typeof FileSchema>;
