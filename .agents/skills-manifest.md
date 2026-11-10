# AGENT SKILLS MANIFEST

Skills are reusable procedures, not project authority. Repository rules,
current implementation, URLs/SEO, brand tokens, and validation commands prevail
over any generic skill.

## Installed Skills

No repository-local skills are installed under `.agents/skills/`.

## User-level skills relevant here (Claude Code plugins)

Available on the maintainer's machine; load them when the task matches:

- `frontend-design:frontend-design`: visual direction for new pages
  (catalog layout, hero, product presentation).
- `vectorlab-ux-skills:*`: `page-patterns`, `typography`, `spacing`,
  `colour-palette`, `viewports`, `motion`, `reduced-motion`, `empty-states`,
  `anti-slop`, and `ux-audit` before finishing UI work.
- `a11y-enforcer:a11y-check` / `contrast`: WCAG checks on changed UI.
- `design:ux-copy`: pt-BR microcopy and CTAs.
- `code-review` / `simplify`: final review of significant diffs.

## Compatibility Rules

- Design skills work inside the existing stack: Next.js App Router, Tailwind
  v4, brand tokens (`#213A77`, `#FDCC19`), Inter/Poppins, `next/image`,
  framer-motion/motion, lucide-react.
- No skill may add UI frameworks, component libraries, state managers, or
  dependencies, change URLs, loosen CSP, or replace project architecture
  without explicit approval.

## Candidate Skills

Install a repository-local skill only after reading its `SKILL.md`, inspecting
any scripts/permissions/dependencies, confirming an official or maintainer
source, and receiving approval. Next.js/React performance or image-optimization
skills are reasonable candidates if the catalog work shows a need.
