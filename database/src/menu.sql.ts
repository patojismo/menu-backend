import { eq } from 'drizzle-orm'
import { db } from './index'
import { menu } from './schemas'

type MenuPayload = {
  name: string
  description: string | null
}

export const listMenuSql = () => db.select().from(menu)

export const getMenuByIdSql = async (id: number) => {
  const rows = await db.select().from(menu).where(eq(menu.id, id)).limit(1)
  return rows[0]
}

export const createMenuSql = async (payload: MenuPayload) => {
  const [row] = await db.insert(menu).values(payload).returning()
  return row
}

export const updateMenuSql = async (id: number, payload: MenuPayload) => {
  const [row] = await db.update(menu).set(payload).where(eq(menu.id, id)).returning()
  return row
}

export const deleteMenuSql = async (id: number) => {
  const [row] = await db.delete(menu).where(eq(menu.id, id)).returning()
  return row
}
