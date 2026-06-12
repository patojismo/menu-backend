import { sql } from 'drizzle-orm'
import { boolean, char, integer, pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const currencies = pgTable(
  'currencies',
  {
    id: serial('id').primaryKey(),
    code: char('code', { length: 3 }).notNull().unique(),
    name: text('name').notNull(),
    symbol: text('symbol').notNull(),
    minorUnitDigits: integer('minor_unit_digits').notNull().default(2),
    isActive: boolean('is_active').notNull().default(true),
    isDefault: boolean('is_default').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => ({
    onlyOneDefault: uniqueIndex('currencies_only_one_default')
      .on(table.isDefault)
      .where(sql`${table.isDefault} = true`),
  }),
)

export type Currency = typeof currencies.$inferSelect
export type NewCurrency = typeof currencies.$inferInsert
