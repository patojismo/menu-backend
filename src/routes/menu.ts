import { Elysia, status, t } from 'elysia'
import { menuCreateBodySchema, menuIdParamsSchema, menuRowSchema } from '../contracts/menu'
import { createMenuSql, deleteMenuSql, getMenuByIdSql, listMenuSql, replaceMenuSql } from '../db/menu.sql'

export const menuRoutes = new Elysia({ prefix: '/menu' })
  .get(
    '',
    async () => listMenuSql(),
    {
      response: t.Array(menuRowSchema),
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
      params: menuIdParamsSchema,
      response: menuRowSchema,
      detail: { summary: 'Obtener ítem por id', tags: ['menu'] },
    },
  )
  .post(
    '',
    async ({ body }) => {
      return createMenuSql({ name: body.name, description: body.description ?? null })
    },
    {
      body: menuCreateBodySchema,
      response: menuRowSchema,
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
      params: menuIdParamsSchema,
      body: menuCreateBodySchema,
      response: menuRowSchema,
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
      params: menuIdParamsSchema,
      response: menuRowSchema,
      detail: { summary: 'Eliminar ítem', tags: ['menu'] },
    },
  )
