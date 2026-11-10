# ARCHITECTURE RULES

Preserve separation of concerns, dependency direction, testability, and
predictable behavior without creating ornamental abstractions. Never bypass
established boundaries for fewer lines or hide coupling behind globals.

## Layers

Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4,
Zod, react-hook-form.

Flow: `app (routes) -> components -> services / data / lib`.

- `src/app/`: routing, metadata, data loading in Server Components, route
  handlers, `sitemap.ts`, `robots.ts`.
- `src/components/<feature>/`: presentation. Page clients receive data as
  props; they do not import `*.server.ts`.
- `src/services/api.ts`: single data facade for pages and route handlers.
  Providers (`backend.server.ts`, `gestaoclick.server.ts`) own source-specific
  fetching and mapping into `src/data/types.ts` shapes.
- `src/data/`: static content and shared types. `src/lib/`: pure helpers.
- `src/contexts/`, `src/hooks/`: client-only state and hooks.

Forbidden: client components importing `*.server.ts` or reading secret env
vars; services importing components; `lib/` depending on services or React
state; pages fetching a provider directly instead of the facade.

## Catalog transition

The product source is changing (see `.agents/catalog-content.md`). Introduce a
new source behind the same facade or replace the facade deliberately; do not
build a parallel data path alongside it. Remove dead providers, routes, and
contexts only as an explicit step with its redirects and env cleanup.

## Rendering and performance

Prefer static generation or `revalidate` for catalog content; use dynamic
rendering only when data requires it. Use `next/image` for product imagery.
Create new abstractions only after finding no equivalent and proving a current
responsibility. Do not perform broad migrations as side effects.
