import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { config } from './config'

const sql = neon(config.databaseUrl)
const db = drizzle({ client: sql })

await migrate(db, { migrationsFolder: './drizzle' })
console.log('Migrations applied successfully!')
