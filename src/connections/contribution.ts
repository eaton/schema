import { z } from 'zod';
import { PersonSchema } from "../person.js";
import { CreativeWorkSchema } from '../creative-work.js';
import { ConnectionSchema } from './connection.js';
import { reference } from '../util.js';

// Schema.org has one-off properties for a bunch of different creator/contributor roles.
// We put them into an intermediary pile, and use the optional 'role' to distinguish
// between them.

// When constructing schema.org metadata, yoink any supported roles for use as
// the actual property name.

export const ContributionSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(CreativeWorkSchema),
  type: z.literal('contributor'),
  role: z.string().optional(),
});
export type Contribution = z.infer<typeof ContributionSchema>;