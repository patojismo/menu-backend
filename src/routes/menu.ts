import { Type } from '@sinclair/typebox'
import { eq } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Elysia, status, t } from 'elysia'
import { db } from '../db'
import { menu } from '../db/schema'

const menuRow = createSelectSchema(menu)
const menuInsert = createInsertSchema(menu)
/** Body sin `id` (PK autogenerada). */
const menuCreateBody = Type.Omit(menuInsert, ['id'])

export const menuRoutes = new Elysia({ prefix: '/menu' })
  .get(
    '/',
    async () => db.select().from(menu),
    {
      response: t.Array(menuRow),
      detail: { summary: 'Listar ítems del menú', tags: ['menu'] },
    },
  )
  .get(
    '/:id',
    async ({ params }) => {
      const rows = await db.select().from(menu).where(eq(menu.id, params.id)).limit(1)
      const row = rows[0]
      if (!row) throw status(404, { error: 'Not found' })
      return row
    },
    {
      params: t.Object({ id: t.Numeric() }),
      response: menuRow,
      detail: { summary: 'Obtener ítem por id', tags: ['menu'] },
    },
  )
  .post(
    '/',
    async ({ body }) => {
      const [row] = await db
        .insert(menu)
        .values({ name: body.name, description: body.description ?? null })
        .returning()
      return row
    },
    {
      body: menuCreateBody,
      response: menuRow,
      detail: { summary: 'Crear ítem', tags: ['menu'] },
    },
  )
  .put(
    '/:id',
    async ({ params, body }) => {
      const [row] = await db
        .update(menu)
        .set({ name: body.name, description: body.description ?? null })
        .where(eq(menu.id, params.id))
        .returning()
      if (!row) throw status(404, { error: 'Not found' })
      return row
    },
    {
      params: t.Object({ id: t.Numeric() }),
      body: menuCreateBody,
      response: menuRow,
      detail: { summary: 'Reemplazar ítem', tags: ['menu'] },
    },
  )
  .delete(
    '/:id',
    async ({ params }) => {
      const [row] = await db.delete(menu).where(eq(menu.id, params.id)).returning()
      if (!row) throw status(404, { error: 'Not found' })
      return row
    },
    {
      params: t.Object({ id: t.Numeric() }),
      response: menuRow,
      detail: { summary: 'Eliminar ítem', tags: ['menu'] },
    },
  )
