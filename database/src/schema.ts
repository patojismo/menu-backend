import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const inventoryMovementType = pgEnum('inventory_movement_type', [
  'restocked',
  'consumed',
  'expired',
  'adjusted',
])

export const menu = pgTable('menu', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
})

export type Menu = typeof menu.$inferSelect
export type NewMenu = typeof menu.$inferInsert

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export type Inventory = typeof inventory.$inferSelect
export type NewInventory = typeof inventory.$inferInsert

export const inventoryHistory = pgTable('inventory_history', {
  id: serial('id').primaryKey(),
  inventoryId: integer('inventory_id')
    .notNull()
    .references(() => inventory.id),
  type: inventoryMovementType('type').notNull(),
  amount: integer('amount').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
})

export type InventoryHistory = typeof inventoryHistory.$inferSelect
export type NewInventoryHistory = typeof inventoryHistory.$inferInsert
