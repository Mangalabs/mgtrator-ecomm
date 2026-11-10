# ARCHITECTURE RULES

Preserve separation of concerns, dependency direction, testability, and
predictable behavior without creating ornamental abstractions. Never bypass
established boundaries for fewer lines or hide coupling behind globals.

## Layers

Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4,
Zod, react-hook-form.

Flow: `app (routes) -> components -> data / lib`.

Static export (`output: 'export'`, hosted on cPanel): every route must be
prerenderable at build time. Dynamic segments need `generateStaticParams` and
`dynamicParams = false`; metadata routes need `dynamic = 'force-static'`.

- `src/app/`: routing, metadata, Server Components, `sitemap.ts`, `robots.ts`.
- `src/components/<feature>/`: presentation. Page clients receive data as
  props.
- `src/data/`: static content and shared types. `src/lib/`: pure helpers.

Forbidden: route handlers, ISR, server-side request APIs, runtime env vars;
`lib/` depending on React state; a new data source without
`/data-contract` and a user decision.

## Catalog transition

The e-commerce flow and the GestãoClick provider were removed (2026-11); the
catalog is static data in `src/data/catalog.ts`. A future data source (sheet,
new ERP) must be proposed with `/data-contract` and, on a static host, be read
at build time.

## Rendering and performance

Prefer static generation or `revalidate` for catalog content; use dynamic
rendering only when data requires it. Use `next/image` for product imagery.
Create new abstractions only after finding no equivalent and proving a current
responsibility. Do not perform broad migrations as side effects.
