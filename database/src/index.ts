import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { config } from './config'
import * as schema from './schemas'

const sql = neon(config.databaseUrl)
export const db = drizzle({ client: sql, schema })
