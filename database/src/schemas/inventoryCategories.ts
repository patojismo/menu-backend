import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { inventory } from './inventory'

export const inventoryCategories = pgTable('inventory_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type InventoryCategory = typeof inventoryCategories.$inferSelect
export type NewInventoryCategory = typeof inventoryCategories.$inferInsert

export const inventoryItemCategories = pgTable(
  'inventory_item_categories',
  {
    inventoryId: integer('inventory_id')
      .notNull()
      .references(() => inventory.id),
    categoryId: integer('category_id')
      .notNull()
      .references(() => inventoryCategories.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.inventoryId, table.categoryId] }),
  }),
)

export type InventoryItemCategory = typeof inventoryItemCategories.$inferSelect
export type NewInventoryItemCategory = typeof inventoryItemCategories.$inferInsert
