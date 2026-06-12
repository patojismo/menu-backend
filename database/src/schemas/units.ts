import { boolean, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const unitDimension = pgEnum('unit_dimension', ['mass', 'volume', 'count', 'length', 'time'])

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  dimension: unitDimension('dimension').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type Unit = typeof units.$inferSelect
export type NewUnit = typeof units.$inferInsert
