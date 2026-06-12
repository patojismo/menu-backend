import { char, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const addressDetails = pgTable('address_details', {
  id: serial('id').primaryKey(),
  address1: text('address_1').notNull(),
  address2: text('address_2'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  country: text('country'),
  countryCode: char('country_code', { length: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
})

export type AddressDetails = typeof addressDetails.$inferSelect
export type NewAddressDetails = typeof addressDetails.$inferInsert
