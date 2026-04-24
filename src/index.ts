import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { menuRoutes } from './routes/menu'

const port = Number(process.env.PORT) || 3000

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Menú API',
          version: '1.0.0',
          description: 'API del menú del restaurante (Elysia + Drizzle + Neon).',
        },
        tags: [{ name: 'menu', description: 'Ítems del menú' }],
      },
    }),
  )
  .get('/health', () => ({ status: 'ok' as const }), {
    detail: { summary: 'Healthcheck', tags: ['system'] },
  })
  .use(menuRoutes)
  .listen(port)

console.log(`🦊 Elysia at http://${app.server?.hostname}:${app.server?.port}`)
