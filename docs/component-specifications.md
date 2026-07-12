# Lumen Component Specifications

> Canonical specification framework for components in the **Lumen Design System**.

This document defines the required specification structure, behavior contract, token usage, accessibility requirements, Storybook coverage, and Figma-to-code synchronization rules for every Lumen component.

## Source

- **Figma file:** Lumen DS 2027
- **File key:** `GJBYRm6ySR7XIECFcHMgy2`
- **Design Tokens node:** `426:4395`
- **Dev Mode URL:** https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-DS-2027?node-id=426-4395&m=dev
- **Last reviewed:** 2026-07-12

## Related documents

```text
AGENTS.md
docs/figma-source.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/changelog.md
```

## Scope

The referenced Figma node documents the Lumen foundations:

- Colors
- Typography
- Scale
- Spacing
- Radius

It does not expose the complete component inventory or all component-set properties. Therefore, this document defines the required specification contract and approved baseline components. Exact variant values, node IDs, properties, and token aliases must be synchronized from each component-specific Figma URL before implementation.

---

# 1. Specification authority

Use the following authority order:

```text
Published Figma component
    ↓
Approved component-specific Dev Mode node
    ↓
Component token definitions
    ↓
This specification                       (framework-neutral contract)
    ↓
Framework package implementation          (React today; Angular, Vue, and
    ↓                                       Web Components are future peers,
    ↓                                       not replacements)
Storybook and tests
```

This specification is the component contract every framework package implements — it does not belong to React or any other single framework. React is currently the only shipped framework package (`@lumen/ui`, `@lumen/patterns`), so today it is also the only place this specification is realized in code; that is a statement about what has been built, not about which layer is authoritative. See `docs/component-architecture.md` §0 for the full layer diagram.

When information conflicts:

1. Approved and published Figma components define visual anatomy and supported variants.
2. Exported token files define exact machine-readable values.
3. This document defines behavior, governance, accessibility, and documentation requirements — independent of framework.
4. `changelog.md` defines the authorized update scope.
5. A framework package's implementation must conform to this specification; if a package's real behavior differs, the package is wrong, not the spec.
6. Claude Code must report ambiguity instead of inventing behavior or values.

---

# 2. Required component specification structure

Every production component must include the following sections.

```markdown
# Component name

## Status
Draft | Experimental | Beta | Stable | Deprecated

## Figma source
Component URL, node ID, component-set name, and last synchronization date.

## Purpose
What the component enables.

## When to use
Approved use cases.

## When not to use
Misuse cases and recommended alternatives.

## Anatomy
Named component regions.

## Variants
Supported semantic variants.

## Sizes
Supported size options.

## States
Supported interaction and validation states.

## Properties
Figma properties and the framework-neutral property contract (canonical name, type, and meaning — independent of any single framework's API syntax).

## Behavior
Interaction rules, state transitions, layout, and content behavior.

## Content
Labels, descriptions, truncation, localization, and tone.

## Tokens
Semantic and component token dependencies.

## Accessibility
Semantics, keyboard interaction, focus, announcements, and contrast.

## Responsive behavior
Resizing, wrapping, density, and breakpoint expectations.

## Storybook
Required stories, controls, and documentation.

## Testing
Unit, accessibility, visual, and integration coverage.

## Code mapping
One entry per shipped framework package: export or custom-element name, source path, and Code Connect mapping. React is the only shipped framework package today.

## Change history
Component-specific additions, changes, and deprecations.
```

---

# 3. Cross-component standards

## 3.1 Naming

Use semantic names.

Recommended:

```text
Primary
Secondary
Tertiary
Ghost
Danger
Success
Warning
Info
```

Avoid implementation names:

```text
Blue
Gray
Outlined Blue
Filled Dark
```

Use these standard state names:

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
```

## 3.2 Sizes

Use the shared size vocabulary:

```text
Sm
Md
Lg
```

Add `Xs` or `Xl` only after design-system review.

## 3.3 Density

Enterprise components may support:

```text
Comfortable
Compact
```

Density must resolve through approved tokens and must not be implemented using arbitrary overrides.

## 3.4 Token usage

All components must use:

- semantic color tokens
- component-specific color tokens where necessary
- spacing tokens
- radius tokens
- typography styles
- elevation tokens
- motion tokens
- focus tokens

Do not hardcode token-backed values.

## 3.5 Layout

Production components should use Figma Auto Layout and equivalent flexible layout behavior in code.

Validate:

- Hug, Fill, and Fixed behavior
- minimum and maximum dimensions
- long text
- wrapping
- localization expansion
- icon alignment
- nested spacing
- responsive resizing

## 3.6 Accessibility

All stable components must meet WCAG 2.2 AA.

Every component specification must identify:

```text
Role
Accessible name
Keyboard interaction
Focus behavior
ARIA attributes
Announcements
Contrast
Touch target
Reduced-motion behavior
Known constraints
```

---

# 4. Foundation-to-component mapping

The current Figma source provides the following foundations.

## Typography

| Role | Size | Line height |
|---|---:|---:|
| Heading H1 | 60px | 72px |
| Heading H2 | 50px | 60px |
| Heading H3 | 40px | 50px |
| Heading H4 | 32px | 42px |
| Heading H5 | 24px | 32px |
| Heading H6 | 20px | 28px |
| Body Lg | 20px | 32px |
| Body Md | 16px | 26px |
| Body Sm | 14px | 22px |
| Body Xs | 12px | 20px |
| Label Lg | 14px | 20px |
| Label Md | 12px | 18px |
| Label Sm | 11px | 16px |
| Overline | 11px | 16px |
| Caption | 11px | 18px |
| Code Md | 14px | 22px |
| Code Sm | 12px | 20px |

## Spacing

```text
0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32,
40, 48, 56, 64, 80, 96, 128
```

## Radius

```text
None = 0px
Xs = 2px
Sm = 4px
Md = 6px
Lg = 8px
Xl = 12px
2xl = 16px
3xl = 24px
Full = pill / 9999px
```

Exact color values, aliases, modes, font families, font weights, letter spacing, and general scale values must come from Figma Variables or component-specific Dev Mode nodes.

---

# 5. Button

## Status

Baseline specification. Component-specific Figma node verification required.

## Purpose

Buttons trigger immediate actions such as submitting data, creating records, confirming decisions, opening workflows, or invoking AI-assisted operations.

## When to use

Use a Button when:

- the user initiates an action
- the outcome occurs in the current product context
- a form is submitted
- a workflow advances
- a confirmation or destructive action is required
- an AI-assisted operation is explicitly initiated

## When not to use

Do not use a Button for:

- navigation to another location when a Link is more appropriate
- persistent on/off state when a Switch is appropriate
- selecting one option from a group
- opening passive explanatory content without a clear action
- icon-only actions without an accessible label

## Anatomy

```text
Button
├── Container
├── State layer
├── Content
│   ├── Leading icon
│   ├── Label
│   └── Trailing icon
├── Loading indicator
└── Focus ring
```

## Variants

```text
Primary
Secondary
Tertiary
Ghost
Link
Danger
AI
Icon
```

### Primary

Use for the highest-priority action in a logical region.

### Secondary

Use for important supporting actions.

### Tertiary

Use for lower-emphasis actions that still require a visible control boundary or text action treatment.

### Ghost

Use for contextual and low-emphasis actions where a persistent background is unnecessary.

### Link

Use when the interaction visually resembles a text action. Use a semantic link element when the action navigates.

### Danger

Use for destructive or irreversible actions.

### AI

Use for explicit AI-assisted actions such as Summarize, Draft, Explain, Generate, or Extract.

### Icon

Use for compact, recognizable actions. An accessible name is mandatory.

## Sizes

```text
Sm
Md
Lg
```

Each size must define:

```text
height
padding-inline
padding-block
gap
label typography
icon size
spinner size
```

Exact values must be synchronized from the Button Figma component.

## States

```text
Default
Hover
Pressed
Focus
Disabled
Loading
```

Optional states when applicable:

```text
Selected
Success
Error
```

## Properties

Recommended Figma properties:

```text
Variant
Size
State
Label
Show leading icon
Leading icon
Show trailing icon
Trailing icon
Full width
```

Property contract (framework-neutral — every framework package exposes these, named and typed identically in spirit):

```text
variant     enum: primary | secondary | tertiary | ghost | link | danger | ai
size        enum: sm | md | lg
loading     boolean
disabled    boolean
fullWidth   boolean
leadingIcon renderable content (icon)
trailingIcon renderable content (icon)
```

Reference implementation — React (`@lumen/ui`, the only shipped framework package today):

```ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "link"
    | "danger"
    | "ai";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
```

## Behavior

- Activation occurs through pointer click, Enter, or Space.
- Loading prevents duplicate activation where appropriate.
- Loading preserves the component width.
- Disabled buttons do not receive interaction.
- Focus-visible treatment appears for keyboard navigation.
- Link-styled buttons must use semantic anchors for navigation.
- Danger actions should use confirmation when consequences are significant.
- AI actions should clearly indicate generation or processing status.

## Content

- Use concise, action-oriented labels.
- Begin with a verb where practical.
- Avoid generic labels such as “Click here.”
- Keep labels stable during loading unless the replacement clarifies progress.
- Avoid truncating critical action labels.
- Account for localization expansion.

## Tokens

Required token structure:

```text
Button/{Variant}/Background/{State}
Button/{Variant}/Text/{State}
Button/{Variant}/Icon/{State}
Button/{Variant}/Border/{State}

Button/{Size}/Height
Button/{Size}/Padding/Inline
Button/{Size}/Padding/Block
Button/{Size}/Gap
Button/{Size}/Icon/Size

Button/Radius
Button/Border/Width
Button/Focus/Ring/Width
Button/Focus/Ring/Offset
Button/Focus/Ring/Color
```

## Accessibility

- Use `<button>` for actions.
- Use `<a>` for navigation.
- Icon-only buttons require `aria-label`.
- Loading status should be announced when meaningful.
- Do not rely on color alone for danger or disabled states.
- Focus must remain visible.
- Touch target should meet the approved minimum target size.
- Spinner animation must respect reduced-motion preferences.

## Storybook

Required stories:

```text
Overview
Variants
Sizes
States
Leading Icon
Trailing Icon
Icon Only
Loading
Disabled
Full Width
Long Labels
Dark Mode
Keyboard Focus
AI Actions
Accessibility
```

## Testing

- activation by click, Enter, and Space
- disabled behavior
- loading behavior
- accessible name
- focus-visible behavior
- variant rendering
- size rendering
- icon alignment
- dark mode
- reduced motion
- visual regression

---

# 6. Icon Button

## Purpose

Icon Button provides a compact control for a familiar action represented by an icon.

## Variants

```text
Primary
Secondary
Ghost
Danger
AI
```

## Sizes

```text
Sm
Md
Lg
```

## Requirements

- Accessible name is mandatory.
- Tooltip is recommended when the meaning is not universally clear.
- Icon and control target sizes must remain separate.
- Loading must not cause layout shift.
- Destructive icon buttons require clear context or confirmation.

## Reference implementation (React)

```tsx
<IconButton
  aria-label="Delete record"
  icon={<TrashIcon />}
  variant="danger"
  size="md"
/>
```

---

# 7. Link

## Purpose

Link navigates users to another destination or resource.

## Variants

```text
Default
Subtle
Inverse
Danger
```

## States

```text
Default
Hover
Pressed
Focus
Visited
Disabled
```

## Requirements

- Use a semantic anchor for navigation.
- Provide visible focus.
- Do not remove underlines unless another persistent affordance exists.
- External links should be communicated when opening a new context.
- Disabled links should normally be rendered as non-interactive text rather than inaccessible anchors.

---

# 8. Form Field

## Purpose

Form Field combines a label, control, supporting text, validation message, and required indicator into a consistent accessible unit.

## Anatomy

```text
Form Field
├── Label row
│   ├── Label
│   ├── Required indicator
│   └── Optional text
├── Control
├── Supporting text
└── Validation message
```

## States

```text
Default
Focus
Disabled
Read Only
Invalid
Success
Warning
```

## Requirements

- Label must be programmatically associated with the control.
- Validation message must be associated using `aria-describedby`.
- Invalid controls must use `aria-invalid`.
- Required status must be conveyed semantically.
- Supporting and error text must remain distinguishable without color alone.

---

# 9. Text Input

## Purpose

Text Input collects a single line of user-entered text.

## Variants

```text
Default
Search
Password
```

## Sizes

```text
Sm
Md
Lg
```

## States

```text
Default
Hover
Focus
Filled
Disabled
Read Only
Invalid
Success
```

## Anatomy

```text
Input
├── Container
├── Leading icon
├── Input text
├── Placeholder
├── Trailing action
└── Focus ring
```

## Behavior

- Placeholder does not replace a label.
- Clear action must be keyboard accessible.
- Password visibility toggle requires an accessible name.
- Search input may use a clear action and submit behavior.
- Read-only and disabled must remain visually distinct.

---

# 10. Select and Combobox

## Purpose

Select chooses one value from a predefined list. Combobox supports typed filtering or freeform input where approved.

## States

```text
Closed
Open
Focus
Disabled
Read Only
Invalid
Loading
No Results
```

## Keyboard behavior

- Arrow keys move through options.
- Enter confirms the active option.
- Escape closes without committing.
- Home and End navigate where supported.
- Typed search follows the selected interaction model.

## Accessibility

Use the correct select or combobox semantics. Do not recreate complex behavior without an established accessible primitive.

---

# 11. Checkbox

## Purpose

Checkbox allows independent selection of one or more options.

## States

```text
Unchecked
Checked
Indeterminate
Hover
Focus
Disabled
Invalid
```

## Requirements

- Label must be clickable.
- Indeterminate must be exposed programmatically.
- Group labels should use fieldset and legend where appropriate.
- Checked state must not rely on color alone.

---

# 12. Radio Group

## Purpose

Radio Group allows one selection from a mutually exclusive set.

## Requirements

- Use one tab stop for the group.
- Arrow keys move selection.
- A visible group label is required.
- Do not use a Radio Group for multi-select behavior.

---

# 13. Switch

## Purpose

Switch controls an immediate binary setting.

## States

```text
Off
On
Hover
Focus
Disabled
```

## Requirements

- Use for immediate state changes.
- Use Checkbox when the choice is submitted with a form.
- Label must describe the setting, not the current state.
- Expose checked state programmatically.

---

# 14. Badge

## Purpose

Badge communicates compact status, classification, or metadata.

## Variants

```text
Neutral
Brand
Info
Success
Warning
Danger
AI
```

## Sizes

```text
Sm
Md
```

## Requirements

- Do not use Badge as an interactive control unless explicitly implemented as one.
- Status must not rely solely on color.
- Keep labels concise.
- Use icon support only when it improves comprehension.

---

# 15. Alert

## Purpose

Alert communicates important contextual feedback.

## Variants

```text
Info
Success
Warning
Danger
AI
```

## Anatomy

```text
Alert
├── Status icon
├── Title
├── Description
├── Actions
└── Dismiss action
```

## Behavior

- Persistent alerts remain until resolved or dismissed.
- Temporary feedback should use Toast.
- Urgent errors may use an assertive live region.
- Dismiss actions require accessible labels.

---

# 16. Toast

## Purpose

Toast communicates brief, non-blocking feedback following an action.

## Variants

```text
Neutral
Info
Success
Warning
Danger
```

## Behavior

- Do not use Toast for information users must retain.
- Provide sufficient reading time.
- Pause dismissal on hover or focus where auto-dismiss is used.
- Keep actionable toasts keyboard accessible.
- Avoid stacking excessive messages.
- Announce content through an appropriate live region.

---

# 17. Tooltip

## Purpose

Tooltip provides concise supplementary information for a focused or hovered trigger.

## Requirements

- Must appear on hover and keyboard focus.
- Must dismiss on Escape.
- Must not contain essential information unavailable elsewhere.
- Avoid interactive content inside a standard tooltip.
- Use Popover for interactive supplementary content.

---

# 18. Dialog

## Purpose

Dialog focuses attention on a task, decision, or critical information.

## Variants

```text
Modal
Non-modal
Alert Dialog
```

## Sizes

```text
Sm
Md
Lg
Full Screen
```

## Requirements

- Move focus into the dialog when opened.
- Trap focus for modal dialogs.
- Return focus to the trigger when closed.
- Support Escape unless the workflow explicitly prevents dismissal.
- Provide an accessible name and optional description.
- Destructive confirmations should use Alert Dialog behavior.

---

# 19. Drawer

## Purpose

Drawer provides contextual tasks or details without fully replacing the current page.

## Positions

```text
Start
End
Bottom
```

## Requirements

- Modal and non-modal behavior must be explicit.
- Focus behavior must match the selected modality.
- Content must support scrolling without hiding critical actions.
- Responsive behavior may convert a side drawer into a bottom sheet.

---

# 20. Tabs

## Purpose

Tabs switch between related content views within the same context.

## Variants

```text
Underline
Contained
Pill
```

## Keyboard behavior

- Arrow keys move focus.
- Home and End move to first and last tabs.
- Activation may be automatic or manual, but the behavior must be consistent.
- Selected tab must be programmatically exposed.

---

# 21. Accordion

## Purpose

Accordion progressively discloses sections of related content.

## Requirements

- Trigger uses a button.
- Expanded state uses `aria-expanded`.
- Panel association uses `aria-controls`.
- Multiple-open and single-open behavior must be explicit.
- Do not hide information that users need to compare simultaneously.

---

# 22. Breadcrumb

## Purpose

Breadcrumb communicates hierarchy and supports navigation to parent levels.

## Requirements

- Use semantic navigation.
- Mark the current page using `aria-current="page"`.
- Do not make the current page link to itself.
- Support truncation without removing critical hierarchy.

---

# 23. Pagination

## Purpose

Pagination navigates a large result set divided into pages.

## Requirements

- Current page must be exposed programmatically.
- Previous and Next controls require accessible names.
- Disabled boundary controls must not be interactive.
- Preserve search and filter state across pages.
- Consider cursor-based navigation for large or changing datasets.

---

# 24. Table

## Purpose

Table displays structured data with meaningful row and column relationships.

## Variants

```text
Standard
Compact
Comfortable
Selectable
Sortable
```

## States

```text
Loading
Empty
Error
Partial
Selected
Disabled Row
```

## Requirements

- Use semantic table markup for tabular data.
- Headers must identify scope.
- Sorting state must be announced.
- Row selection must have accessible labels.
- Do not place unrelated layout content in a data table.
- Sticky headers and columns must preserve keyboard and screen-reader usability.

---

# 25. Data Grid

## Purpose

Data Grid supports advanced enterprise interaction with large datasets.

## Capabilities

Optional capabilities include:

```text
Sorting
Filtering
Column resizing
Column reordering
Row selection
Bulk actions
Inline editing
Grouping
Pinning
Virtualization
Export
```

## Requirements

- Data and interaction state must remain separable from presentation.
- Keyboard navigation must be fully specified.
- Virtualization must not prevent assistive-technology access.
- Empty, loading, error, and partial states are required.
- Density must use approved tokens.
- Capabilities must be additive and individually testable.

---

# 26. Card

## Purpose

Card groups related information and actions.

## Variants

```text
Default
Interactive
Selected
Elevated
Outlined
```

## Requirements

- Do not make the entire card interactive when it contains multiple independent actions.
- Use heading hierarchy correctly.
- Preserve clear action priority.
- Interactive cards require focus treatment and semantic interaction.

---

# 27. Empty State

## Purpose

Empty State explains why content is unavailable and provides an appropriate next step.

## Types

```text
First Use
No Results
No Data
Permission Restricted
Error
Filtered Empty
```

## Anatomy

```text
Illustration or icon
Title
Description
Primary action
Secondary action
```

## Requirements

- Explain the cause when known.
- Provide a meaningful recovery action.
- Avoid blaming the user.
- Do not use decorative empty states for loading.

---

# 28. Skeleton and Spinner

## Skeleton

Use when the approximate content structure is known.

Requirements:

- Match the expected layout.
- Avoid excessive animation.
- Respect reduced motion.
- Do not present skeleton content to assistive technology as real content.

## Spinner

Use for indeterminate progress when structure is unknown or the affected region is small.

Requirements:

- Provide an accessible status label when the wait is meaningful.
- Avoid blocking the entire page unnecessarily.
- Preserve control dimensions when used inside buttons.

---

# 29. Progress

## Types

```text
Linear
Circular
Determinate
Indeterminate
Stepped
```

## Requirements

- Determinate progress exposes current value, minimum, and maximum.
- Provide a text equivalent where useful.
- Use Stepper for discrete workflow stages.
- Do not use progress indicators as decorative animation.

---

# 30. AI Action Button

## Purpose

AI Action Button initiates an explicit AI-assisted action while keeping the user in control.

## Examples

```text
Summarize
Draft
Rewrite
Fix Grammar
Explain Data
Generate Report
Extract Information
Auto-Triage
Next Best Action
```

## Variants

```text
Primary AI
Secondary AI
Ghost AI
Icon AI
```

## States

```text
Idle
Generating
Streaming
Complete
Needs Review
Error
Cancelled
Unavailable
```

## Requirements

- Clearly communicate that the action is AI-assisted.
- Provide generation status.
- Allow cancellation when operations are lengthy.
- Preserve user-authored content.
- Provide edit, accept, reject, regenerate, and undo where applicable.
- Avoid implying certainty when output is probabilistic.
- Use the AI visual treatment consistently and sparingly.

---

# 31. AI Response Panel

## Purpose

AI Response Panel presents generated content, evidence, status, and human-review controls.

## Anatomy

```text
Header
AI status
Generated response
Sources or citations
Confidence or limitations
Feedback controls
Edit action
Accept action
Reject action
Regenerate action
```

## Requirements

- Identify generated content.
- Show sources where available.
- Support correction and human review.
- Preserve an audit trail for high-impact workflows.
- Clearly distinguish system content from user-authored content.
- Provide error and partial-result states.

---

# 32. AI Confidence Indicator

## Purpose

AI Confidence Indicator communicates model certainty only where the metric is meaningful and calibrated.

## Requirements

- Do not present arbitrary confidence values.
- Pair numeric confidence with explanatory language.
- Do not use color alone.
- Clarify whether confidence applies to a field, record, or complete response.
- Provide guidance for low-confidence outcomes.

---

# 33. File Upload

## Purpose

File Upload supports selecting, dropping, validating, and processing files.

## States

```text
Idle
Drag Active
Uploading
Processing
Complete
Warning
Error
Cancelled
```

## Requirements

- Support keyboard file selection.
- Communicate accepted formats and limits.
- Show per-file status when multiple files are uploaded.
- Provide retry and removal actions.
- Announce validation errors.
- Do not rely only on drag and drop.

---

# 34. Search Field

## Purpose

Search Field initiates or filters search results.

## Behavior models

```text
Submit search
Live filtering
Autocomplete
Command search
```

The selected model must be documented.

## Requirements

- Provide a visible or accessible label.
- Clear action must be accessible.
- Loading and no-results states must be supported.
- Debounce live search responsibly.
- Preserve user input during errors.

---

# 35. Menu and Dropdown

## Purpose

Menu presents a collection of actions. Dropdown is a general placement pattern and must use the correct internal semantics.

## Menu item types

```text
Action
Checkbox item
Radio item
Submenu
Separator
Label
```

## Requirements

- Use roving focus.
- Support Arrow keys, Enter, Space, Escape, Home, and End.
- Disabled items remain perceivable but not actionable.
- Do not use menu semantics for ordinary navigation lists without menu behavior.

---

# 36. Command Palette

## Purpose

Command Palette provides keyboard-first access to actions and destinations.

## Requirements

- Support search, grouping, and keyboard navigation.
- Clearly distinguish navigation from actions.
- Show shortcuts where available.
- Announce result count and active result.
- Preserve focus and return it on close.
- Support empty and loading states.

---

# 37. Component Storybook contract

Every stable component page must contain:

```text
Overview
Figma source
Purpose
Anatomy
Variants
Sizes
States
Properties
Behavior
Content guidance
Accessibility
Token references
Examples
Do and Don't
Change history
```

Every stable component must include stories for:

```text
Default
All variants
All sizes
All applicable states
Dark mode
Long content
Localization
Keyboard focus
Accessibility
Edge cases
```

---

# 38. Testing contract

## Unit

Test:

- rendering
- props
- events
- state transitions
- controlled and uncontrolled behavior

## Accessibility

Test:

- semantics
- accessible names
- keyboard interaction
- focus behavior
- ARIA state
- automated accessibility rules

## Visual regression

Test:

- variants
- sizes
- states
- themes
- density
- responsive layouts

## Integration

Use for:

- focus-managed overlays
- forms
- menus
- grids
- AI streaming
- upload workflows
- multi-component patterns

---

# 39. Component maturity

Use:

```text
Draft
Experimental
Beta
Stable
Deprecated
Removed
```

A component can be Stable only when:

- Figma is approved or published
- token mappings are complete
- code API is reviewed
- accessibility is validated
- tests pass
- Storybook documentation is complete
- Figma and code are synchronized
- changelog is updated

---

# 40. Claude Code update protocol

Before implementation, read:

```text
AGENTS.md
docs/figma-source.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/changelog.md
```

Then:

1. Read the latest `[Unreleased]` section.
2. Identify the exact component-specific Figma node.
3. Inspect the existing component, stories, tests, and token dependencies.
4. Compare only the documented delta.
5. Update only affected files.
6. Preserve existing APIs unless a breaking change is approved.
7. Run validation.
8. Report unresolved differences.
9. Never regenerate the entire design system.
10. Never invent missing Figma values or properties.

## Reusable prompt

```markdown
Read:

- `docs/figma-source.md`
- `docs/design-tokens.md`
- `docs/component-architecture.md`
- `docs/component-specifications.md`
- `docs/changelog.md`

Apply only the changes under `[Unreleased]`.

Use the component-specific Figma URL as the source of truth.
Update only affected tokens, component source, Storybook stories, tests, documentation, and exports.

Preserve existing APIs and unrelated files.
Do not regenerate the design system.
Do not infer missing values, states, variants, or behavior.

Run type checks, tests, accessibility checks, Storybook build, and visual regression checks.
Report changed files, validation results, and unresolved Figma-to-code differences.
```

---

# 41. Component specification template

```markdown
# [Component Name]

## Status
[Draft | Experimental | Beta | Stable | Deprecated]

## Figma source
- URL:
- Node ID:
- Component set:
- Last synchronized:

## Purpose

## When to use

## When not to use

## Anatomy

## Variants

## Sizes

## States

## Figma properties

## Property contract
Framework-neutral property names, types, and meanings.

## Reference implementation (React)
The current shipped implementation of the property contract above. Add one additional "Reference implementation ([Framework])" section per additional framework package once it ships.

## Behavior

## Content guidance

## Token dependencies

## Accessibility

## Responsive behavior

## Storybook stories

## Tests

## Code mapping

## Known limitations

## Change history
```

---

# 42. Current verification status

Verified from the supplied Figma Design Tokens node:

- foundation section structure
- typography sizes and line heights visible in the canvas
- spacing scale
- radius scale
- presence of color and scale documentation

Not yet verified:

- complete component inventory
- component-set node IDs
- component properties
- button sizes and measurements
- exact component color aliases
- component-specific token mappings
- component Code Connect mappings
- complete Light and Dark mode behavior

A component-specific Figma Dev Mode URL is required before Claude Code should implement or materially update that component.