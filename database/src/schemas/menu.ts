import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const menu = pgTable('menu', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
})

export type Menu = typeof menu.$inferSelect
export type NewMenu = typeof menu.$inferInsert
