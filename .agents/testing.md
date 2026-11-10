# TESTING RULES

Use repository-supported commands and scale validation to risk and blast
radius. The repository has no automated test suite; do not add a test runner
or framework without approval.

## Proportionality

- **Low risk:** copy, small layout or styling changes, static content:
  `npm run type-check`, `npx eslint` on changed files, and a visual check.
- **Medium risk:** data mapping, provider/facade changes, new pages, route
  changes: add `npm run build` and check affected routes in `npm run dev`.
- **High risk:** secrets/env handling, CSP/headers, redirects and URL removal,
  provider removal: full build, manual verification of every affected route
  and redirect, and an explicit list of what could not be verified.

## Supported checks

```bash
npm run type-check
npx eslint .
npm run build
npm run dev
```

`npm run lint` invokes `next lint`, which Next 16 no longer provides; use
`npx eslint .` instead. If `node_modules` is missing, run `npm install` only
with the user's approval and report it.

## Visual verification

For UI work, check the affected pages at about 375px, 768px, and 1280px wide,
with keyboard navigation and reduced motion where relevant. State which pages
and widths were actually checked.

## Failures

Determine whether the cause is the change, an intentional requirement, or
pre-existing state. Never suppress type or lint errors (`any`, `@ts-ignore`,
`eslint-disable`) just to pass. Report commands that could not run.
