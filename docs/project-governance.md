# Lumen Project Governance

> Governance model for how Claude Code, designers, engineers, reviewers, and release owners use the Lumen Design System documentation, Figma source, Storybook, and repository before making recommendations or changes.

## Source

- **Figma file:** Lumen DS 2027
- **File key:** `GJBYRm6ySR7XIECFcHMgy2`
- **Design Tokens node:** `426:4395`
- **Dev Mode URL:** https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-DS-2027?node-id=426-4395&m=dev
- **Local Storybook:** http://localhost:6006/?path=/docs/introduction--docs
- **Last reviewed:** 2026-07-12

## Related documents

```text
CLAUDE.md
AGENTS.md
docs/project-governance.md
docs/documentation-style.md
docs/figma-source.md
docs/figma-sync.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/accessibility.md
docs/storybook-guidelines.md
docs/development-guidelines.md
docs/quality-checklist.md
docs/design-review.md
docs/release-process.md
docs/roadmap.md
docs/github-workflow.md
docs/changelog.md
```

---

# 1. Purpose

This document defines the operating model for the Lumen Design System.

It ensures that:

- all Markdown files are treated as living documentation
- Claude Code reads the latest relevant guidance before responding
- recommendations are discussed before implementation when appropriate
- implementation remains optional until the user confirms
- local development is available before UI work begins
- Figma, Storybook, and GitHub quality can be compared before publishing
- users can confirm, modify, or skip recommended workflow steps
- conflicting documentation is surfaced rather than silently resolved
- implementation remains incremental and traceable

---

# 2. Living documentation policy

The `/docs` directory is the authoritative knowledge base for Lumen.

Every Markdown file is a living document and may evolve as:

- Figma foundations change
- components mature
- accessibility guidance improves
- Storybook customization evolves
- repository architecture changes
- release and governance practices improve
- product teams contribute new requirements

Claude Code should use the latest available version of relevant documentation before making:

- recommendations
- architectural decisions
- implementation plans
- code changes
- Storybook changes
- Figma-sync decisions
- quality assessments
- release recommendations

Claude Code should not rely only on prior conversation context when newer repository documentation exists.

---

# 3. Authority and precedence

Use this order when sources conflict:

1. Current user instruction
2. `CLAUDE.md`
3. `AGENTS.md`
4. `docs/project-governance.md`
5. Relevant files under `docs/`
6. Approved Figma Variables and Components
7. Current repository implementation
8. Current Storybook implementation
9. Historical conversation context
10. General industry recommendations

## Conflict handling

When two authoritative sources conflict, Claude Code should:

1. identify both sources
2. describe the conflict
3. explain the practical impact
4. recommend a resolution
5. request confirmation when the conflict affects implementation
6. avoid silently choosing one source

A direct user instruction for the current task may override a documented default, unless it creates a safety, security, accessibility, or destructive-risk concern that should be surfaced first.

---

# 4. Documentation loading policy

Claude Code should determine which documents are relevant to the current task and read those documents before making a recommendation or implementation decision.

It does not need to reread every document for every minor request, but it should read all documents that materially govern the task.

## Foundation and token work

Read:

```text
docs/project-governance.md
docs/figma-source.md
docs/figma-sync.md
docs/design-tokens.md
docs/accessibility.md
docs/changelog.md
```

## Component work

Read:

```text
docs/project-governance.md
docs/component-architecture.md
docs/component-specifications.md
docs/design-tokens.md
docs/accessibility.md
docs/storybook-guidelines.md
docs/changelog.md
```

## Storybook work

Read:

```text
docs/project-governance.md
docs/storybook-guidelines.md
docs/documentation-style.md
docs/accessibility.md
docs/quality-checklist.md
docs/changelog.md
```

## GitHub and CI work

Read:

```text
docs/project-governance.md
docs/github-workflow.md
docs/development-guidelines.md
docs/quality-checklist.md
docs/release-process.md
docs/changelog.md
```

## Design review and quality work

Read:

```text
docs/project-governance.md
docs/design-review.md
docs/quality-checklist.md
docs/accessibility.md
docs/figma-sync.md
docs/changelog.md
```

## Release and publishing work

Read:

```text
docs/project-governance.md
docs/release-process.md
docs/github-workflow.md
docs/quality-checklist.md
docs/design-review.md
docs/changelog.md
```

## Documentation work

Read:

```text
docs/project-governance.md
docs/documentation-style.md
docs/changelog.md
```

## Planning work

Read:

```text
docs/project-governance.md
docs/roadmap.md
docs/changelog.md
```

---

# 5. Recommendation-first workflow

For medium, large, architectural, release-related, or destructive changes, Claude Code should recommend and discuss before implementing.

Recommended sequence:

1. Read relevant documentation.
2. Inspect the current implementation.
3. Identify the user need and change scope.
4. Compare the request with Figma, Storybook, and repository standards.
5. Identify risks, dependencies, and trade-offs.
6. Present an expert recommendation.
7. Ask whether to proceed, modify the recommendation, or skip the implementation.
8. Implement only the confirmed scope.
9. Validate the result.
10. Update affected documentation.

## Confirmation options

Claude Code should present clear options such as:

```text
Proceed with the recommended approach
Discuss alternatives
Modify the scope
Skip implementation
```

## Immediate implementation

The discussion step may be shortened or skipped when the user explicitly requests immediate execution and the change is:

- low risk
- reversible
- clearly scoped
- non-destructive
- supported by existing documentation

---

# 6. Advisory, not blocking

The recommendation-first workflow is a preferred operating pattern, not a hard gate.

Claude Code should not block progress unnecessarily.

For optional workflow steps, Claude Code should:

- explain why the step is useful
- ask for confirmation
- provide a Skip option
- continue when the user chooses to skip
- record skipped validation when it affects confidence

Example:

```text
Recommended: Start the local Storybook before editing so the current state can be verified.

Choose:
1. Start Storybook
2. Continue without starting it
3. Cancel
```

---

# 7. Local development workflow

When the Lumen project is opened in Visual Studio Code, Claude Code should recommend verifying the local environment before UI, component, or Storybook work.

Recommended checks:

1. Confirm the repository root.
2. Inspect `package.json` and workspace configuration.
3. Confirm the configured Node version.
4. Confirm `pnpm` is available.
5. Install dependencies when required.
6. Run the local development environment.
7. Start Storybook for component-related work.
8. Confirm the relevant page or story loads.

Typical commands may include:

```bash
corepack enable
pnpm install
pnpm dev
pnpm --filter @lumen/storybook storybook
```

Claude Code must inspect actual repository scripts before running commands.

## Confirmation behavior

Starting local services is optional unless the user explicitly requests it.

Claude Code should ask:

```text
Would you like me to start the local development environment and Storybook before reviewing the change?

Options:
1. Start both
2. Start Storybook only
3. Continue without starting local services
```

---

# 8. Pre-publish quality comparison

Before pushing, publishing, deploying, or releasing changes to GitHub or Storybook, Claude Code should recommend creating a local comparison report.

This is a preferred review step, not a mandatory gate unless the release process explicitly requires it.

## Comparison sources

Compare:

```text
Approved Figma source
Current local Storybook
Current repository implementation
Affected documentation
Changed tests
```

## Review areas

The report should evaluate:

- visual fidelity
- token usage
- typography
- spacing
- radius
- color roles
- component anatomy
- variants and states
- responsive behavior
- accessibility
- interaction behavior
- public API consistency
- Storybook documentation
- Figma-to-code drift
- missing or unintended changes

## Report format

```markdown
# Local quality comparison

## Scope

## Sources compared

## Passed

## Differences

| Area | Figma | Storybook or code | Severity | Recommendation |
|---|---|---|---|---|

## Accessibility findings

## Token findings

## Storybook findings

## GitHub and code findings

## Risks

## Recommended action

Proceed | Proceed with Conditions | Fix Before Publishing | Skip Review by User Confirmation
```

## Confirmation behavior

Claude Code should ask:

```text
A local Figma-to-Storybook and GitHub quality comparison is recommended before publishing.

Choose:
1. Generate the report
2. Generate a limited report for changed items only
3. Skip and continue
4. Cancel publishing
```

When the user skips, Claude Code should proceed only within the user's confirmed scope and state that the comparison was not performed.

---

# 9. Change scope and implementation control

Before implementation, Claude Code should identify:

- files to change
- tokens affected
- components affected
- stories affected
- tests affected
- public APIs affected
- Figma nodes affected
- release impact

Claude Code should not:

- regenerate the full design system for a small change
- refactor unrelated code
- upgrade unrelated dependencies
- remove Storybook customization
- invent missing Figma values
- publish packages without confirmation
- push to GitHub without confirmation
- deploy Storybook without confirmation

---

# 10. Decision records

Material decisions should be recorded when they affect:

- token architecture
- component APIs
- accessibility behavior
- Storybook architecture
- repository structure
- release process
- Figma-to-code synchronization
- deprecation or migration

Recommended record:

```markdown
# Decision record

- Date:
- Decision:
- Context:
- Options considered:
- Recommendation:
- User confirmation:
- Files affected:
- Risks:
- Follow-up:
```

---

# 11. Documentation update responsibility

When implementation changes behavior, Claude Code should identify the documentation that may require an update.

Possible updates include:

```text
design-tokens.md
component-specifications.md
accessibility.md
storybook-guidelines.md
development-guidelines.md
quality-checklist.md
figma-sync.md
release-process.md
roadmap.md
github-workflow.md
documentation-style.md
changelog.md
```

Documentation should evolve with the design system.

Do not update unrelated documents solely for stylistic consistency during a focused implementation task.

---

# 12. Quality and evidence

Claude Code should separate:

```text
Verified
Inferred
Recommended
Pending verification
Skipped by confirmation
Blocked
```

## Evidence examples

Verified evidence may include:

- Figma metadata
- Figma Variable export
- component-specific Dev Mode context
- local Storybook output
- repository source
- test results
- CI output
- release artifacts

A recommendation should not be presented as verified implementation status.

---

# 13. User control

The user has final control over optional workflow steps.

For every optional recommendation, Claude Code should allow:

```text
Confirm
Modify
Skip
Cancel
```

Skipping an optional step should not be treated as an error.

Claude Code should explain the consequence of skipping in one concise statement.

Example:

```text
Skipping the local comparison means Figma-to-Storybook parity will remain unverified for this change.
```

---

# 14. Claude Code operating protocol

Before making a recommendation, decision, or implementation:

1. Read `CLAUDE.md`.
2. Read `AGENTS.md`.
3. Read `docs/project-governance.md`.
4. Read all task-relevant documents.
5. Read the current `[Unreleased]` section in `docs/changelog.md`.
6. Inspect the current repository state.
7. Inspect the exact Figma node when the task is design-related.
8. Inspect local Storybook when the task affects UI or documentation and the user confirms.
9. Present a recommendation before medium or large changes.
10. Wait for confirmation unless immediate implementation was explicitly requested.
11. Implement only the approved scope.
12. Validate.
13. Update affected documentation.
14. Report skipped or incomplete checks.

## Reusable instruction

```markdown
Treat all files under `docs/` as living documentation.

Before making a recommendation, decision, or implementation:

- read `CLAUDE.md`
- read `AGENTS.md`
- read `docs/project-governance.md`
- read all documents relevant to the task
- read `[Unreleased]` in `docs/changelog.md`
- inspect the current repository and exact Figma source

For medium, large, architectural, release-related, or destructive changes:

1. analyze first
2. provide an expert recommendation
3. explain trade-offs
4. ask for confirmation
5. allow Proceed, Modify, Skip, or Cancel
6. implement only after confirmation

Recommend starting the local development environment and Storybook for UI work, but allow the user to skip.

Before GitHub push, Storybook deployment, package publication, or release, recommend a local Figma-to-Storybook and repository quality report, but allow the user to skip.

Never publish, push, deploy, force push, or release without explicit confirmation.
Never regenerate the complete design system for a scoped change.
Report conflicts, assumptions, skipped checks, and unresolved differences.
```

---

# 15. Governance checklist

Before a material recommendation or change:

- [ ] Relevant living documents were read.
- [ ] `[Unreleased]` was reviewed.
- [ ] Exact Figma source was identified.
- [ ] Current implementation was inspected.
- [ ] Recommendation and trade-offs were provided.
- [ ] User confirmation was obtained or the step was explicitly skipped.
- [ ] Local development was offered where relevant.
- [ ] Pre-publish comparison was offered where relevant.
- [ ] Only approved files were changed.
- [ ] Validation results were reported.
- [ ] Skipped checks were recorded.
- [ ] Affected documentation was updated.

---

# 16. Current Figma verification status

The Figma metadata request for node `426:4395` succeeded.

Verified foundation sections:

```text
01 Colors
02 Typography
03 Scale
04 Spacing
05 Radius
```

The supplied foundation node does not verify repository governance, local scripts, GitHub permissions, Storybook deployment configuration, or component-specific implementation details.

These must be verified from the repository, Storybook, GitHub, and component-specific Figma nodes.

---

# 17. Figma Variables policy

Published Figma Variables are the authoritative source for design tokens.
Before a token-related recommendation or implementation, read the latest
Variables, compare them against the repository, and report the delta
(added, modified, removed, renamed, duplicate, unused, broken alias) before
proposing a change — never estimate a value that a real Variable could
supply. `docs/figma-sync.md`'s numbered stages define the full sync
procedure and `docs/design-tokens.md` defines the token architecture the
result lands in; this section is the policy those two implement, not a
third copy of it.

## Connector behavior (verified this session)

`get_variable_defs` returns nothing when scoped to the top-level Design
Tokens canvas node (`426:4395`) — it errors `"You currently have nothing
selected"` regardless of live desktop selection state. Scoped to a specific
child frame instead, it returns the variables actually bound within that
frame:

- `426:4396` ("01 Colors"): 10 bound variables.
- `428:13769` ("02 Typography"): 12 bound variables (`Body/{Large,Medium,
  Small,Xsmall}` only — no Heading, Label, Overline, Caption, or Code
  variables are bound, despite those sizes being documented in prose).
- `429:14216` ("03 Scale"), `511:2` ("04 Spacing"), `511:78` ("05 Radius"):
  0 bound variables — their documented values are static text layers, not
  Variable bindings.

Query section-level (or deeper) node IDs, not the canvas root. A frame
returning `{}` means no bound variables in that subtree, not a tool
failure — don't retry it as if it were the "nothing selected" error above.