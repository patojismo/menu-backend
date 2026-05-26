import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { config } from './config'
import { mcpPlugin } from './mcp'
import { menuRoutes } from './routes/menu'

const { port } = config
const mcpAllowedMethods = 'GET, POST, DELETE, OPTIONS'
const mcpAllowedHeaders = 'Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version'
const mcpExposedHeaders = 'mcp-session-id'

const app = new Elysia()
  .use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'mcp-session-id', 'mcp-protocol-version'],
      exposeHeaders: ['mcp-session-id'],
      preflight: true,
    }),
  )
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
  .options('/mcp', ({ set }) => {
    set.status = 204
    return
  })
  .options('/mcp/*', ({ set }) => {
    set.status = 204
    return
  })
  .onAfterHandle(({ request, path, set }) => {
    if (!path.startsWith('/mcp')) return

    const currentAllowOrigin =
      set.headers['Access-Control-Allow-Origin'] ?? set.headers['access-control-allow-origin']
    if (currentAllowOrigin) return

    const origin = request.headers.get('origin')
    set.headers['Access-Control-Allow-Origin'] = origin ?? '*'
    set.headers['Access-Control-Allow-Methods'] = mcpAllowedMethods
    set.headers['Access-Control-Allow-Headers'] = mcpAllowedHeaders
    set.headers['Access-Control-Expose-Headers'] = mcpExposedHeaders
    set.headers.Vary = 'Origin'
  })
  .use(mcpPlugin)
  .group('/api/v1', (app) => app.use(menuRoutes))
  .listen(port)

console.log(`🦊 Elysia at http://${app.server?.hostname}:${app.server?.port}`)
