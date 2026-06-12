import { boolean, integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { addressDetails } from './addressDetails'
import { inventory } from './inventory'

export const providers = pgTable('providers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  addressDetailsId: integer('address_details_id').references(() => addressDetails.id),
  notes: text('notes'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type Provider = typeof providers.$inferSelect
export type NewProvider = typeof providers.$inferInsert

export const inventoryProviders = pgTable(
  'inventory_providers',
  {
    inventoryId: integer('inventory_id')
      .notNull()
      .references(() => inventory.id),
    providerId: integer('provider_id')
      .notNull()
      .references(() => providers.id),
    isPreferred: boolean('is_preferred').notNull().default(false),
    leadTimeDays: integer('lead_time_days'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.inventoryId, table.providerId] }),
  }),
)

export type InventoryProvider = typeof inventoryProviders.$inferSelect
export type NewInventoryProvider = typeof inventoryProviders.$inferInsert
