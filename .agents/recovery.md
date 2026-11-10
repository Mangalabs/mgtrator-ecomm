# AI CONTEXT RECOVERY PROTOCOL

Use recovery when scope becomes unclear, implementation drifts, instructions or
repository structure contradict prior assumptions, repeated failures cause
speculative fixes, or verified state can no longer be distinguished from memory.

Recovery restores trustworthy state; it does not restart a full repository
analysis by default. Apply the root inconsistency levels.

## Procedure

1. Stop edits, speculative fixes, cleanup, and scope expansion.
2. Reconfirm working directory, repository root, and current branch.
3. Re-read the original request plus applicable instructions; verify
   referenced paths literally.
4. Inspect status, staged/unstaged diff, untracked files, and changed files;
   separate pre-existing user work from current-task changes.
5. Reconstruct from repository evidence: goal, non-goals, completed, verified,
   remaining, decisions, assumptions, and risks.
6. Audit the current diff for scope drift, architecture/security/URL
   violations, partial or duplicate implementations, unsafe suppressions,
   dependency changes, and missing validation.
7. Replace an invalid plan with the smallest plan supported by current
   evidence; preserve correct work and fix known violations before adding
   features.
8. Resume with one coherent step, validate it, and continue only while state
   remains trustworthy.

Repository evidence always takes precedence over remembered state.
