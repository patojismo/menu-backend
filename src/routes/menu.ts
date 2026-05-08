import { Type } from '@sinclair/typebox'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { Elysia, status, t } from 'elysia'
import { createMenuSql, deleteMenuSql, getMenuByIdSql, listMenuSql, replaceMenuSql } from '../db/menu.sql'
import { menu } from '../db/schema'

const menuRow = createSelectSchema(menu)
const menuInsert = createInsertSchema(menu)
/** Body sin `id` (PK autogenerada). */
const menuCreateBody = Type.Omit(menuInsert, ['id'])

export const menuRoutes = new Elysia({ prefix: '/menu' })
  .get(
    '/',
    async () => listMenuSql(),
    {
      response: t.Array(menuRow),
      detail: { summary: 'Listar ítems del menú', tags: ['menu'] },
    },
  )
  .get(
    '/:id',
    async ({ params }) => {
      const row = await getMenuByIdSql(params.id)
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
      return createMenuSql({ name: body.name, description: body.description ?? null })
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
      const row = await replaceMenuSql(params.id, {
        name: body.name,
        description: body.description ?? null,
      })
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
      const row = await deleteMenuSql(params.id)
      if (!row) throw status(404, { error: 'Not found' })
      return row
    },
    {
      params: t.Object({ id: t.Numeric() }),
      response: menuRow,
      detail: { summary: 'Eliminar ítem', tags: ['menu'] },
    },
  )
