# LONG TASK PROTOCOL

Use this protocol for multi-page features, data-source changes, the catalog
redesign, legacy removal, and other work with dependent stages. Do not use it
for small, isolated changes.

## Before planning

Complete the root `AGENTS.md` working protocol first. Record a concise task
state:

- goal and observable acceptance criteria;
- explicit non-goals and constraints;
- affected routes, components, services, data, and URLs;
- realistic security, SEO, content, and delivery risks;
- proportional validation strategy.

For larger efforts, keep the plan in `docs/<topic>-plan.md` so it survives
across sessions.

## Checkpoints

Split work into coherent, reviewable checkpoints that can be validated
independently (for example: data model and source -> catalog page ->
product detail -> redirects and legacy removal). Before each checkpoint,
confirm the previous state is trustworthy and scope has not drifted.

After each meaningful checkpoint:

1. Inspect its changes.
2. Run the smallest validation needed to make the next step safe.
3. Verify checkpoint acceptance criteria.
4. Update `completed`, `verified`, `remaining`, `decisions`, `assumptions`, and
   `risks`.

Record unrelated discoveries instead of expanding scope.

## Recovery and completion

Run `.agents/recovery.md` when repository state, task state, instructions, or
the plan diverge, or when repeated failures lead to speculative fixes.

Before completion, run risk-appropriate checks, inspect the complete diff,
apply `.agents/code-review.md` proportionally, compare the result with goal,
non-goals, and acceptance criteria, and report unverified risks.
