# CATALOG CONTENT AND DATA RULES

Replaces the database module used in other projects: this site has no database
of its own. Product data comes from a provider behind `src/services/api.ts` or
from static content in `src/data/`.

## Sources

- `backend.server.ts`: external MG Tratorpeças backend, enabled by
  `MGTRATOR_BACKEND_URL` (or `ECOM_BACKEND_URL` / `INVENTORY_BACKEND_URL`).
- `gestaoclick.server.ts`: legacy GestãoClick ERP integration. API access was
  lost in 2026; treat as dead code pending planned removal.
- `src/data/products.ts`, `mockData.ts`: static/mock data. Mock data must never
  render as real products in production.
- Company PDF catalogs: the content reference for the new catalog section.
  Adapt their structure, copy, and imagery; do not embed or link the PDF as a
  replacement for the page unless the user asks.

Before changing a data shape, search producers (providers, static files) and
consumers (pages, components, route handlers, `sitemap.ts`, `CartContext`).

## Curated catalog

- Pick one source of truth for curated products and record it in this file
  once decided. Do not split the same product across several sources.
- Product copy is pt-BR and factual: part number, application/compatibility,
  brand. Do not invent specifications, stock, prices, or compatibility.
- Content spans two lines: linha amarela (MG Tratorpeças) and linha verde
  (MG Agro). Keep the line explicit wherever products, categories, or services
  are listed once the data shape is decided.
- Brand names (Caterpillar, Volvo, Case, JCB, agricultural brands) describe
  compatibility; do not imply official partnership beyond what `src/data/`
  already states.

## Images

- Store new product photos under `public/` (or an image host explicitly added
  to `next.config.ts`), never hotlinked from the old ERP.
- Optimize before committing (WebP/AVIF, sensible max width); keep originals
  out of the repository.
- Every image needs meaningful `alt` text and correct dimensions/`sizes`.
- Removing an image domain from `next.config.ts` requires confirming no
  remaining references.

## URLs and SEO

Pages like `/produtos/[slug]` and `/categoria/[slug]` may be indexed. When
replacing or removing them:

1. list the affected URLs (routes plus `sitemap.ts`);
2. add permanent redirects in `next.config.ts` to the closest new page;
3. update `sitemap.ts`, metadata, and internal links together.

Never silently drop indexed routes.

## Legacy removal checklist

Remove GestãoClick (and other unused e-commerce pieces) in a dedicated cut:
provider and facade wiring, route handlers, env var references, image domains,
dead components/contexts, and redirects. Report which env vars the user can
delete from Vercel; do not touch Vercel yourself.
