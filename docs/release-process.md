# Lumen Release Process

> Release governance for the **Lumen AI Design System**, covering Figma publication, design-token generation, component packages, Storybook, validation, versioning, deployment, rollback, and post-release monitoring.

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
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/accessibility.md
docs/storybook-guidelines.md
docs/development-guidelines.md
docs/quality-checklist.md
docs/design-review.md
docs/release-process.md
docs/versioning-and-releases.md
docs/changelog.md
```

`docs/versioning-and-releases.md` has this repo's concrete Changesets
commands and actual distribution model (no npm publish step; consumed as a
git dependency) — the implementation detail underneath Stage 8 below.

---

# 1. Purpose

This document defines how Lumen changes move safely from Figma to released packages and published Storybook documentation.

The release process ensures that:

- approved Figma changes are implemented accurately
- only affected tokens and components are updated
- releases are versioned consistently
- accessibility and quality gates are enforced
- Storybook remains synchronized
- breaking changes include migration guidance
- rollback is possible
- published artifacts are traceable

---

# 2. Release principles

## 2.1 Figma approval comes first

Do not release visual or interaction changes that are not approved or published in Figma.

## 2.2 Changelog controls scope

`docs/changelog.md` defines the authorized release delta.

Do not include unrelated refactors, package upgrades, or design changes in the same release.

## 2.3 Generated artifacts are reproducible

Token outputs and package artifacts must be generated from committed source files. Do not manually patch generated files.

## 2.4 Accessibility is release-blocking

Critical and High accessibility issues block release.

## 2.5 Releases must be reversible

Every production release must have a documented rollback path.

## 2.6 Storybook is part of the release

A component or token release is incomplete until its Storybook documentation is synchronized and verified.

---

# 3. Release scope

A Lumen release may include one or more of the following:

```text
Design tokens
Theme mappings
Icons
Primitive components
Composite components
Enterprise components
AI components
Patterns
Storybook documentation
Accessibility corrections
Developer documentation
Build and tooling changes
```

Separate unrelated concerns into different releases whenever practical.

---

# 4. Release types

## Patch release

Use for backward-compatible corrections.

Examples:

- token-value correction
- alias correction
- accessibility fix
- documentation correction
- visual defect fix
- test correction
- Storybook content fix

Example:

```text
1.4.2 → 1.4.3
```

## Minor release

Use for backward-compatible additions.

Examples:

- new token
- new component
- new optional prop
- new non-breaking variant
- new Storybook page
- new theme capability
- additive accessibility behavior

Example:

```text
1.4.3 → 1.5.0
```

## Major release

Use for incompatible changes.

Examples:

- removed public token
- renamed token
- removed component
- renamed public prop
- changed default behavior
- incompatible theme mapping
- changed semantic meaning
- removed package export

Example:

```text
1.5.0 → 2.0.0
```

---

# 5. Release channels

Use clear release channels.

## Development

Used for local and branch-level validation.

```text
Local Storybook
Feature branches
Temporary preview builds
```

## Prerelease

Used for controlled evaluation.

Recommended labels:

```text
alpha
beta
rc
```

Examples:

```text
2.0.0-alpha.1
2.0.0-beta.2
2.0.0-rc.1
```

## Stable

Used for approved production releases.

Stable releases must pass all mandatory gates.

---

# 6. Release roles

## Design-system designer

Owns:

- Figma approval
- token and component visual review
- design-to-code parity
- Storybook visual review
- design release notes

## Engineer

Owns:

- implementation
- package generation
- tests
- build validation
- package publication
- rollback readiness

## Accessibility reviewer

Owns:

- accessibility review
- keyboard validation
- screen-reader validation for critical interactions
- severity classification

## Release manager

Owns:

- release scope
- version decision
- approvals
- publication sequence
- release communication
- rollback decision

## Documentation owner

Owns:

- Storybook documentation
- changelog
- migration guidance
- release notes

One person may perform multiple roles for a small release, but all responsibilities must still be completed.

---

# 7. Required release inputs

Before starting a release, confirm:

```text
Approved Figma node
Updated changelog
Release type
Affected tokens
Affected components
Affected package exports
Storybook updates
Accessibility impact
Migration impact
Test plan
Rollback plan
```

Recommended release request:

```markdown
## Release request

- Release name:
- Proposed version:
- Release type:
- Figma source:
- Changelog section:
- Affected packages:
- Affected tokens:
- Affected components:
- Storybook changes:
- Accessibility impact:
- Breaking changes:
- Migration required:
- Rollback plan:
```

---

# 8. Release workflow

```text
1. Define scope
2. Approve Figma
3. Export token delta
4. Implement affected changes
5. Update Storybook
6. Run design review
7. Run quality gates
8. Version packages
9. Build release artifacts
10. Publish prerelease or stable release
11. Verify published outputs
12. Communicate release
13. Monitor and close
```

---

# 9. Stage 1: Define release scope

- Read `[Unreleased]` in `docs/changelog.md`.
- Confirm the release contains only approved changes.
- Identify affected packages.
- Identify affected token collections.
- Identify affected components and stories.
- Identify public API changes.
- Identify migration requirements.
- Classify the release as Patch, Minor, or Major.

Release scope must be frozen before final validation.

---

# 10. Stage 2: Approve Figma source

Confirm:

- [ ] Correct Figma file and node are used.
- [ ] Changes are Approved or Published.
- [ ] Variable collections are published where applicable.
- [ ] Component changes are published where applicable.
- [ ] Component properties and variants are final.
- [ ] Light and Dark modes are complete.
- [ ] Accessibility annotations are present.
- [ ] Deprecated assets are marked.
- [ ] Figma descriptions are current.

The supplied foundation node includes:

```text
01 Colors
02 Typography
03 Scale
04 Spacing
05 Radius
```

Component releases require component-specific Dev Mode URLs.

---

# 11. Stage 3: Export and validate tokens

When token changes are included:

1. Export only affected collections or variables.
2. Compare source and generated outputs.
3. Validate names, values, aliases, modes, and scopes.
4. Generate platform outputs.
5. Review the token diff.
6. Confirm no unrelated tokens changed.

Recommended outputs:

```text
tokens.json
tokens.css
tokens.ts
tokens.d.ts
theme-light.css
theme-dark.css
```

## Token release checks

- [ ] Source files are committed.
- [ ] Generated files are current.
- [ ] No generated file was manually edited.
- [ ] Alias cycles do not exist.
- [ ] All modes resolve.
- [ ] No duplicate semantic tokens were introduced.
- [ ] Removed or renamed tokens include migration guidance.
- [ ] Consuming components were identified.
- [ ] Token diff matches the approved Figma delta.

---

# 12. Stage 4: Implement affected changes

Implementation rules:

- update only affected files
- preserve unrelated architecture
- reuse existing tokens and components
- preserve public APIs unless a breaking change is approved
- add tests for changed behavior
- update package exports only when necessary
- avoid unrelated dependency upgrades
- do not regenerate the entire design system

Required implementation outputs may include:

```text
Token source
Generated token files
Theme files
Component source
Type definitions
Package exports
Tests
Storybook stories
Documentation
Migration notes
```

---

# 13. Stage 5: Update Storybook

Local Storybook:

```text
http://localhost:6006/?path=/docs/introduction--docs
```

For every affected token or component:

- update overview documentation
- update variants and states
- update token references
- update code examples
- update accessibility guidance
- update change history
- add or update visual-regression stories

## Customized Storybook shell

Preserve:

- Lumen branding
- custom navigation
- dark theme
- typography hierarchy
- documentation layout
- background consistency
- manager configuration
- improved discovery and UX

Do not revert customized Storybook UI during upgrades or releases.

---

# 14. Stage 6: Design review

Use:

```text
docs/design-review.md
```

The review must cover:

- source accuracy
- token architecture
- component anatomy
- variants and states
- responsive behavior
- accessibility
- Storybook presentation
- Figma-to-code parity
- release risk

Allowed decisions:

```text
Approved
Approved with Conditions
Changes Required
Blocked
Rejected
```

Only Approved or explicitly accepted Approved with Conditions changes may proceed.

---

# 15. Stage 7: Quality gates

Use:

```text
docs/quality-checklist.md
```

Mandatory gates:

## Figma

- [ ] Correct source and node verified.
- [ ] Approved delta verified.
- [ ] No unintended Figma changes included.

## Tokens

- [ ] Token validation passes.
- [ ] Generated outputs are current.
- [ ] Light and Dark modes resolve.

## Code

- [ ] Lint passes.
- [ ] Type checking passes.
- [ ] Unit tests pass.
- [ ] Production build passes.
- [ ] Package exports resolve.

## Accessibility

- [ ] Automated accessibility checks pass.
- [ ] Keyboard behavior is verified.
- [ ] Focus behavior is verified.
- [ ] Critical screen-reader flows are verified.
- [ ] No Critical or High issues remain.

## Storybook

- [ ] Storybook starts locally.
- [ ] Storybook production build passes.
- [ ] Changed stories render correctly.
- [ ] Customized UI remains intact.
- [ ] Visual-regression differences are approved.
- [ ] No new console errors exist.

## Documentation

- [ ] Changelog is current.
- [ ] Migration notes are complete.
- [ ] Component docs are current.
- [ ] Release notes are ready.

---

# 16. Stage 8: Version packages

Determine version impact for each published package.

Example:

```text
@lumen/tokens
@lumen/ui
@lumen/patterns
@lumen/storybook
```

## Versioning rules

- Use semantic versioning.
- Keep interdependent package versions compatible.
- Update peer dependency ranges when required.
- Do not publish unchanged packages unless repository policy requires synchronized versions.
- Record every published version in release notes.
- Tag the release consistently.

Example Git tag:

```text
lumen-v1.5.0
```

---

# 17. Stage 9: Build release artifacts

Build from a clean checkout or clean CI environment.

Recommended sequence:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build-storybook
```

Inspect the repository’s `package.json` before running commands. Use actual configured scripts.

Release artifacts may include:

```text
npm package tarballs
token JSON
CSS variables
TypeScript token exports
type declarations
compiled components
Storybook static build
release notes
migration guide
```

## Artifact checks

- [ ] Package contents are intentional.
- [ ] Source maps follow policy.
- [ ] Type declarations are included.
- [ ] Generated tokens are included.
- [ ] Internal files are excluded.
- [ ] Package size is reviewed.
- [ ] No credentials or sensitive data are included.
- [ ] Artifact hashes or provenance are available where supported.

---

# 18. Stage 10: Publish

Recommended publication order:

```text
1. Token package
2. Icon package
3. Component package
4. Storybook
5. Documentation and release notes
```

Publish dependent packages only after required upstream packages are available.

## Prerelease

Use a prerelease for:

- major migrations
- new architecture
- high-risk components
- broad token remapping
- Storybook platform upgrades

## Stable release

Publish Stable only after all mandatory gates pass.

Do not use local builds as evidence that registry or deployment publication succeeded.

---

# 19. Stage 11: Verify published outputs

After publication:

## Package verification

- [ ] Published version is available.
- [ ] Package installs in a clean test project.
- [ ] Public exports resolve.
- [ ] Type declarations resolve.
- [ ] Token outputs load.
- [ ] Themes switch correctly.
- [ ] No unexpected peer-dependency warning exists.

## Storybook verification

- [ ] Published Storybook loads.
- [ ] Introduction page loads.
- [ ] Navigation works.
- [ ] Changed stories render.
- [ ] Light and Dark themes work.
- [ ] Customized branding remains intact.
- [ ] No production console errors exist.

## Figma parity

- [ ] Published implementation matches approved Figma.
- [ ] Known differences are documented.
- [ ] Code Connect mappings remain valid where available.

---

# 20. Release notes

Every release note should include:

```text
Version
Release date
Summary
Added
Changed
Fixed
Deprecated
Removed
Accessibility
Migration
Affected packages
Figma references
Storybook reference
Known limitations
```

Template:

```markdown
# Lumen [Version]

Released: YYYY-MM-DD

## Summary

## Added

## Changed

## Fixed

## Deprecated

## Removed

## Accessibility

## Migration

## Packages

## Figma sources

## Storybook

## Known limitations
```

---

# 21. Migration process

Migration guidance is mandatory for:

- renamed tokens
- removed tokens
- changed component props
- removed variants
- changed defaults
- changed package exports
- incompatible theme behavior

A migration guide must include:

```text
Previous usage
New usage
Reason
Automated migration, if available
Manual migration steps
Removal timeline
```

Example:

```tsx
// Before
<Button quiet />

// After
<Button variant="tertiary" />
```

---

# 22. Deprecation process

A deprecation must include:

- changelog entry
- Storybook warning
- replacement guidance
- TypeScript deprecation annotation
- target removal version
- migration example
- owner

Recommended minimum deprecation window:

```text
At least one Minor release before removal
```

Public stable APIs should normally be removed only in a Major release.

---

# 23. Rollback process

Rollback is required when a release causes:

- broken package installation
- inaccessible critical workflows
- invalid token output
- major visual regression
- incompatible public API behavior
- Storybook deployment failure
- severe runtime error

## Rollback sequence

1. Stop further rollout.
2. Identify the last known stable version.
3. Restore package tags or deploy the previous build.
4. Communicate the rollback.
5. Open an incident or defect record.
6. Document root cause.
7. Correct the issue in a new release.
8. Do not overwrite an already published immutable version.

## Rollback record

```markdown
## Rollback

- Affected version:
- Previous stable version:
- Trigger:
- Severity:
- Time detected:
- Time rolled back:
- Packages affected:
- Storybook affected:
- Owner:
- Follow-up release:
```

---

# 24. Hotfix process

Use a hotfix for a production-blocking defect.

Hotfix rules:

- branch from the current production tag
- include only the minimum correction
- add or update regression tests
- run mandatory quality gates
- publish as a Patch release
- merge the correction back into the active development branch
- document the incident and resolution

Do not include unrelated improvements in a hotfix.

---

# 25. Post-release monitoring

Monitor:

- package installation failures
- runtime errors
- accessibility regressions
- Storybook errors
- visual-regression reports
- consumer-team feedback
- token adoption issues
- migration problems
- bundle-size changes

Recommended monitoring periods:

```text
Patch: 1–2 business days
Minor: 3–5 business days
Major: 1–2 release cycles
```

Record material findings in `changelog.md` or the issue tracker.

---

# 26. Release communication

Notify affected teams with:

- version
- release type
- summary
- affected packages
- key changes
- breaking changes
- migration deadline
- Storybook reference
- support contact
- rollback status when applicable

Avoid publishing release notes that only list internal commit messages.

---

# 27. Release checklist

## Scope and approval

- [ ] `[Unreleased]` is complete.
- [ ] Figma changes are Approved or Published.
- [ ] Release type is confirmed.
- [ ] Affected packages are confirmed.
- [ ] Breaking changes are identified.
- [ ] Migration guidance is ready.

## Implementation

- [ ] Only affected files changed.
- [ ] Tokens are generated.
- [ ] Components are updated.
- [ ] Tests are updated.
- [ ] Storybook is updated.
- [ ] Documentation is updated.

## Validation

- [ ] Design review is Approved.
- [ ] Quality checklist passes.
- [ ] Lint passes.
- [ ] Type checking passes.
- [ ] Tests pass.
- [ ] Accessibility passes.
- [ ] Production build passes.
- [ ] Storybook build passes.
- [ ] Visual changes are approved.

## Publication

- [ ] Versions are updated.
- [ ] Git tag is prepared.
- [ ] Artifacts are verified.
- [ ] Packages are published in dependency order.
- [ ] Storybook is deployed.
- [ ] Release notes are published.

## Post-release

- [ ] Clean-install verification passes.
- [ ] Published Storybook verification passes.
- [ ] Monitoring owner is assigned.
- [ ] Rollback path is confirmed.
- [ ] `[Unreleased]` is reset for the next cycle.

---

# 28. Release decision record

```markdown
# Lumen Release Decision

- Release:
- Version:
- Date:
- Release type:
- Figma source:
- Packages:
- Design review:
- Quality review:
- Accessibility review:
- Storybook review:
- Breaking changes:
- Migration guide:
- Rollback version:
- Decision:
- Approved by:
- Conditions:
```

Allowed decisions:

```text
Approved for Prerelease
Approved for Stable Release
Approved with Conditions
Blocked
Cancelled
Rolled Back
```

---

# 29. Claude Code release protocol

Before preparing a release, Claude Code must read:

```text
CLAUDE.md
AGENTS.md
docs/figma-source.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/accessibility.md
docs/storybook-guidelines.md
docs/development-guidelines.md
docs/quality-checklist.md
docs/design-review.md
docs/release-process.md
docs/changelog.md
```

## Audit pass

Claude Code must first:

1. Read `[Unreleased]`.
2. Identify affected Figma nodes.
3. Identify affected packages, tokens, components, stories, and tests.
4. Inspect package scripts and release configuration.
5. Determine the proposed semantic version.
6. Report blockers without publishing anything.

## Preparation pass

After approval:

1. Apply only approved fixes.
2. Update versions and release documentation.
3. Generate required artifacts.
4. Run available validation.
5. Build Storybook.
6. Produce the release decision summary.
7. Do not publish unless explicitly instructed.

## Reusable Claude Code prompt

```markdown
Read:

- `docs/figma-source.md`
- `docs/design-tokens.md`
- `docs/component-architecture.md`
- `docs/component-specifications.md`
- `docs/accessibility.md`
- `docs/storybook-guidelines.md`
- `docs/development-guidelines.md`
- `docs/quality-checklist.md`
- `docs/design-review.md`
- `docs/release-process.md`
- `docs/changelog.md`

Prepare a release only for changes listed under `[Unreleased]`.

First perform an audit without modifying or publishing anything.

Report:
1. release scope
2. affected packages
3. affected tokens and components
4. proposed semantic version
5. breaking changes
6. migration requirements
7. missing validation
8. release blockers
9. rollback target

After approval, update only required release files and affected implementation files.

Do not:
- regenerate the design system
- refactor unrelated files
- upgrade unrelated dependencies
- infer missing Figma values
- publish packages
- deploy Storybook

unless explicitly instructed.

Run the available lint, type-check, test, build, Storybook-build, accessibility, and visual-regression commands.

Return one recommendation:
- Approved for Prerelease
- Approved for Stable Release
- Approved with Conditions
- Blocked
```

---

# 30. Current Figma verification status

The Figma node metadata was reviewed for `426:4395`.

Verified foundation sections:

```text
01 Colors
02 Typography
03 Scale
04 Spacing
05 Radius
```

The foundation node does not provide complete release evidence for:

- exact variable values and aliases
- published variable collections and modes
- font families and weights
- complete component inventory
- component properties and variants
- component-specific dimensions
- focus-token values
- Code Connect mappings
- complete Light and Dark semantic mappings

Do not mark these release checks as passed without direct Figma Variable exports or component-specific Dev Mode evidence.