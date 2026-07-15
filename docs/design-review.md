# Lumen Design Review

> Structured design-review framework for the **Lumen AI Design System**, covering Figma foundations, design tokens, components, accessibility, Storybook, code parity, release readiness, and incremental change control.

## Source

- **Figma file:** Lumen AI Design System
- **File key:** `GJBYRm6ySR7XIECFcHMgy2`
- **Design Tokens node:** `426:4395`
- **Dev Mode URL:** https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-AI-Design-System?node-id=426-4395&m=dev
- **Local Storybook:** http://localhost:6006/?path=/docs/introduction--docs
- **Last reviewed:** 2026-07-15

## Related documents

```text
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
docs/changelog.md
```

---

# 1. Purpose

Use this document to conduct consistent, evidence-based design reviews for Lumen.

A design review should determine whether a proposed foundation, token, component, pattern, or Storybook change is:

- aligned with Lumen principles
- consistent with existing tokens
- accessible
- scalable
- implementation-ready
- documented
- safe to release
- limited to the intended scope

This document is not a replacement for `quality-checklist.md`. It defines the review process, questions, evidence, decision model, and review record.

---

# 2. Review principles

## 2.1 Review intent, not only appearance

Evaluate:

- user need
- task clarity
- information hierarchy
- interaction behavior
- state completeness
- accessibility
- scalability
- maintainability
- design-to-code implications

A visually polished design can still fail review if its behavior, semantics, or token architecture is weak.

## 2.2 Use evidence

Review decisions should cite:

- exact Figma nodes
- token names
- component specifications
- accessibility requirements
- Storybook stories
- implementation behavior
- test results
- known product constraints

Do not approve changes based only on subjective preference.

## 2.3 Prefer system improvement over exceptions

Before approving a one-off style or behavior, determine whether:

- an existing token already solves it
- an existing component can be composed
- a new semantic token is justified
- the requirement belongs at the pattern level
- the exception creates future inconsistency

## 2.4 Preserve incremental scope

A design review must not become an excuse to redesign unrelated areas.

Review only the changes documented under `[Unreleased]` in `changelog.md`, plus directly affected dependencies.

## 2.5 Accessibility is release-blocking

A design cannot be approved when it introduces a critical or high-severity accessibility barrier.

---

# 3. Review types

## Foundation review

Use for:

```text
Colors
Typography
Scale
Spacing
Radius
Borders
Elevation
Motion
Opacity
Breakpoints
Grid
Focus
Iconography
```

## Token review

Use for:

- new primitive tokens
- new semantic tokens
- new component tokens
- alias changes
- mode changes
- deprecation or removal

## Component review

Use for:

- new components
- new variants
- new sizes
- state changes
- API-impacting visual changes
- interaction changes

## Pattern review

Use for:

- multi-component workflows
- page-level behavior
- enterprise interaction patterns
- AI-assisted workflows
- review and approval flows

## Storybook review

Use for:

- documentation structure
- customized UI changes
- navigation
- component stories
- token stories
- brand consistency
- developer experience

## Release review

Use before:

- publishing packages
- publishing Storybook
- marking a component Stable
- releasing breaking changes

---

# 4. Review participants

Select only the roles required for the change.

## Design-system designer

Reviews:

- visual consistency
- component architecture
- token usage
- Figma quality
- variants and states
- responsive behavior

## Product designer

Reviews:

- workflow fit
- task clarity
- usability
- content hierarchy
- product context

## Engineer

Reviews:

- implementation feasibility
- API impact
- performance
- composition
- package impact
- Storybook parity

## Accessibility specialist

Reviews:

- semantics
- keyboard behavior
- focus
- contrast
- reflow
- assistive-technology implications

## Content designer

Reviews:

- labels
- instructions
- errors
- status messages
- terminology
- AI disclosure

## Product manager

Reviews:

- user value
- scope
- priority
- rollout risk
- success criteria

---

# 5. Required review inputs

A review request should include:

```text
Change summary
User problem
Figma node URL
Affected tokens
Affected components
Affected patterns
Storybook reference
Accessibility impact
Code/API impact
Changelog entry
Open questions
```

Recommended review request:

```markdown
## Design review request

- Change:
- User problem:
- Figma node:
- Changelog entry:
- Affected tokens:
- Affected components:
- Storybook stories:
- Accessibility impact:
- API impact:
- Open questions:
- Requested decision:
```

A review should not begin when the source, scope, or intended outcome is unclear.

---

# 6. Review stages

## Stage 1: Intake

Confirm:

- the problem is clearly defined
- the request is in scope
- the correct Figma node is supplied
- affected dependencies are identified
- required reviewers are present

## Stage 2: Foundation and token review

Check:

- existing tokens are reused
- new tokens are semantically justified
- aliases are correct
- all supported modes are considered
- typography, spacing, and radius remain consistent

## Stage 3: Component and behavior review

Check:

- anatomy
- variants
- sizes
- states
- content behavior
- responsive behavior
- keyboard behavior
- loading, empty, error, and disabled states

## Stage 4: Accessibility review

Check:

- contrast
- focus
- target size
- semantics
- keyboard model
- screen-reader behavior
- zoom and reflow
- reduced motion

## Stage 5: Storybook and implementation review

Check:

- component API alignment
- token implementation
- documentation
- stories
- customized Storybook UI
- tests
- design-to-code parity

## Stage 6: Decision

Record one of:

```text
Approved
Approved with Conditions
Changes Required
Blocked
Rejected
```

---

# 7. Review decision definitions

## Approved

Use when:

- no Critical or High issues remain
- implementation details are sufficiently defined
- accessibility requirements are met
- documentation and tests are planned or complete
- design-system consistency is preserved

## Approved with Conditions

Use when:

- no release-blocking issue exists
- limited follow-up work remains
- owners and deadlines are recorded
- conditions are measurable

## Changes Required

Use when:

- the direction is valid
- material issues must be resolved before approval
- another review is required

## Blocked

Use when:

- required evidence is missing
- Figma source is inaccessible or ambiguous
- dependencies are unresolved
- the review cannot be completed responsibly

## Rejected

Use when:

- the proposal duplicates existing capability
- the approach violates system principles
- the requirement should be solved differently
- the proposal creates unacceptable risk

---

# 8. Foundation review

## Colors

Review:

- palette completeness
- semantic role coverage
- Light and Dark mappings
- interaction states
- focus color
- status colors
- data-visualization suitability
- color-vision deficiency support

Questions:

- Is this a primitive or semantic role?
- Is a new color required?
- Does it pass contrast in every intended pairing?
- Does it duplicate another token?
- Is meaning communicated without color alone?
- Does the Dark mode mapping preserve the same semantic intent?

## Typography

Review:

- hierarchy
- font family
- weight
- size
- line height
- letter spacing
- usage role
- localization
- zoom behavior

Questions:

- Is this style semantically distinct?
- Does an existing style already meet the need?
- Is the text readable at 200% zoom?
- Will the style clip or wrap incorrectly?
- Is the hierarchy consistent with HTML semantics?

## Spacing

Review:

- token reuse
- rhythm
- component density
- touch-target separation
- responsive behavior

Questions:

- Is the spacing value in the approved scale?
- Is it optical adjustment or structural spacing?
- Does compact density remain usable?
- Is the value repeated enough to justify a new token?

## Radius

Review:

- hierarchy
- affordance
- component consistency
- clipping risk
- focus-ring behavior

Questions:

- Does the radius communicate component type or hierarchy?
- Is the chosen token consistent with similar components?
- Does it clip focus, content, or nested states?

## Scale

Review:

- size relationships
- control heights
- icon sizes
- layout scaling
- responsive use

Questions:

- Is the scale semantic or generic?
- Should a control-specific token be used?
- Does the size remain usable across density modes?

---

# 9. Token review

For every added or changed token, record:

```markdown
## Token review

- Token:
- Layer: Primitive | Semantic | Component
- Current value or alias:
- Proposed value or alias:
- Supported modes:
- Consumers:
- Reason:
- Migration impact:
- Decision:
```

## Token questions

- Is the token name semantic and durable?
- Is it placed in the correct layer?
- Does it duplicate an existing token?
- Does it alias the correct source?
- Does it resolve in all supported modes?
- Does it expose implementation detail?
- Will changing it unintentionally affect unrelated components?
- Does it require a major version change?
- Is migration guidance required?

---

# 10. Component review

## Purpose

- Is the user need clear?
- Is this component reusable?
- Should this be a component, pattern, or composition?
- Does an existing Lumen component already solve the problem?

## Anatomy

- Are all regions named?
- Is the hierarchy logical?
- Can parts be optional without breaking layout?
- Are slots or subcomponents justified?

## Variants

- Are variants semantic?
- Is each variant meaningfully distinct?
- Are any variants product-specific?
- Can composition replace a new variant?
- Are unsupported combinations prevented?

## Sizes

- Are `sm`, `md`, and `lg` sufficient?
- Is an additional size genuinely required?
- Are control height, padding, icon, and typography coordinated?
- Do all sizes preserve target requirements?

## States

Applicable states may include:

```text
Default
Hover
Pressed
Focus
Disabled
Loading
Selected
Checked
Indeterminate
Expanded
Read Only
Invalid
Success
Warning
Error
Empty
Partial
Unavailable
```

Questions:

- Are all required states present?
- Are any states visually ambiguous?
- Does loading preserve dimensions?
- Is disabled behavior understandable?
- Are errors actionable?
- Are selected and pressed distinct?

## Content

- Are labels clear and concise?
- Does long content wrap correctly?
- Is truncation safe?
- Is supporting text optional?
- Are localization and RTL considered?
- Are status and errors understandable?

## Responsive behavior

- Does the component resize predictably?
- Are minimum and maximum widths defined?
- Does content reflow?
- Do overlays remain within the viewport?
- Does compact mode remain accessible?

---

# 11. Accessibility review

Use `accessibility.md` as the requirement source.

## Visual

- Does text contrast pass?
- Do controls and boundaries pass?
- Is focus visible?
- Is status conveyed beyond color?
- Are targets sufficiently large?
- Does the design work in forced colors?

## Keyboard

- Is every action keyboard operable?
- Is focus order logical?
- Is the established composite-widget model used?
- Does Escape behave correctly?
- Is focus restored?
- Is there any keyboard trap?

## Screen reader

- What is the role?
- What is the accessible name?
- What states and values are exposed?
- What changes require announcement?
- Are errors and descriptions associated?
- Is output too verbose?

## Zoom and reflow

- Does text work at 200%?
- Does the layout work at 400% zoom where applicable?
- Does content reflow at narrow widths?
- Is any essential information clipped?

## Motion

- Is animation essential?
- Is reduced motion supported?
- Is motion the only state cue?
- Can continuous animation be stopped?

---

# 12. AI design review

AI components require additional review.

## Purpose and disclosure

- Is it clear that AI is being used?
- Is the user benefit clear?
- Is AI appropriate for this task?
- Could the same task be solved more predictably without AI?

## Human control

- Can users edit generated output?
- Can they cancel?
- Can they reject?
- Can they regenerate?
- Can they undo?
- Is user-authored content preserved?

## Trust and evidence

- Are sources visible when available?
- Is uncertainty communicated?
- Is confidence meaningful?
- Are limitations clear?
- Is low-confidence guidance actionable?

## Accessibility

- Are generation states announced?
- Is streaming readable?
- Are citations keyboard accessible?
- Is AI output structurally semantic?
- Does the experience avoid excessive live-region announcements?

## Risk

- Is human review required?
- Is sensitive data exposed?
- Is an audit trail required?
- Could automation cause high-impact harm?
- Are failure and partial-result states covered?

---

# 13. Storybook review

Local reference:

```text
http://localhost:6006/?path=/docs/introduction--docs
```

## Documentation

- Is the purpose clear?
- Are anatomy, variants, sizes, and states documented?
- Are accessibility requirements included?
- Are token dependencies listed?
- Are examples realistic?
- Are known limitations stated?
- Is the Figma link current?

## Stories

- Are all supported variants shown?
- Are all supported states shown?
- Is Dark mode included?
- Is long content included?
- Is keyboard focus included?
- Are edge cases included?
- Are controls limited to supported props?
- Are stories deterministic?

## Customized Storybook UI

- Is Lumen branding preserved?
- Is the dark background consistent?
- Is navigation clear?
- Is typography hierarchy consistent?
- Has default Storybook styling leaked into customized areas?
- Is the customization still compatible with the installed Storybook version?
- Does the UI improve discovery rather than add decoration?

---

# 14. Design-to-code review

Compare Figma and implementation.

## Tokens

- Do names match?
- Do values and aliases match?
- Do modes match?
- Are generated files current?
- Are hardcoded values absent?

## Components

- Does anatomy match?
- Do variants match?
- Do sizes match?
- Do states match?
- Does behavior match?
- Does responsive behavior match?
- Is accessibility implemented beyond the visual specification?

## API

- Is the public API semantic?
- Are native attributes supported?
- Are breaking changes necessary?
- Are internal details hidden?
- Are deprecated APIs documented?

## Code Connect

Where available:

- Is the mapping current?
- Does the mapped component represent the correct Figma node?
- Are variant and property mappings accurate?
- Are unmapped stable components tracked?

---

# 15. Scalability review

Evaluate whether the change scales across:

```text
Multiple products
Multiple teams
Light and Dark themes
Compact and comfortable density
Localization
RTL
Large datasets
Permissions
Loading and partial states
Enterprise workflows
AI-assisted workflows
Future token changes
```

Questions:

- Will teams create workarounds?
- Is the component too product-specific?
- Does the API allow safe extension?
- Will a token change cascade unpredictably?
- Does the component support realistic enterprise data?
- Is performance considered?
- Is composition possible?

---

# 16. Review anti-patterns

Do not approve:

- hardcoded token-backed values
- duplicate components
- visual-only Figma specifications
- undocumented interaction behavior
- color-only status
- inaccessible icon-only controls
- arbitrary one-off spacing
- variant explosion
- product-specific logic in primitives
- disabling tests to pass a build
- undocumented Storybook customization changes
- complete design-system regeneration for a small update
- breaking changes without migration guidance

---

# 17. Review comments

Use specific, actionable comments.

## Effective

```text
The hover background introduces a raw hex value. Replace it with
Button/Primary/Background/Hover and verify the Light and Dark aliases.
```

```text
The dialog has no defined initial-focus target. Add the focus behavior
to the component specification and Storybook accessibility story.
```

## Ineffective

```text
This feels off.
```

```text
Make it cleaner.
```

## Comment format

```markdown
- Severity:
- Area:
- Evidence:
- Issue:
- Recommendation:
- Owner:
- Status:
```

---

# 18. Design-review checklist

## Scope

- [ ] Changelog entry exists.
- [ ] Exact Figma node is identified.
- [ ] User problem is clear.
- [ ] Affected dependencies are known.
- [ ] Review is limited to the approved scope.

## Foundations and tokens

- [ ] Existing tokens are reused.
- [ ] New tokens are justified.
- [ ] Names are semantic.
- [ ] Aliases are correct.
- [ ] Modes are complete.
- [ ] Contrast is verified.
- [ ] Migration impact is understood.

## Component

- [ ] Purpose is clear.
- [ ] Anatomy is complete.
- [ ] Variants are semantic.
- [ ] Sizes are consistent.
- [ ] States are complete.
- [ ] Content behavior is documented.
- [ ] Responsive behavior is documented.
- [ ] Edge cases are covered.

## Accessibility

- [ ] Semantics are defined.
- [ ] Accessible name is defined.
- [ ] Keyboard model is defined.
- [ ] Focus behavior is defined.
- [ ] Status announcements are defined.
- [ ] Target size is adequate.
- [ ] Zoom and reflow are considered.
- [ ] Reduced motion is considered.

## Storybook and code

- [ ] Stories cover approved behavior.
- [ ] Customized Storybook UI remains consistent.
- [ ] Public API is aligned.
- [ ] No hardcoded values exist.
- [ ] Tests are planned or updated.
- [ ] Figma-to-code parity is acceptable.

## Release

- [ ] No Critical issues remain.
- [ ] No High issues remain.
- [ ] Conditions have owners and dates.
- [ ] Changelog is current.
- [ ] Final decision is recorded.

---

# 19. Design-review record template

```markdown
# Design Review: [Change Name]

## Summary

- Date:
- Reviewer:
- Figma node:
- Storybook:
- Changelog:
- Affected tokens:
- Affected components:
- Review type:

## User problem

## Proposed change

## Evidence reviewed

## Findings

### Critical

### High

### Medium

### Low

### Observations

## Accessibility review

## Token review

## Component review

## Storybook review

## Design-to-code parity

## Conditions

| Condition | Owner | Due date | Status |
|---|---|---|---|

## Decision

Approved | Approved with Conditions | Changes Required | Blocked | Rejected

## Rationale

## Next review
```

---

# 20. Claude Code design-review protocol

Before reviewing Lumen, Claude Code must read:

```text
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
docs/changelog.md
```

## First pass: audit only

Claude Code must:

1. Read `[Unreleased]`.
2. Identify the exact Figma nodes.
3. Inspect the current implementation.
4. Compare Figma, tokens, components, Storybook, tests, and documentation.
5. Report findings without changing files.
6. Assign severity.
7. Recommend the smallest viable corrections.
8. State which checks could not be verified.

## Second pass: approved fixes only

After approval:

1. Apply only approved corrections.
2. Update only affected files.
3. Preserve public APIs unless a breaking change is approved.
4. Run available validation.
5. Review changed Storybook stories.
6. Update the review record and changelog.
7. Report unresolved differences.

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
- `docs/changelog.md`

Conduct a design review only for the changes listed under `[Unreleased]`.

Use:
- the exact Figma node
- exported token files
- current component source
- local Storybook
- existing tests and documentation

Do not modify files during the first pass.

Report:
1. review scope
2. evidence inspected
3. findings by severity
4. token issues
5. component issues
6. accessibility issues
7. Storybook issues
8. Figma-to-code differences
9. minimal recommended fixes
10. final decision

Use one final decision:
- Approved
- Approved with Conditions
- Changes Required
- Blocked
- Rejected

Do not mark anything as verified without evidence.
Do not infer missing Figma values or behavior.
Do not review unrelated files.
```

---

# 21. Current Figma review status

The Figma design-context request was made for node `426:4395`, but the connector returned:

```text
You currently have nothing selected.
You need to select a layer first before using this tool.
```

Therefore, this design-review framework is grounded in the previously retrieved Figma metadata and the documented Lumen foundation structure:

- Colors
- Typography
- Scale
- Spacing
- Radius

The following cannot be marked reviewed without direct evidence from Figma Variables or component-specific nodes:

- exact color values and aliases
- variable collections and modes
- font families and weights
- focus-token values
- component inventory
- component properties
- component-specific dimensions
- interaction behavior
- Code Connect mappings
- complete Light and Dark semantic mappings

Use component-specific Dev Mode URLs for future component reviews.