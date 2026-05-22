import { Type } from '@sinclair/typebox'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'
import { z } from 'zod'
import { menu } from '../db/schema'

const menuInsertSchema = createInsertSchema(menu)

export const menuRowSchema = createSelectSchema(menu)
export const menuCreateBodySchema = Type.Omit(menuInsertSchema, ['id'])
export const menuIdParamsSchema = t.Object({ id: t.Numeric() })

const menuNameDescription = 'Menu item name'
const menuDescriptionDescription = 'Optional menu item description'
const menuIdDescription = 'Menu item id'

export const menuCreateInputSchema = {
  name: z.string().min(1).describe(menuNameDescription),
  description: z.string().nullable().optional().describe(menuDescriptionDescription),
}

export const menuIdInputSchema = {
  id: z.number().int().positive().describe(menuIdDescription),
}

export const menuUpdateInputSchema = {
  ...menuIdInputSchema,
  ...menuCreateInputSchema,
}
