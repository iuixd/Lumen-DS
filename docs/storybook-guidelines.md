# Storybook Source

## Local Development

Primary Storybook URL

http://localhost:6006/?path=/docs/introduction--docs

This local Storybook is the implementation reference for the Lumen AI Design System.

It should always reflect the latest state of:

- Design Tokens
- Components
- Component APIs
- Accessibility
- Documentation
- Examples
- Enterprise Patterns

---

## Source of Truth Hierarchy

Lumen uses the following order of authority:

Published Figma Library
        ↓
Approved Figma Variables
        ↓
Design Token Export
        ↓
Lumen Storybook
        ↓
Production Components
        ↓
Application Implementations

Storybook represents the verified implementation of the approved Figma library.

---

## Storybook Responsibilities

Storybook must document every production-ready item including:

### Foundations

- Colors
- Typography
- Scale
- Spacing
- Radius
- Elevation
- Motion
- Borders
- Opacity
- Breakpoints

### Components

Every published component

Every supported variant

Every supported state

Every supported size

Accessibility guidance

Token usage

Implementation examples

---

## Storybook Branding

Unlike the default Storybook installation, the Lumen Storybook has been intentionally customized.

Do not replace or revert these customizations.

Maintain:

- Lumen branding
- Custom dark theme
- Navigation structure
- Typography hierarchy
- Background styling
- Component previews
- Documentation layout
- Information architecture

Any Storybook upgrade must preserve the customized user experience.

---

## Storybook Synchronization

Whenever Figma changes:

1. Update Design Tokens
2. Update Components
3. Update Stories
4. Update Documentation
5. Update Accessibility Notes
6. Run Storybook
7. Compare against Figma
8. Commit changes

Storybook must never lag behind the published Design System.

---

## Storybook Validation Checklist

Before merging changes:

✓ Storybook builds successfully

✓ No broken stories

✓ No console errors

✓ Accessibility tests pass

✓ Dark mode verified

✓ Mobile responsive

✓ Component APIs documented

✓ Design tokens synchronized

✓ Visual comparison with Figma completed

✓ Navigation still matches Lumen branding

---

## Claude Code Instructions

Before modifying Storybook:

Read:

- docs/figma-source.md
- docs/design-tokens.md
- docs/component-architecture.md
- docs/component-specifications.md
- docs/accessibility.md
- docs/storybook-guidelines.md
- docs/changelog.md

Open the local Storybook:

http://localhost:6006/?path=/docs/introduction--docs

Treat the local Storybook as the implementation reference.

Update only affected stories, documentation, controls, tests, and examples.

Never regenerate the complete Storybook.

Never remove Lumen branding or custom Storybook UI.

Preserve navigation, documentation structure, and developer experience.

After every update:

- Run Storybook
- Verify all changed stories
- Compare against Figma
- Report modified stories and validation results