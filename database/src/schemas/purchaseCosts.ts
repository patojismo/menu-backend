import { bigint, integer, numeric, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { currencies } from './currencies'
import { inventory, inventoryHistory } from './inventory'

export const purchaseCosts = pgTable(
  'purchase_costs',
  {
    id: serial('id').primaryKey(),
    inventoryId: integer('inventory_id')
      .notNull()
      .references(() => inventory.id),
    inventoryHistoryId: integer('inventory_history_id')
      .notNull()
      .references(() => inventoryHistory.id),
    currencyId: integer('currency_id')
      .notNull()
      .references(() => currencies.id),
    quantity: numeric('quantity', { precision: 14, scale: 4 }).notNull(),
    unitCostMinor: bigint('unit_cost_minor', { mode: 'bigint' }).notNull(),
    totalCostMinor: bigint('total_cost_minor', { mode: 'bigint' }).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    oneCostPerHistory: uniqueIndex('purchase_costs_inventory_history_id_unique').on(table.inventoryHistoryId),
  }),
)

export type PurchaseCost = typeof purchaseCosts.$inferSelect
export type NewPurchaseCost = typeof purchaseCosts.$inferInsert
