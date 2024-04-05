import { z } from 'zod';

// This stuff might be an unecessary distraction — there's enough going on with the bare
// schema, 'identifier' should be able to serve as a key, and 'type/subtype' could map
// to the collection/table values.

// We'll see.

export const Publishable = z.object({
  _created: z.date().default(new Date(Date.now())),
  _modified: z.date().default(new Date(Date.now())),
  _deleted: z.boolean().optional(),
  _hidden: z.boolean().optional(),
  meta: z.object({
    attachments: z.array(z.string().url().optional()).optional(),
  }).optional(),
});
