import { bigint, integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { purchaseCosts } from './purchaseCosts'
import { currencies } from './currencies'
import { inventory, inventoryHistory } from './inventory'

export const sellingPrices = pgTable('selling_prices', {
  id: serial('id').primaryKey(),
  inventoryId: integer('inventory_id')
    .notNull()
    .references(() => inventory.id),
  purchaseCostId: integer('purchase_cost_id').references(() => purchaseCosts.id),
  inventoryHistoryId: integer('inventory_history_id').references(() => inventoryHistory.id),
  currencyId: integer('currency_id')
    .notNull()
    .references(() => currencies.id),
  unitPriceMinor: bigint('unit_price_minor', { mode: 'bigint' }).notNull(),
  validFrom: timestamp('valid_from', { withTimezone: true }).notNull().defaultNow(),
  validTo: timestamp('valid_to', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type SellingPrice = typeof sellingPrices.$inferSelect
export type NewSellingPrice = typeof sellingPrices.$inferInsert
