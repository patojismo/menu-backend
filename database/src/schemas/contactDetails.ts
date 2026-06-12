import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { providers } from './providers'

export const contactRole = pgEnum('contact_role', [
  'sales',
  'delivery',
  'accounting',
  'general',
])

export const contactDetails = pgTable('contact_details', {
  id: serial('id').primaryKey(),
  providerId: integer('provider_id')
    .notNull()
    .references(() => providers.id),
  role: contactRole('role').notNull().default('general'),
  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),
  isPrimary: boolean('is_primary').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type ContactDetails = typeof contactDetails.$inferSelect
export type NewContactDetails = typeof contactDetails.$inferInsert
