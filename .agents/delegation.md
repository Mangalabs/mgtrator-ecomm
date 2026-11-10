# AGENT DELEGATION POLICY

Claude is the only agent in this repository; "agents" below means Claude
subagents started by the primary session.

Delegate only when narrow parallel work or independent verification reduces
total context or improves confidence. Do not delegate when another agent would
need to reconstruct most of the primary agent's repository context.

## Ownership

The primary agent owns requirements, architecture/integration decisions,
implementation, difficult debugging, and sufficient targeted validation.

- A **Review Agent** compares requirements with the diff and reports concrete
  correctness, regression, security, accessibility, and maintainability
  findings. It is read-only by default and must not refactor production code.
- A **Check Runner** is ordinary deterministic tooling (`type-check`, `eslint`,
  `build`), not an LLM.

## Handoff

Give delegated work a narrow packet: goal/non-goals, acceptance criteria,
read/write scope, contracts, constraints, validation, risk, and diff/base
reference when available. A formal packet is unnecessary for trivial work.

## Parallel safety and escalation

Concurrent writers need distinct scopes and preferably isolated worktrees.
Define shared types and data shapes before parallel implementation and never
assign multiple agents to edit the same logical unit concurrently. Read-only
reviewers may share a tree.

Secondary agents return architecture, business-rule, security, URL/SEO, and
public-contract decisions to the primary agent.
