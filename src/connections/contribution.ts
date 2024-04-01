import { z } from 'zod';
import { PersonSchema } from "../schema-org/person.js";
import { oneOrDict, reference } from '../util.js';
import { ConnectionSchema } from './connection.js';
import { CreativeWorkSchema } from '../schema-org/index.js';

// Schema.org has one-off properties for a bunch of different person-to-creative-work
// roles. We have a single 'creator' property for simplicity, and all multiple value
// or distinct role types are distinguished via the 'subType' property.

// Examples include 'author', 'illustrator', 'editor', 'translator', 'director', 'actor',
// etc.
//
// person => employee => org (jobTitle, date.start, date.end)

export const ContributionSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(CreativeWorkSchema),
  type: z.literal('contribution').default('contribution'),
  subType:  z.string().optional(),
});
export type Contribution = z.infer<typeof ContributionSchema>;