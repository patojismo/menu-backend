import { integer, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { inventory } from './inventory'
import { units } from './units'

export const menu = pgTable('menu', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type Menu = typeof menu.$inferSelect
export type NewMenu = typeof menu.$inferInsert

export const menuIngredients = pgTable('menu_ingredients', {
  id: serial('id').primaryKey(),
  menuId: integer('menu_id')
    .notNull()
    .references(() => menu.id),
  inventoryId: integer('inventory_id')
    .notNull()
    .references(() => inventory.id),
  quantity: numeric('quantity', { precision: 14, scale: 4 }).notNull(),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type MenuIngredient = typeof menuIngredients.$inferSelect
export type NewMenuIngredient = typeof menuIngredients.$inferInsert
