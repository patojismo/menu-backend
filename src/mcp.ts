import { mcp } from 'elysia-mcp'
import { menuCreateInputSchema, menuIdInputSchema, menuReplaceInputSchema } from './contracts/menu'
import {
  createMenuSql,
  deleteMenuSql,
  getMenuByIdSql,
  listMenuSql,
  replaceMenuSql,
} from './db/menu.sql'

const toMcpText = (data: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
})

export const mcpPlugin = mcp({
  serverInfo: {
    name: 'menu-mcp',
    version: '1.0.0',
  },
  stateless: true,
  enableJsonResponse: true,
  capabilities: {
    tools: {},
  },
  setupServer: async (server) => {
    server.registerTool(
      'list_menu',
      {
        description: 'List all menu items',
        inputSchema: {},
      },
      async () => toMcpText(await listMenuSql()),
    )

    server.registerTool(
      'get_menu_by_id',
      {
        description: 'Get one menu item by id',
        inputSchema: menuIdInputSchema,
      },
      async ({ id }) => {
        const row = await getMenuByIdSql(id)
        if (!row) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: `Menu item with id ${id} was not found` }],
          }
        }

        return toMcpText(row)
      },
    )

    server.registerTool(
      'create_menu',
      {
        description: 'Create a new menu item',
        inputSchema: menuCreateInputSchema,
      },
      async ({ name, description }) => {
        const row = await createMenuSql({
          name,
          description: description ?? null,
        })
        return toMcpText(row)
      },
    )

    server.registerTool(
      'replace_menu',
      {
        description: 'Replace an existing menu item by id',
        inputSchema: menuReplaceInputSchema,
      },
      async ({ id, name, description }) => {
        const row = await replaceMenuSql(id, {
          name,
          description: description ?? null,
        })
        if (!row) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: `Menu item with id ${id} was not found` }],
          }
        }

        return toMcpText(row)
      },
    )

    server.registerTool(
      'delete_menu',
      {
        description: 'Delete a menu item by id',
        inputSchema: menuIdInputSchema,
      },
      async ({ id }) => {
        const row = await deleteMenuSql(id)
        if (!row) {
          return {
            isError: true,
            content: [{ type: 'text' as const, text: `Menu item with id ${id} was not found` }],
          }
        }

        return toMcpText(row)
      },
    )
  },
})
