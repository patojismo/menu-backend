import { integer, numeric, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { providers } from './providers'
import { units } from './units'

export const inventoryMovementType = pgEnum('inventory_movement_type', [
  'restocked',
  'consumed',
  'expired',
  'adjusted',
])

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type Inventory = typeof inventory.$inferSelect
export type NewInventory = typeof inventory.$inferInsert

export const inventoryHistory = pgTable('inventory_history', {
  id: serial('id').primaryKey(),
  inventoryId: integer('inventory_id')
    .notNull()
    .references(() => inventory.id),
  type: inventoryMovementType('type').notNull(),
  quantity: numeric('quantity', { precision: 14, scale: 4 }).notNull(),
  providerId: integer('provider_id').references(() => providers.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
})

export type InventoryHistory = typeof inventoryHistory.$inferSelect
export type NewInventoryHistory = typeof inventoryHistory.$inferInsert
