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
// The purpose is to allow any references to point at something internal like media://foo.bar/baz.jpeg,
// and replace it with a correct local or remote web URL.
// 
// Quite a bit of this is probably overkill, but hey.

export const FileSchema = z.object({
  id: z.string(),
  basedOn: z.string().optional().describe("For thumbnails and alternate-format versions of a file."),
  variant: z.string().optional().describe("Human-readable label for the variation."),
  url: z.string().describe("Storage URL for the file itself; may be split into path and server. Can point to remote files."),
  mime: z.string(),
  bytes: z.number().optional(),
  alt: z.string().optional().describe("Alt text for images"),
  filename: z.string().optional().describe("Optional public-facing filename for links and downloads."),
})
export type File = z.infer<typeof FileSchema>;
