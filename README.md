# Menú — API (Elysia + Drizzle + Neon)

API REST mínima para ítems de menú de restaurante: **Bun**, **ElysiaJS**, **Drizzle ORM** y **PostgreSQL** en [Neon](https://neon.tech).

## Requisitos

- [Bun](https://bun.sh) instalado (`bun upgrade --stable` recomendado)
- Proyecto y base de datos en Neon con connection string (incluye `?sslmode=require`)

## Configuración

1. Copiá el ejemplo de variables:

   ```bash
   cp .env.example .env
   ```

2. Editá `.env` y pegá tu `DATABASE_URL` de Neon y opcionalmente `PORT` (default `3000`).

3. Instalá dependencias:

   ```bash
   bun install
   ```

4. Generá y aplicá migraciones (crea la tabla `menu`):

   ```bash
   bun run db:generate
   bun run db:migrate
   ```

   Alternativa en desarrollo (sin archivos SQL versionados): `bun run db:push`.

5. Arrancá el servidor:

   ```bash
   bun run dev
   ```

- Health: `GET http://localhost:3000/health`
- CRUD menú: `http://localhost:3000/menu`
- OpenAPI / Swagger UI: `http://localhost:3000/swagger`

## Scripts

| Script | Descripción |
|--------|-------------|
| `bun run dev` | Servidor con recarga |
| `bun run start` | Servidor sin watch |
| `bun run db:generate` | Generar migraciones desde el schema Drizzle |
| `bun run db:migrate` | Aplicar migraciones pendientes |
| `bun run db:push` | Sincronizar schema directo a la DB (dev) |
| `bun run db:studio` | Drizzle Studio |
| `bun run typecheck` | `tsc --noEmit` |

## Modelo `menu`

| Columna | Tipo |
|---------|------|
| `id` | serial, PK |
| `name` | text, not null |
| `description` | text, nullable |
