# CODE REVIEW RULES

Review proportionally to task risk. The primary agent performs a lightweight
self-check; a dedicated reviewer, when used, is read-only by default and
receives the requirements, final diff/changed files, check results, and
applicable rules.

## Priorities

Prioritize concrete findings involving secret exposure, broken behavior, lost
URLs/SEO, public contracts, accessibility regressions, performance (images,
bundle size, layout shift), and maintainability, in that order as applicable.
Do not inflate formatting or stylistic preferences already handled by tooling.

## Audit

For significant or higher-risk work, inspect the complete final diff and check:

- alignment with the original goal, non-goals, and acceptance criteria;
- unintended or unrelated changes and broad formatting churn;
- architecture, security, content, and URL compatibility violations;
- debug/temporary/commented-out code, secrets, hardcoded colors or values that
  have tokens, unsafe casts, unnecessary `'use client'`, or new dependencies;
- images without `alt`, dimensions, or optimization;
- actual validation results, including anything not run or failing.

A valid finding states the problem, affected location, realistic impact, and a
safe correction path. Avoid speculation without evidence. Passing checks are
evidence, not proof of requirement satisfaction.
