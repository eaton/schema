import { z } from 'zod';
import { PersonSchema } from "../schema-org/person.js";
import { reference } from '../util.js';
import { ConnectionSchema } from './connection.js';
import { CreativeWorkSchema } from '../schema-org/index.js';

/**
 * Schema.org has one-off properties for a bunch of different person-to-creative-work
 * roles. We have a single 'creator' property for simplicity, and all multiple value
 * or distinct role types are distinguished via the 'relationship' property inherited
 * from {@see ConnectionSchema}.
 * 
 * Examples include:
 * 
 * - {@link https://schema.org/actor | actor}
 * - {@link https://schema.org/artist | artist}
 * - {@link https://schema.org/author | author}
 * - {@link https://schema.org/character | character}
 * - {@link https://schema.org/composer | composer}
 * - {@link https://schema.org/contributor | contributor}
 * - {@link https://schema.org/creator | creator}
 * - {@link https://schema.org/director | director}
 * - {@link https://schema.org/editor | editor}
 * - {@link https://schema.org/editor | editor}
 * - {@link https://schema.org/funder | funder}
 * - {@link https://schema.org/illustrator | illustrator}
 * - {@link https://schema.org/producer | producer}
 * - {@link https://schema.org/publisher | publisher}
 * - {@link https://schema.org/translator | translator}
 */
export const ContributionSchema = ConnectionSchema.extend({
  _from: reference(PersonSchema),
  _to: reference(CreativeWorkSchema),
  type: z.literal('contribution').default('contribution'),
}).describe("A creative, supervisory, or editorial contribution to a creative work.")
export type Contribution = z.infer<typeof ContributionSchema>;