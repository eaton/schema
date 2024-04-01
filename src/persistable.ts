import { z } from 'zod';

export const Persistable = z.object({
  _created: z.date().default(new Date(Date.now())),
  _modified: z.date().default(new Date(Date.now())),
  _deleted: z.boolean().optional(),
})

export const ArangoDocument = Persistable.extend({
  _collection: z.string(),
  _key: z.string().optional(),
  _id: z.string().optional(),
})

export const SqlRow = Persistable.extend({
  _table: z.string(),
})
