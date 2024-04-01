import { z } from 'zod';
import { oneOrDict, reference } from '../util.js';
import { ThingSchema } from '../schema-org/thing.js';

/**
 * Absolute baseline relationship; describes a connection between any two things.
 * the 'relationship' property can be used to describe the nature of the relationship,
 * and will be used as the property name on the target entity if the relationship
 * is aggregated.
 * 
 * Examples include:
 * 
 * @see {@link https://schema.org/spouse | spouse}, connecting two {@see PersonSchema}s.
 * @see {@link https://schema.org/parent | parent}, connecting two {@see PersonSchema}s.
 * @see {@link https://schema.org/sibling | sibling}, connecting two {@see PersonSchema}s.
 * @see {@link https://schema.org/knows | knows}, connecting two {@see PersonSchema}s.
 * @see {@link https://schema.org/knows | attendee}, connecting a {@see PersonSchema} and an {@see EventSchema}.
 * @see {@link https://schema.org/knowsAbout | knowsAbout}, connecting a {@see PersonSchema} and an {@see ThingSchema}.
 */
export const ConnectionSchema = z.object({
  _from: reference(ThingSchema),
  _to: reference(ThingSchema),
  type: z.literal('connection'),
  relationship: z.string().describe("A keyword indicating the nature of the connection."),
}).describe("A named, directional connection from one Thing to another.")
export type Connection = z.infer<typeof ConnectionSchema>;

