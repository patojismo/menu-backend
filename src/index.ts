import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { menuRoutes } from './routes/menu'

const port = Number(process.env.PORT) || 3000

const app = new Elysia()
  .use(
    swagger({
      path: '/swagger',
      specPath: '/swagger/json',
      scalarConfig: {
        spec: { url: '/swagger/json' },
      },
      documentation: {
        info: {
          title: 'Menú API',
          version: '1.0.0',
          description: 'API del menú del restaurante (Elysia + Drizzle + Neon).',
        },
        tags: [
          { name: 'system', description: 'Sistema' },
          { name: 'menu', description: 'Ítems del menú' },
        ],
      },
    }),
  )
  .get('/health', () => ({ status: 'ok' as const }), {
    detail: { summary: 'Healthcheck', tags: ['system'] },
  })
  .group('/api/v1', (app) => app.use(menuRoutes))
  .listen(port)

console.log(`🦊 Elysia at http://${app.server?.hostname}:${app.server?.port}`)
