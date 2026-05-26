import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'

const rootEnvPath = resolve(import.meta.dir, '../../.env')
const rootEnvLocalPath = resolve(import.meta.dir, '../../.env.local')
const projectEnvPath = resolve(import.meta.dir, '../.env')
const projectEnvLocalPath = resolve(import.meta.dir, '../.env.local')

if (existsSync(rootEnvPath)) {
  loadEnv({ path: rootEnvPath })
}

if (existsSync(rootEnvLocalPath)) {
  loadEnv({ path: rootEnvLocalPath, override: true })
}

if (existsSync(projectEnvPath)) {
  loadEnv({ path: projectEnvPath, override: true })
}

if (existsSync(projectEnvLocalPath)) {
  loadEnv({ path: projectEnvLocalPath, override: true })
}

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required')
}

export const config = {
  databaseUrl,
}
