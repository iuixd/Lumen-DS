# Lumen GitHub Workflow

> GitHub collaboration, CI, validation, release, and Storybook deployment workflow for the **Lumen AI Design System**.

## Source

- **Figma file:** Lumen AI Design System
- **File key:** `GJBYRm6ySR7XIECFcHMgy2`
- **Design Tokens node:** `426:4395`
- **Dev Mode URL:** https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-AI-Design-System?node-id=426-4395&m=dev
- **Local Storybook:** http://localhost:6006/?path=/docs/introduction--docs
- **Last reviewed:** 2026-07-15

## Related documents

```text
CLAUDE.md
AGENTS.md
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

This document defines how Lumen changes move through GitHub from an approved Figma change to reviewed, tested, merged, versioned, and published design-system artifacts.

The workflow must:

- keep changes incremental
- preserve Figma-to-code traceability
- protect stable branches
- enforce quality and accessibility gates
- prevent unrelated regeneration
- support reliable package releases
- publish the customized Lumen Storybook
- provide clear rollback and audit history

---

# 2. Repository principles

## One change, one purpose

A pull request should address one coherent design-system change.

Examples:

```text
Add Button AI variant
Correct dark-theme focus token
Publish spacing-token documentation
Fix Dialog focus restoration
Upgrade Storybook platform
```

Avoid combining unrelated token, component, dependency, and documentation changes.

## Figma reference required

Every design-affecting pull request must include the exact Figma Dev Mode node.

## Changelog controls scope

Only changes listed under `[Unreleased]` in `docs/changelog.md` may be implemented.

## Generated files are outputs

Generated token and package files must be produced by scripts or CI and must not be manually patched.

## Stable branches are protected

Direct pushes to the default branch should be disabled.

---

# 3. Recommended repository structure

```text
lumen-design-system/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   └── workflows/
│       ├── ci.yml
│       ├── token-validation.yml
│       ├── storybook.yml
│       ├── visual-regression.yml
│       ├── accessibility.yml
│       ├── release.yml
│       └── pages.yml
│
├── docs/
├── packages/
│   ├── tokens/
│   ├── icons/
│   └── components/
├── apps/
│   └── storybook/
├── scripts/
├── CLAUDE.md
├── AGENTS.md
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

Use the actual repository structure where it already exists. Do not reorganize the project without approval.

---

# 4. Branch strategy

Recommended branches:

```text
main
feature/*
fix/*
tokens/*
docs/*
release/*
hotfix/*
```

## Examples

```text
feature/button-ai-variant
fix/dialog-focus-restoration
tokens/dark-theme-focus
docs/storybook-guidelines
release/1.5.0
hotfix/1.5.1-button-disabled
```

## Rules

- Branch from the latest `main`.
- Keep branches short-lived.
- Rebase or merge `main` before final approval according to team policy.
- Delete branches after merge.
- Do not use personal long-running integration branches.
- Do not commit unrelated work.

---

# 5. Commit conventions

Use Conventional Commit-style messages.

```text
feat(button): add AI variant
fix(tokens): correct dark focus alias
docs(storybook): add accessibility guidance
test(dialog): cover focus restoration
refactor(table): simplify internal row logic
chore(release): prepare 1.5.0
```

## Allowed types

```text
feat
fix
docs
test
refactor
perf
build
ci
chore
revert
```

## Rules

- Use the affected token, component, package, or workflow as the scope.
- Describe the outcome, not the activity.
- Avoid vague messages such as `updates`, `changes`, or `final fix`.
- Keep generated-output commits tied to the source change that produced them.

---

# 6. Issue workflow

Use issues for:

- component proposals
- token additions
- accessibility defects
- Figma-to-code drift
- Storybook improvements
- breaking-change proposals
- release blockers
- deprecations

## Recommended issue template

```markdown
# Summary

## Problem

## Proposed change

## Figma source

## Affected tokens

## Affected components

## Accessibility impact

## API impact

## Storybook impact

## Release impact

## Acceptance criteria

## Open questions
```

## Labels

Recommended labels:

```text
area:tokens
area:components
area:storybook
area:accessibility
area:documentation
area:tooling
area:ai

type:feature
type:bug
type:deprecation
type:breaking-change
type:maintenance

priority:p0
priority:p1
priority:p2
priority:p3

status:needs-design
status:ready
status:blocked
status:in-review
```

---

# 7. Pull-request requirements

Every pull request must include:

- concise summary
- exact Figma node
- changelog reference
- affected tokens and components
- screenshots or Storybook references
- accessibility impact
- API impact
- validation completed
- migration guidance when required
- known limitations

## Pull-request template

```markdown
## Summary

## Figma source

## Changelog

## Affected areas

- Tokens:
- Components:
- Storybook:
- Packages:

## Accessibility impact

## API impact

## Visual evidence

## Validation

- [ ] Lint
- [ ] Type checking
- [ ] Unit tests
- [ ] Accessibility tests
- [ ] Storybook build
- [ ] Visual regression
- [ ] Figma parity review

## Migration

## Known limitations
```

---

# 8. CODEOWNERS

Use CODEOWNERS to route reviews.

Example:

```text
/packages/tokens/            @lumen-token-owners
/packages/components/        @lumen-component-owners
/apps/storybook/             @lumen-storybook-owners
/docs/accessibility.md       @lumen-accessibility-owners
/.github/workflows/          @lumen-engineering-owners
/docs/                       @lumen-design-system-owners
```

For a small team, GitHub usernames or one shared design-system team may replace these placeholders.

---

# 9. Branch protection

Protect `main`.

Recommended rules:

- require pull requests
- require at least one approval
- require Code Owner approval for governed paths
- dismiss stale approvals after material updates
- require conversation resolution
- require status checks
- block force pushes
- block branch deletion
- require signed commits where organizational policy requires them
- restrict direct pushes
- require linear history only when it matches the team’s merge strategy

Critical design-system paths may require two reviewers:

```text
Token architecture
Accessibility behavior
Public component APIs
Release workflows
```

---

# 10. Merge strategy

Use one consistent strategy.

## Squash merge

Recommended for focused feature and fix pull requests.

Benefits:

- one coherent commit on `main`
- clean history
- simpler release notes

## Merge commit

Useful for release branches or when preserving grouped commit history is necessary.

## Rebase merge

Useful when the team requires linear history and commits are already clean.

Do not mix strategies arbitrarily.

---

# 11. Required CI checks

Every pull request should run the checks relevant to its changed scope.

## Baseline checks

```text
Install with frozen lockfile
Lint
Type checking
Unit tests
Token validation
Accessibility tests
Production build
Storybook build
```

## Conditional checks

```text
Visual regression
Package-size analysis
Code Connect validation
Broken-link validation
Release dry run
Consumer integration test
```

## Required behavior

- Checks must fail clearly.
- Failures must identify affected files or packages.
- CI must not silently rewrite source files.
- CI may verify generated outputs but should not commit them automatically without explicit policy.
- Critical checks must be required before merge.

---

# 12. CI workflow design

Use scoped jobs with clear dependencies.

```text
changes
  ├── tokens
  ├── components
  ├── storybook
  └── docs

install
  ├── lint
  ├── typecheck
  ├── unit-test
  ├── token-validation
  ├── accessibility
  ├── build
  └── storybook-build
```

## Concurrency

Cancel superseded runs for the same branch.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Do not cancel production release jobs after publication has begun.

---

# 13. Example CI workflow

Use the repository’s actual scripts and current approved action versions.

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - name: Checkout
        uses: actions/checkout@<approved-major>

      - name: Enable Corepack
        run: corepack enable

      - name: Set up Node
        uses: actions/setup-node@<approved-major>
        with:
          node-version-file: ".nvmrc"
          cache: "pnpm"

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Build Storybook
        run: pnpm build-storybook
```

Do not copy this unchanged. Verify actual package scripts, Node version policy, workspace paths, and approved action versions.

---

# 14. Node and package-manager policy

Use:

```text
pnpm
Corepack
One committed pnpm-lock.yaml
One declared Node version policy
```

Recommended sources for the Node version:

```text
.nvmrc
.node-version
package.json engines
Volta configuration
```

Keep local development and GitHub Actions aligned.

Do not mix:

```text
npm lockfiles
Yarn lockfiles
pnpm lockfiles
```

---

# 15. Token validation workflow

Run token validation when these paths change:

```text
packages/tokens/**
scripts/token*
figma exports
theme configuration
```

Validate:

- schema
- naming
- types
- aliases
- cycles
- modes
- duplicate semantics
- generated output drift
- Light and Dark theme completeness
- contrast where pairing rules are defined

## Generated-output verification

Recommended pattern:

```bash
pnpm tokens:build
git diff --exit-code
```

This detects outdated generated files.

CI should report the diff without silently committing it.

---

# 16. Component workflow

When component files change, CI should validate:

- TypeScript API
- unit tests
- keyboard behavior
- accessibility
- Storybook stories
- visual regression
- package exports
- consumer build where available

Changed components should not trigger regeneration of unrelated component files.

---

# 17. Accessibility workflow

Run accessibility checks for:

```text
components
patterns
Storybook stories
theme tokens
focus tokens
typography
```

Include:

- automated accessibility scanning
- interaction tests
- focus tests
- accessible-name tests
- keyboard tests

Manual review remains required for:

- screen-reader interaction
- complex focus management
- data grids
- AI streaming
- high-impact workflows

Critical and High accessibility defects block merge.

---

# 18. Storybook workflow

Local reference:

```text
http://localhost:6006/?path=/docs/introduction--docs
```

CI should:

1. Build the static Storybook.
2. Fail on build errors.
3. report broken stories
4. run accessibility checks
5. run visual regression where configured
6. publish a preview for pull requests where infrastructure allows it

## Customized UI protection

Review changes to:

```text
.storybook/manager.*
.storybook/preview.*
.storybook/theme.*
Docs layouts
global styles
navigation configuration
```

Confirm that:

- Lumen branding remains intact
- dark backgrounds remain consistent
- navigation remains usable
- documentation hierarchy remains clear
- default Storybook styling does not replace custom styling

---

# 19. Storybook deployment

Use GitHub Pages or the approved hosting platform.

A deployment workflow should:

```text
Build Storybook
Upload the static artifact
Deploy from an approved branch or release
Verify the deployed URL
```

Recommended permissions are minimal:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Use the official current GitHub Pages actions approved by the repository.

Do not expose secrets to pull requests from forks.

---

# 20. Visual-regression workflow

Visual regression should cover:

- token foundation pages
- stable component variants
- sizes
- states
- Light mode
- Dark mode
- density
- responsive widths
- customized Storybook shell where relevant

## Rules

- Never auto-approve changed snapshots.
- Review only diffs caused by the pull request.
- Link approved design changes to the Figma node.
- Treat unexpected global changes as possible token drift.
- Do not update all baselines to hide a failure.

---

# 21. Dependency updates

Use automated dependency updates only with controls.

Recommended approach:

- group related development dependencies
- keep runtime dependency updates separate
- run full CI
- review Storybook and visual regressions
- avoid bundling dependency upgrades with feature changes
- review breaking release notes before merge

Storybook upgrades require dedicated review because they may affect the customized UI.

---

# 22. Secrets and permissions

Use least privilege.

## Rules

- Do not store secrets in source files.
- Use GitHub Environments for protected publication.
- Require approval for production deployment where appropriate.
- Restrict package-publishing tokens.
- Prefer short-lived identity-based authentication when supported.
- Do not expose secrets to untrusted fork workflows.
- Pin third-party actions according to organizational security policy.
- Review action permissions explicitly.

Default workflow permission:

```yaml
permissions:
  contents: read
```

Add write permissions only to jobs that require them.

---

# 23. Release workflow

Read:

```text
docs/release-process.md
```

A release workflow should:

1. Validate the release branch or tag.
2. Install from the frozen lockfile.
3. Run all mandatory checks.
4. Build packages.
5. Build Storybook.
6. verify package contents
7. publish packages in dependency order
8. deploy Storybook
9. create release notes
10. verify published outputs

## Publication order

```text
Tokens
Icons
Components
Storybook
Documentation
```

Do not publish from an unreviewed feature branch.

---

# 24. Release authorization

Package publication and production Storybook deployment require explicit authorization.

Recommended controls:

- protected GitHub Environment
- required reviewer
- version and changelog validation
- release tag
- artifact verification
- rollback target

Claude Code must not publish packages or deploy Storybook unless explicitly instructed.

---

# 25. Release tags and GitHub Releases

Recommended tag:

```text
lumen-v1.5.0
```

Every GitHub Release should contain:

- version
- date
- summary
- added
- changed
- fixed
- deprecated
- removed
- accessibility changes
- migration guidance
- affected packages
- Figma references
- Storybook reference
- known limitations

---

# 26. Hotfix workflow

For a production-blocking defect:

```text
main or production tag
    ↓
hotfix branch
    ↓
minimal fix
    ↓
mandatory validation
    ↓
Patch release
    ↓
merge back to main
```

Rules:

- include only the correction
- add a regression test
- document the defect
- update the changelog
- preserve the rollback path
- avoid unrelated cleanup

---

# 27. Rollback workflow

Rollback when a release causes:

- broken installation
- invalid token output
- inaccessible critical workflow
- incompatible API behavior
- severe visual regression
- Storybook deployment failure

Actions:

1. Stop rollout.
2. Restore the previous stable package tag or deployment.
3. Communicate the rollback.
4. Open an incident issue.
5. Document root cause.
6. release the correction as a new version.

Do not overwrite an existing published version.

---

# 28. Figma sync workflow

Read:

```text
docs/figma-sync.md
```

A Figma sync pull request must include:

- exact node ID
- exported delta
- token or component impact report
- generated-output diff
- Figma-to-code parity review
- Storybook update
- tests
- sync status

Allowed final statuses:

```text
Synced
Partially Synced
Blocked
```

---

# 29. Claude Code GitHub protocol

Before changing the repository, Claude Code must read:

```text
CLAUDE.md
AGENTS.md
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
docs/github-workflow.md
docs/changelog.md
```

## Required behavior

1. Read `[Unreleased]`.
2. Inspect the current branch and working tree.
3. Inspect package scripts and workflow files.
4. Identify only affected files.
5. Report an impact plan before edits.
6. Preserve public APIs and unrelated workflows.
7. Run available validation.
8. Never bypass required checks.
9. Never force push.
10. Never publish or deploy without explicit instruction.

## Reusable prompt

```markdown
Read:

- `docs/figma-source.md`
- `docs/figma-sync.md`
- `docs/design-tokens.md`
- `docs/component-architecture.md`
- `docs/component-specifications.md`
- `docs/accessibility.md`
- `docs/storybook-guidelines.md`
- `docs/development-guidelines.md`
- `docs/quality-checklist.md`
- `docs/design-review.md`
- `docs/release-process.md`
- `docs/github-workflow.md`
- `docs/changelog.md`

Apply only the changes listed under `[Unreleased]`.

Before editing, report:
1. current branch and working-tree status
2. affected packages
3. affected tokens and components
4. affected workflows
5. affected stories and tests
6. proposed minimal file changes
7. release impact

Preserve:
- unrelated files
- public APIs
- required branch protections
- Lumen Storybook customization
- accessibility behavior

Do not:
- regenerate the full design system
- refactor unrelated workflows
- modify generated files manually
- bypass failing checks
- force push
- publish packages
- deploy Storybook

unless explicitly instructed.

Run the available lint, type-check, tests, accessibility checks, build, Storybook build, and token validation.

Return:
1. files changed
2. validation results
3. unresolved issues
4. recommended pull-request title
5. recommended commit message
```

---

# 30. Pull-request review checklist

## Scope

- [ ] Figma node is included.
- [ ] Changelog scope is included.
- [ ] No unrelated files changed.
- [ ] No full-system regeneration occurred.

## Tokens and components

- [ ] Token diff is intentional.
- [ ] Generated outputs are current.
- [ ] Component APIs remain valid.
- [ ] Figma-to-code parity is reviewed.

## Quality

- [ ] Lint passes.
- [ ] Type checking passes.
- [ ] Tests pass.
- [ ] Accessibility passes.
- [ ] Storybook builds.
- [ ] Visual changes are approved.

## Governance

- [ ] Required reviewers approved.
- [ ] Conversations are resolved.
- [ ] Migration guidance exists where required.
- [ ] Release impact is documented.

---

# 31. Merge readiness

A pull request is merge-ready only when:

- all required status checks pass
- required approvals are present
- Code Owner review is complete
- Critical and High defects are resolved
- Figma evidence is sufficient
- Storybook is current
- changelog is current
- migration guidance is complete
- no unresolved scope expansion remains

Allowed decisions:

```text
Ready to Merge
Ready with Conditions
Changes Required
Blocked
```

---

# 32. Current Figma verification status

The Figma metadata request for node `426:4395` succeeded and confirmed these foundation sections:

```text
01 Colors
02 Typography
03 Scale
04 Spacing
05 Radius
```

The supplied node does not establish:

- GitHub repository structure
- current workflow files
- active branch protection rules
- package names
- CI scripts
- hosting configuration
- release credentials
- Code Connect coverage
- exact variable definitions and modes

Those items must be verified directly in the GitHub repository and Figma variable exports before marking this workflow fully implemented.