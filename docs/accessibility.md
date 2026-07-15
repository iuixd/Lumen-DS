# Lumen Accessibility

> Accessibility requirements for the **Lumen AI Design System** and its design tokens, components, Storybook documentation, and implementation workflow.

## Source

- **Figma file:** Lumen AI Design System
- **File key:** `GJBYRm6ySR7XIECFcHMgy2`
- **Design Tokens node:** `426:4395`
- **Dev Mode URL:** https://www.figma.com/design/GJBYRm6ySR7XIECFcHMgy2/Lumen-AI-Design-System?node-id=426-4395&m=dev
- **Last reviewed:** 2026-07-15

## Related documents

```text
AGENTS.md
docs/figma-source.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/accessibility.md
docs/changelog.md
```

## Standard

Lumen targets **WCAG 2.2 Level AA** as the minimum conformance level for production components and patterns.

Some products, clients, or jurisdictions may require stricter compliance. Where requirements differ, use the stricter applicable standard.

Accessibility is part of the component contract. It must be addressed in:

- Figma
- design tokens
- component specifications
- code
- Storybook
- testing
- documentation
- release review

---

# 1. Core principles

## 1.1 Perceivable

Information and controls must be available through more than one sensory channel.

Requirements include:

- sufficient color contrast
- text alternatives
- visible focus
- meaningful labels
- scalable text
- captions or transcripts for media
- status communication beyond color alone

## 1.2 Operable

All functionality must be usable with keyboard, assistive technology, touch, pointer, and switch input where applicable.

Requirements include:

- complete keyboard access
- logical focus order
- no keyboard traps
- sufficient target size
- dismissible overlays
- reduced-motion support
- enough time to complete tasks

## 1.3 Understandable

Interfaces must use predictable behavior, clear language, and actionable feedback.

Requirements include:

- consistent interaction patterns
- explicit labels
- clear errors
- prevention of destructive mistakes
- stable control placement
- understandable AI disclosures

## 1.4 Robust

Components must work with current and future assistive technologies.

Requirements include:

- semantic HTML
- correct names, roles, values, and states
- standards-based ARIA
- valid DOM relationships
- tested screen-reader behavior
- resilient responsive layouts

---

# 2. Accessibility ownership

## Designers own

- contrast-ready token choices
- visible focus designs
- logical reading and focus order
- accessible component states
- target sizing
- responsive and zoom behavior
- error and status communication
- reduced-motion alternatives
- annotations in Figma

## Developers own

- semantic HTML
- keyboard interaction
- focus management
- accessible names
- ARIA relationships
- live-region behavior
- runtime announcements
- reduced-motion implementation
- automated and manual testing

## Content designers own

- clear labels
- meaningful instructions
- concise error messages
- link purpose
- alternative text
- AI-generated content disclosures

## Product teams own

- inclusive requirements
- accessibility acceptance criteria
- testing with disabled users where appropriate
- remediation prioritization
- compliance evidence

---

# 3. Token accessibility requirements

Design tokens must enable accessible outcomes across themes, modes, and components.

## 3.1 Color tokens

Semantic color roles should include:

```text
Color/Text/Primary
Color/Text/Secondary
Color/Text/Disabled
Color/Text/Inverse

Color/Background/Default
Color/Background/Subtle
Color/Background/Inverse

Color/Border/Default
Color/Border/Strong
Color/Border/Focus

Color/Status/Info
Color/Status/Success
Color/Status/Warning
Color/Status/Danger

Color/Focus/Ring
```

### Contrast requirements

Use these minimum contrast targets:

| Use | Minimum contrast |
|---|---:|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Essential UI boundaries and graphical objects | 3:1 |
| Focus indicator against adjacent colors | 3:1 |
| Disabled content | No fixed WCAG contrast minimum, but it must remain perceivable and understandable |

Large text means at least:

- 24px regular weight, or
- 18.66px bold weight

### Color rules

- Do not communicate status using color alone.
- Pair status color with text, iconography, shape, or position.
- Validate every foreground and background pairing in Light and Dark modes.
- Validate hover, pressed, selected, disabled, and focus states independently.
- Do not assume a palette color is accessible merely because it is dark or saturated.
- Dark mode must use deliberate semantic mappings rather than inverted values.
- Data visualization colors must remain distinguishable for common color-vision deficiencies.

## 3.2 Typography tokens

The Figma source documents typography sizes and line heights for headings, body text, labels, utilities, captions, and code.

Accessibility requirements:

- Body text should generally use at least `Typography/Body/Sm`, with `Body/Md` preferred for sustained reading.
- Do not use `Label/Sm`, Overline, or Caption styles for long-form content.
- Line height must remain sufficient at 200% text zoom.
- Letter spacing must not be fixed in a way that prevents user overrides.
- Avoid all-uppercase text for long labels or paragraphs.
- Do not encode meaning through font weight alone.
- Ensure font files and weights used in Figma are available in Storybook and production.
- Text must not clip when users increase font size or browser zoom.

## 3.3 Spacing and target tokens

Lumen spacing uses an 8-point grid with 2px and 4px substeps.

Touch and pointer targets should meet or exceed:

```text
Minimum target: 24 × 24 CSS px
Preferred touch target: 44 × 44 CSS px
```

Small visible controls may use a larger invisible hit area when visual density requires it.

Use spacing tokens to ensure:

- adequate separation between adjacent controls
- sufficient room around focus indicators
- readable form grouping
- error messages do not overlap fields
- controls remain usable at 200% zoom

## 3.4 Radius

Radius does not directly determine accessibility, but it must not reduce clarity.

- Selected, pressed, and focus states must remain visually distinct.
- Pill shapes must not obscure the difference between labels and controls.
- Highly rounded containers must preserve content padding and hit area.
- Radius must not clip focus rings, text, or icons.

## 3.5 Focus tokens

Required focus tokens:

```text
Focus/Ring/Color
Focus/Ring/Width
Focus/Ring/Offset
Focus/Ring/Radius
```

Recommended baseline:

- visible on keyboard focus
- at least 2px effective thickness
- at least 3:1 contrast against adjacent colors
- not obscured by overflow clipping
- consistent across components
- distinguishable from selection and error states

## 3.6 Motion tokens

Required motion tokens:

```text
Motion/Duration/Instant
Motion/Duration/Fast
Motion/Duration/Moderate
Motion/Duration/Slow

Motion/Easing/Standard
Motion/Easing/Enter
Motion/Easing/Exit
```

Accessibility requirements:

- respect `prefers-reduced-motion`
- avoid unnecessary parallax, zoom, flashing, or continuous animation
- do not use animation as the only indication of state
- provide a non-animated alternative for essential status changes
- avoid content that flashes more than three times per second

---

# 4. Figma accessibility requirements

Every stable Figma component must document accessibility behavior.

## Required annotations

Each component should include:

```text
Semantic role
Accessible name source
Keyboard interaction
Focus entry and exit
Focus order
ARIA state or property
Status announcement
Error relationship
Target size
Reduced-motion behavior
Known limitations
```

## Layer order

Figma layer order should reflect intended reading order whenever practical.

Avoid using visual placement that implies a different reading order from the semantic structure.

## Component descriptions

Published components should describe:

- when to use
- when not to use
- required labels
- prohibited content
- keyboard model
- focus behavior
- screen-reader expectations
- accessibility dependencies

## Variants and states

Figma component sets should include applicable states:

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

Unsupported combinations should not be published.

## Figma limitations

Figma can document but cannot fully validate:

- semantic HTML
- actual tab order
- screen-reader announcements
- keyboard behavior
- DOM relationships
- browser zoom and reflow
- runtime focus management

These must be validated in Storybook and code.

---

# 5. Semantic HTML

Use native HTML elements whenever they provide the required behavior.

Preferred:

```html
<button>
<a href="">
<input>
<select>
<textarea>
<table>
<dialog>
<nav>
<main>
<header>
<footer>
```

Use ARIA only when native semantics are insufficient.

## Rules

- Do not use a clickable `<div>` when a button or link is appropriate.
- Do not add redundant roles to native elements.
- Do not use `aria-label` to replace visible labels where a visible label is expected.
- Keep DOM order aligned with visual and focus order.
- Do not hide focusable content from assistive technology.
- Do not put interactive controls inside other interactive controls.

---

# 6. Keyboard interaction

All interactive functionality must be keyboard operable.

## General keyboard rules

- Tab and Shift+Tab move between interactive controls.
- Enter activates links and applicable controls.
- Space activates buttons and toggles.
- Escape dismisses temporary overlays where appropriate.
- Arrow keys operate composite widgets according to their interaction pattern.
- Home and End should be supported where expected.
- Focus must not become trapped except intentionally inside modal dialogs.
- Keyboard interaction must not depend on hover.

## Composite widgets

Components such as Tabs, Menus, Radio Groups, Comboboxes, Trees, Grids, and Dialogs must use the established ARIA Authoring Practices interaction model unless documented otherwise.

---

# 7. Focus management

## Focus order

Focus order must follow the logical task flow and reading order.

Avoid positive `tabindex` values.

## Focus-visible

Use `:focus-visible` behavior where supported so keyboard users receive a clear indicator without unnecessarily showing it for every pointer interaction.

## Overlays

### Dialog

- move focus into the dialog when opened
- place focus on an appropriate control or heading
- trap focus for modal dialogs
- return focus to the trigger on close
- support Escape unless dismissal is intentionally restricted

### Popover and menu

- move focus according to the component interaction model
- close on Escape
- return focus to the trigger when appropriate

### Toast

- do not automatically move focus to a toast
- actionable toast controls must remain keyboard reachable
- announcements should use live regions

## Dynamic updates

After adding, deleting, filtering, or moving content, place or preserve focus intentionally.

Do not allow focus to disappear when the focused element is removed.

---

# 8. Accessible names and descriptions

Every interactive element needs a clear accessible name.

Name sources may include:

- visible text
- associated `<label>`
- `aria-labelledby`
- `aria-label` when no visible label is possible

Descriptions may use:

- visible supporting text
- `aria-describedby`
- error message references
- help text

## Rules

- Accessible names should match or begin with the visible label where practical.
- Icon-only controls require an accessible name.
- Repeated controls need contextual names, such as “Delete invoice 1048.”
- Placeholder text is not a label.
- Tooltips do not replace required labels.
- Avoid vague names such as “More” without context.

---

# 9. Forms and validation

## Labels

Every form control requires a visible label unless a documented pattern provides an equally clear accessible name.

## Instructions

Place general instructions before the form or relevant group.

## Required fields

Communicate required status:

- visually
- programmatically
- consistently

Do not rely only on an asterisk without explanation.

## Errors

Error messages should:

- identify the field
- explain the problem
- explain how to correct it
- avoid blame
- remain visible until resolved

Use:

```text
aria-invalid="true"
aria-describedby="[error-id]"
```

For submission errors:

- provide a summary when multiple fields fail
- move focus to the summary or first invalid field according to the pattern
- preserve user-entered data

## Prevention

For legal, financial, destructive, or high-impact actions, provide at least one of:

- review
- confirmation
- correction
- undo

---

# 10. Status and live regions

Dynamic updates should be announced only when users need the information.

## Polite announcements

Use for:

- saved confirmation
- loading completion
- result count changes
- background updates

## Assertive announcements

Reserve for urgent errors or interruptions.

## Rules

- Avoid announcing every keystroke or minor visual update.
- Do not duplicate visible and screen-reader output unnecessarily.
- Loading announcements should indicate both start and completion when meaningful.
- AI generation should announce progress states without flooding the user.

---

# 11. Images and icons

## Informative images

Provide concise alternative text describing purpose, not visual detail alone.

## Decorative images

Use empty alternative text or hide from assistive technology.

## Icons

- Decorative icons inside labeled controls should be hidden from assistive technology.
- Standalone icon controls require an accessible name.
- Status icons must be paired with text or an equivalent accessible label.
- Do not use unfamiliar icons without a text label or tooltip.

---

# 12. Links and navigation

## Link purpose

Link text should identify the destination or action.

Avoid:

```text
Click here
Read more
Learn more
```

unless context makes the purpose unambiguous.

## Navigation

- use landmarks
- provide a skip link
- identify the current page
- maintain consistent navigation order
- preserve visible keyboard focus
- differentiate links from surrounding text

## External links

When opening a new tab or external application, communicate the behavior where it may surprise users.

---

# 13. Tables and data grids

## Tables

Use semantic table markup for tabular relationships.

Requirements:

- identify row and column headers
- provide a caption or accessible name where useful
- expose sort state
- preserve logical reading order
- avoid using tables for layout

## Data grids

Data grids require a documented keyboard model.

Specify:

- focus model
- row and cell navigation
- selection behavior
- editing behavior
- sorting and filtering announcements
- virtualization behavior
- screen-reader strategy

Virtualization must not make content inaccessible or misrepresent row counts and positions.

---

# 14. Responsive design, zoom, and reflow

Interfaces must remain usable at:

- 200% text zoom
- 400% browser zoom where applicable
- narrow viewport widths equivalent to 320 CSS px

Requirements:

- no loss of content or functionality
- no unnecessary two-dimensional scrolling
- text wraps without clipping
- controls remain reachable
- overlays fit the viewport
- sticky content does not obscure focused elements
- error messages remain associated with fields

Horizontal scrolling is acceptable for content that inherently requires two dimensions, such as complex data tables.

---

# 15. Touch, pointer, and gestures

## Target size

- minimum target: 24 × 24 CSS px
- preferred target: 44 × 44 CSS px
- ensure sufficient spacing between adjacent targets

## Gestures

Any functionality requiring path-based or multipoint gestures must have a simpler alternative.

## Drag and drop

Provide keyboard and button-based alternatives for drag-and-drop actions.

## Hover

Do not place essential content or actions exclusively behind hover.

Hover and focus content must be:

- dismissible
- hoverable where necessary
- persistent long enough to use

---

# 16. Motion and animation

Respect the system preference:

```css
@media (prefers-reduced-motion: reduce) {
  /* remove or reduce non-essential motion */
}
```

## Requirements

- avoid large-area motion triggered by interaction
- avoid auto-playing animation that cannot be paused
- keep state transitions short and purposeful
- do not use motion as the sole status cue
- provide static progress or state alternatives
- avoid rapid flashing

Loading spinners, toast timers, skeletons, and AI streaming indicators must have reduced-motion behavior.

---

# 17. Content accessibility

Use clear, direct, and specific language.

## Labels

- use action-oriented button labels
- use nouns for navigation destinations
- keep terminology consistent
- avoid unexplained abbreviations
- do not use directional language alone, such as “click the button on the right”

## Errors

Use this pattern:

```text
What happened
Why it matters
How to fix it
```

## Instructions

Do not rely on:

- color
- shape
- position
- sensory description alone

## Reading level

Prefer plain language for user-facing content unless specialist terminology is necessary for the audience.

---

# 18. AI accessibility

Lumen AI components must be accessible, understandable, and controllable.

## Disclosure

Users should understand when:

- an action uses AI
- content is AI-generated
- an output may require review
- confidence or evidence is limited

## Generated content

Generated content should:

- be available as selectable text
- preserve heading and list structure
- identify sources where available
- distinguish user-authored and AI-generated content
- support editing and correction
- not automatically replace user content without confirmation

## AI status

Support accessible states:

```text
Idle
Generating
Streaming
Complete
Needs Review
Low Confidence
Error
Cancelled
Unavailable
```

Status announcements should be concise and non-repetitive.

## Human control

Where relevant, provide:

```text
Accept
Reject
Edit
Regenerate
Undo
Cancel
View sources
Provide feedback
```

## Confidence

Do not rely on color alone or show misleading precision.

Explain what confidence applies to and what users should do when confidence is low.

---

# 19. Component requirements

## Button

- native button for actions
- visible focus
- keyboard activation
- accessible icon-only label
- loading announcement where meaningful
- disabled behavior prevents activation
- navigation uses a link, not a button

## Input

- visible label
- placeholder does not replace label
- error association
- accessible clear or reveal action
- disabled and read-only are distinct

## Select and Combobox

- correct semantics
- documented arrow-key interaction
- announced active option
- loading and no-result status
- Escape closes without unexpected data loss

## Checkbox

- label is clickable
- checked and indeterminate states are programmatic
- group label is provided
- state does not rely on color

## Radio Group

- one tab stop for the group
- Arrow keys change selection
- visible and programmatic group label

## Switch

- label describes the setting
- checked state is exposed
- use only for immediate state changes

## Dialog

- accessible name
- focus moved inside
- modal focus containment
- focus returned on close
- Escape behavior documented

## Tooltip

- available on hover and focus
- dismissible with Escape
- not used for essential content
- non-interactive unless implemented as Popover

## Toast

- announced through appropriate live region
- does not steal focus
- sufficient reading time
- pause or persist when actionable

## Tabs

- correct tab and tabpanel relationships
- Arrow-key navigation
- selected state exposed
- activation model documented

## Data Grid

- complete keyboard model
- selection and editing states announced
- virtualization tested with assistive technology
- sort and filter changes announced

---

# 20. Storybook accessibility requirements

Every stable component must include:

- accessibility documentation
- keyboard usage
- screen-reader expectations
- visible focus story
- high-contrast or forced-colors review
- Light and Dark mode review
- long-text example
- 200% zoom review
- error and status examples
- reduced-motion example where applicable

Recommended tooling:

```text
@storybook/addon-a11y
axe-core
Testing Library
Playwright
visual regression testing
```

Automated checks do not replace manual testing.

---

# 21. Testing matrix

## Automated

Run:

- semantic and ARIA checks
- color contrast checks
- accessible-name checks
- duplicate ID checks
- keyboard event tests
- focus tests
- Storybook accessibility scans

## Manual keyboard

Verify:

- Tab order
- Shift+Tab
- Enter
- Space
- Escape
- Arrow keys
- Home and End
- no keyboard traps
- focus restoration

## Screen reader

Test critical components with at least:

```text
NVDA + Chrome or Firefox
VoiceOver + Safari
```

Use additional combinations when product requirements demand them.

## Visual

Verify:

- 200% text zoom
- 400% browser zoom
- narrow viewport
- Dark mode
- forced-colors mode
- high contrast
- visible focus
- reduced motion
- localization expansion

## User testing

For high-impact enterprise workflows, include disabled users in evaluative research where practical.

---

# 22. Accessibility acceptance criteria

A component cannot be marked Stable until:

- [ ] Semantic role is defined.
- [ ] Accessible name is defined.
- [ ] Keyboard model is documented and implemented.
- [ ] Focus behavior is documented and implemented.
- [ ] Relevant ARIA states are correct.
- [ ] Contrast passes in all supported modes.
- [ ] Focus indicator passes contrast and visibility checks.
- [ ] Target size is adequate.
- [ ] Text works at 200% zoom.
- [ ] Layout reflows at narrow widths.
- [ ] Error and status messages are programmatically associated.
- [ ] Reduced motion is supported.
- [ ] Automated accessibility checks pass.
- [ ] Manual keyboard testing passes.
- [ ] Screen-reader testing passes for critical interactions.
- [ ] Storybook accessibility documentation is complete.
- [ ] Known limitations are documented.
- [ ] `changelog.md` records accessibility-impacting changes.

---

# 23. Accessibility issue severity

Use the following severity model.

## Critical

Prevents access to a core task.

Examples:

- keyboard trap
- inaccessible authentication
- missing accessible name on a critical action
- screen-reader user cannot complete the workflow

## High

Creates a major barrier with no reasonable workaround.

Examples:

- modal focus is lost
- form errors are not announced
- insufficient contrast across primary content
- data grid is unusable by keyboard

## Medium

Creates difficulty but a workaround exists.

Examples:

- unclear link text
- inconsistent focus restoration
- target size below preferred minimum
- non-critical status not announced

## Low

Minor usability or documentation issue.

Examples:

- overly verbose alternative text
- minor heading hierarchy problem
- inconsistent accessibility annotation

Critical and High issues block release.

---

# 24. Figma accessibility review checklist

Before publishing a component:

- [ ] Component has visible focus state.
- [ ] Text and icons use semantic tokens.
- [ ] Contrast has been checked in all modes.
- [ ] States do not rely on color alone.
- [ ] Target sizes are documented.
- [ ] Reading order is logical.
- [ ] Keyboard behavior is annotated.
- [ ] Accessible name source is documented.
- [ ] Error and status behavior is documented.
- [ ] Reduced-motion behavior is documented.
- [ ] Long text and localization are demonstrated.
- [ ] Component-specific accessibility limitations are listed.

---

# 25. Claude Code accessibility protocol

Before modifying an accessible component, Claude Code must read:

```text
AGENTS.md
docs/figma-source.md
docs/design-tokens.md
docs/component-architecture.md
docs/component-specifications.md
docs/accessibility.md
docs/changelog.md
```

Then:

1. Read the latest `[Unreleased]` change scope.
2. Identify accessibility effects of the requested change.
3. Preserve native semantics and established keyboard behavior.
4. Update only affected components, tests, stories, and documentation.
5. Add or update accessibility tests.
6. Run automated checks and relevant manual-test instructions.
7. Report unresolved accessibility risks.
8. Never remove accessible behavior to match a purely visual Figma state.
9. Never infer missing semantics from appearance alone.
10. Do not regenerate unrelated components.

## Reusable Claude Code prompt

```markdown
Read:

- `docs/figma-source.md`
- `docs/design-tokens.md`
- `docs/component-architecture.md`
- `docs/component-specifications.md`
- `docs/accessibility.md`
- `docs/changelog.md`

Apply only the changes listed under `[Unreleased]`.

Preserve WCAG 2.2 AA requirements, native semantics, keyboard behavior, focus management, accessible names, status announcements, reduced-motion behavior, and existing public APIs.

Update only affected component source, tokens, Storybook stories, accessibility tests, documentation, and exports.

Do not regenerate the design system.
Do not modify unrelated files.
Do not infer semantics from visual appearance alone.

Run type checks, unit tests, accessibility tests, Storybook build, and available visual-regression checks.

Report:
1. files changed
2. accessibility behavior changed
3. tests completed
4. remaining manual checks
5. unresolved accessibility risks
```

---

# 26. Current Figma verification status

Verified from the supplied Figma node:

- Colors section exists
- Typography section exists
- Scale section exists
- Spacing section exists
- Radius section exists
- visible typography sizes and line heights
- documented spacing scale
- documented radius scale

Not verified from this foundation node:

- exact color contrast pairs
- semantic color aliases
- focus-ring values
- target sizes for components
- component keyboard behavior
- accessible names
- ARIA mappings
- component-specific states
- reduced-motion values
- complete Light and Dark mode mappings

These items require direct inspection of Figma Variables and component-specific Dev Mode nodes, followed by validation in code and Storybook.