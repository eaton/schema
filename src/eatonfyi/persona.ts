import { ThingSchema } from "../schema-org";
import { reference } from "../util.js";
import { PersonSchema } from "../schema-org";
import { z } from 'zod';

export const PersonaSchema = ThingSchema.extend({
  person: reference(PersonSchema),
});
export type Persona = z.infer<typeof PersonaSchema>;