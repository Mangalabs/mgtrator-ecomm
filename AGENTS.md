# PROJECT AI ENGINEERING RULES

Claude Code is the only agent operating in this repository; `CLAUDE.md`
adapts these rules and wins on conflict. Explicit task requirements win;
repository evidence wins over assumptions and generic templates.

## Project map

Public website of MG Tratorpeças. The business has two lines:

- **MG Tratorpeças (linha amarela):** parts for heavy construction machinery
  (Caterpillar, Volvo, Case, JCB) plus routine and preventive maintenance for
  yellow-line machines and trucks.
- **MG Agro (linha verde):** new branch serving agricultural machinery, with
  its own visual identity.

Sales close through WhatsApp/contact, not online payment. The site is a
frontend-only Next.js app with no backend of its own.

- Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4,
  Zod, react-hook-form, framer-motion/motion, lucide-react. Alias `@/*` ->
  `src/*`.
- `src/app/`: routes, metadata, `sitemap.ts`, `robots.ts`, `manifest.ts`, and
  route handlers under `api/products/`.
- `src/components/<feature>/`: UI per page (`*PageClient.tsx`), plus `layout/`,
  `common/`, `shared/`.
- `src/services/`: data facade `api.ts` choosing a product provider
  (`backend.server.ts` -> `gestaoclick.server.ts` -> empty result).
  `*.server.ts` files are server-only.
- `src/data/`: static content (company, stores, brands, categories) and shared
  types in `types.ts`.
- `src/lib/`: pure helpers (title sanitizing, WhatsApp links, constants).
- `src/hooks/`, `src/contexts/`: client hooks and `CartContext` (quote cart).
- `.agents/`: specialized rules loaded as needed.

**Current state (2026-10):** access to the GestãoClick ERP API was lost. The
product catalog, product images, and the e-commerce flow (`/produtos`,
`/categoria`, `/busca`, `/carrinho`, `/checkout`) depend on that integration and
are being replaced by a catalog section adapted from the PDF catalogs the
company maintains. The redesign also merges the MG Tratorpeças and MG Agro
identities and refreshes photos and visuals. Treat GestãoClick code as legacy:
do not extend it; remove it only as an explicit, planned step.

## Instruction routing

Always read this file. Also read only the rules needed for the task:

- UI, pages, styling, brand, or copy: `CLAUDE.md`;
- cross-cutting or significant architecture: `.agents/architecture.md`;
- product/catalog data, images, legacy providers, URLs/SEO:
  `.agents/catalog-content.md`;
- env vars, tokens, headers/CSP, forms, tracking, or personal data:
  `.agents/security.md`;
- test creation or broad validation: `.agents/testing.md`;
- multi-stage work: `.agents/long-tasks.md`;
- delegation or parallel agents: `.agents/delegation.md`;
- recovery from drift or contradictory state: `.agents/recovery.md`;
- significant final review: `.agents/code-review.md`;
- Agent Skills: `.agents/skills-manifest.md`.

The primary Claude session owns requirements, architecture decisions,
implementation, debugging, and risk-based validation. Optional Claude
subagents must reduce duplicated context or add independent confidence.
Skills are procedural aids; repository architecture, contracts, and validation
rules prevail.

## Source of truth

Use this order:

1. User requirements.
2. Applicable `AGENTS.md` / `CLAUDE.md` instructions.
3. Existing implementation and established patterns.
4. Public contracts: URLs, route handlers, metadata/SEO, shared types.
5. Applicable `.agents/` modules, product docs, and skills in
   `.agents/skills-manifest.md`.
6. General conventions.

Never silently weaken/reinterpret requirements for implementation convenience.

## Working protocol

Before meaningful edits:

1. Confirm the working directory and repository root.
2. Read applicable instructions and verify referenced paths literally.
3. Inspect `git status --short --branch` and the relevant diff; preserve all
   pre-existing work.
4. Define the goal, non-goals, acceptance criteria, constraints, and realistic
   risks.
5. Locate only the relevant routes, components, services, data, and types.
6. Select the smallest validation set that provides meaningful confidence.
7. Form the smallest coherent implementation plan, then edit.

Do not recursively inventory the repository or over-plan small tasks. Do not
edit until material uncertainty about workspace, scope, contracts, or
validation resolves.

## Inconsistencies and blockers

Classify inconsistencies before deciding whether to stop:

1. **Informational:** no material effect; record briefly and continue.
2. **Safe resolution:** one interpretation is clearly supported by repository
   evidence, reversible, and behavior-preserving; record it and continue.
3. **Material ambiguity:** investigate callers, configuration, and patterns
   until one interpretation dominates.
4. **Blocking:** stop only when unresolved ambiguity could cause secret
   exposure, destructive Git/filesystem behavior, loss of indexed URLs/SEO,
   work in the wrong application, or incompatible business behavior.

Never equate an imperfect repository with a blocker. Do not normalize unrelated
issues unless requested or required to proceed safely.

Known informational items: `npm run lint` calls `next lint`, which Next 16 no
longer ships (use `npx eslint .`); `format` uses Prettier, which is not a
dependency; `tailwind.config.ts` uses v3-style content paths outside `src/`
while styles load through Tailwind v4 in `src/styles/global.css`.

## Git and deploy safety

Use focused branches for non-trivial cuts. Do not implement features directly
on `main`, push directly to `main`, create commits or PRs without an explicit
request, overwrite user changes, or continue across an unresolved
merge/rebase conflict. Pull requests target `main` on
`Mangalabs/mgtrator-ecomm`.

Do not deploy, change Vercel settings, or edit production environment
variables. The user runs deploys.

## Engineering invariants

- Preserve public URLs, route handler payloads, metadata, sitemap entries, and
  shared types unless a change is explicitly required; removed or renamed
  pages need a redirect plan (see `.agents/catalog-content.md`).
- Search both producers and consumers before changing a type or contract;
  prefer additive evolution.
- Keep secrets in server-only code. Only `NEXT_PUBLIC_*` values may reach the
  browser.
- Prefer Server Components; add `'use client'` only where interactivity
  requires it, and keep client bundles small.
- Prefer correctness, readability, cohesion, and explicit behavior. Avoid
  speculative abstractions, duplicate business rules, unrelated refactors, and
  broad formatting churn.
- Avoid redundant fetches, unbounded data loads, layout shift, oversized
  images, and unnecessary rerenders; do not optimize speculatively.
- Add dependencies only after checking that the current stack cannot solve the
  need.

Select checks proportionally:

```bash
npm run type-check
npx eslint .
npm run build
```

Do not claim a check passed unless it was run.

## Completion

A task is complete when the requested behavior is implemented, applicable
architecture/security/content rules are respected, intended contracts are
preserved or reported, risk-appropriate validation has passed, the final diff
contains only intended changes, and material unverified risks are disclosed.

Report concisely: what changed, important decisions, checks executed, anything
not verified, and relevant follow-up.
