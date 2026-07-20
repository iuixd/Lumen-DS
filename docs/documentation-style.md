# Lumen Documentation Style

> Writing, structure, formatting, terminology, and maintenance standards for all **Lumen AI Design System** documentation.

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
docs/documentation-style.md
docs/changelog.md
```

---

# 1. Purpose

This document defines how Lumen documentation should be written, structured, reviewed, and maintained across:

- repository Markdown files
- Storybook Docs
- Figma descriptions and annotations
- component API references
- token documentation
- accessibility guidance
- release notes
- migration guides
- GitHub issues and pull requests
- AI coding-agent instructions

The goal is to make Lumen documentation consistent, searchable, implementation-ready, and understandable by designers, engineers, accessibility specialists, product teams, and AI coding agents.

---

# 2. Documentation principles

## 2.1 Write for action

Documentation should help a reader make a decision or complete a task.

Prefer:

```text
Use Button for actions that change application state.
```

Avoid:

```text
Buttons are commonly used throughout interfaces.
```

## 2.2 State requirements explicitly

Use clear requirement language.

```text
Must
Required
Do not
Use
Avoid
Recommended
Optional
```

Do not hide requirements inside descriptive paragraphs.

## 2.3 Separate fact from recommendation

Label information accurately.

```text
Verified from Figma
Required by Lumen
Recommended implementation
Example only
Not yet verified
Deprecated
```

Never present an assumption as a confirmed design-system rule.

## 2.4 Prefer semantic intent

Explain why a token or component exists, not only what it looks like.

Prefer:

```text
Color/Text/Danger communicates destructive or invalid states.
```

Avoid:

```text
This token is red.
```

## 2.5 Keep one authoritative location

Do not repeat complete specifications across multiple documents.

Link to the source document and summarize only what is needed locally.

## 2.6 Keep documentation synchronized

Documentation changes are part of the implementation, not follow-up work.

A component is not Stable until its documentation is complete.

---

# 3. Audience

Lumen documentation serves several audiences.

## Designers

Need:

- Figma source links
- token intent
- usage guidance
- component anatomy
- variants and states
- accessibility annotations
- design-review criteria

## Engineers

Need:

- public APIs
- token mappings
- behavior
- keyboard interactions
- implementation examples
- testing requirements
- package and import information

## Accessibility specialists

Need:

- semantic roles
- accessible-name sources
- focus behavior
- keyboard models
- announcements
- contrast requirements
- known limitations

## Product and content teams

Need:

- when to use
- when not to use
- content guidance
- workflow implications
- error and status language
- AI disclosure requirements

## AI coding agents

Need:

- source hierarchy
- exact file paths
- explicit constraints
- change scope
- prohibited actions
- validation commands
- expected output format

Write so that each audience can locate its relevant section quickly.

---

# 4. Voice and tone

Lumen documentation should sound:

```text
Clear
Professional
Direct
Technical
Calm
Specific
Neutral
Actionable
```

Avoid:

```text
Promotional language
Humor that obscures meaning
Vague adjectives
Unnecessary jargon
Conversational filler
Exaggeration
Unverified certainty
```

## Preferred voice

```text
Use semantic tokens for all production component colors.
```

## Avoid

```text
You will absolutely love how easy semantic tokens make everything.
```

---

# 5. Sentence style

## Use active voice

Preferred:

```text
The Dialog moves focus to the first meaningful control.
```

Avoid:

```text
Focus is moved to the first meaningful control by the Dialog.
```

Passive voice is acceptable when the actor is irrelevant.

## Keep sentences focused

Aim for one primary idea per sentence.

## Use present tense

Preferred:

```text
Button supports three sizes.
```

Avoid:

```text
Button will support three sizes.
```

Use future tense only for planned roadmap work.

## Avoid unnecessary qualifiers

Remove words such as:

```text
very
really
quite
basically
simply
just
obviously
clearly
```

## Avoid directional language without context

Avoid:

```text
Use the control on the right.
```

Prefer:

```text
Use the Apply filters button.
```

---

# 6. Terminology

Use the following terms consistently.

| Preferred term       | Avoid                                                                |
| -------------------- | -------------------------------------------------------------------- |
| design system        | UI kit, style guide, component set when referring to the full system |
| design token         | variable value, style value                                          |
| Figma Variable       | Figma token, unless explaining informally                            |
| component            | widget, element, module when referring to a defined Lumen component  |
| variant              | type, flavor                                                         |
| state                | mode, condition when describing interaction state                    |
| property             | option when referring to a Figma component property or code prop     |
| prop                 | property when discussing React APIs                                  |
| Light theme          | light mode when referring to the Lumen theme name                    |
| Dark theme           | dark mode when referring to the Lumen theme name                     |
| accessible name      | screen-reader label                                                  |
| assistive technology | accessibility software                                               |
| disabled             | inactive                                                             |
| read-only            | disabled when the control remains focusable or readable              |
| destructive          | dangerous                                                            |
| loading              | processing, unless the product language requires processing          |
| Storybook            | storybook                                                            |
| GitHub               | Github                                                               |
| TypeScript           | Typescript                                                           |
| JavaScript           | Javascript                                                           |
| Figma Dev Mode       | dev mode                                                             |
| Code Connect         | code connect                                                         |

## User interface terms

Use exact visible labels when referring to controls.

```text
Select Save.
Open Settings.
Choose Dark theme.
```

Do not wrap visible labels in quotation marks unless ambiguity requires it.

---

# 7. Capitalization

## Sentence case

Use sentence case for:

- headings
- navigation labels
- table headers
- component documentation titles
- button labels
- status labels

Preferred:

```text
Component anatomy
Design token usage
When not to use
```

Avoid:

```text
Component Anatomy
Design Token Usage
When Not To Use
```

## Product and technology names

Preserve official capitalization:

```text
Lumen
Figma
Storybook
GitHub
Claude Code
React
TypeScript
JavaScript
WCAG
ARIA
Code Connect
```

## Component names

Capitalize formal Lumen component names:

```text
Button
Dialog
Data Grid
AI Response Panel
```

Use lowercase when referring to the generic concept:

```text
Use a button for this action.
The Lumen Button supports seven theme-aware variants.
```

## Token names

Preserve exact token capitalization and separators:

```text
Color/Text/Primary
Spacing/16
Radius/lg
```

Do not normalize token names in prose.

---

# 8. Punctuation

## Periods

Use periods for complete sentences.

Do not add periods to:

- short labels
- table headings
- single-word list items
- code comments that are fragments

## Colons

Use a colon to introduce a list or example.

```text
Supported states:
```

## Commas

Use the serial comma for clarity.

```text
Designers, engineers, and accessibility specialists
```

## Dashes

Avoid em dashes in Lumen documentation.

Use:

- a period
- a colon
- parentheses
- a standard hyphen for compound words

Preferred:

```text
Spacing tokens define visual rhythm. They control padding, gaps, and layout density.
```

## Slashes

Use slashes only when they are part of:

- a token name
- a path
- an exact UI label
- a genuine either-or term

Avoid slash-heavy prose such as:

```text
designer/developer/user needs
```

---

# 9. Numbers and units

## Numerals

Use numerals for measurable values:

```text
16px
3 variants
2 themes
200% zoom
```

Spell out a number only when it starts a sentence.

## Units

Use a non-separated unit for technical values:

```text
16px
1rem
200ms
4.5:1
```

## Ranges

Use `to` in prose:

```text
The spacing scale runs from 0px to 128px.
```

Use an en dash only in compact tabular ranges when supported consistently:

```text
2026–2027
```

## Token values

Show exact values in code formatting:

```text
`Spacing/16` resolves to `16px`.
```

## Infinite radius

Document:

```text
`Radius/full` represents an infinite or pill radius. The implementation value is platform-specific.
```

Do not claim that the Figma source specifies `9999px`.

---

# 10. Markdown structure

## Page title

Each document starts with exactly one H1 **title**.

```markdown
# Lumen Component Specifications
```

Do not add a second title-level H1. Long governance documents then use
numbered `# N. Section name` headings for their body outline (see "Section
numbering" below) — these render as H1 for a flat, scannable table of
contents, but they are body sections, not additional document titles; the
"one H1" rule refers to the title only.

## Summary

Follow the title with one concise blockquote.

```markdown
> Engineering and design requirements for production Lumen components.
```

## Source metadata

Documents tied to Figma should include:

```markdown
## Source

- **Figma file:**
- **File key:**
- **Node:**
- **Dev Mode URL:**
- **Local Storybook:**
- **Last reviewed:**
```

## Heading hierarchy

Use headings sequentially:

```text
H1
H2
H3
H4
```

Do not skip from H2 to H4. In a numbered governance document, treat each
`# N. Section name` as the top of its own H1-H4 chain (its subsections start
at H2), not as a child of the document title.

## Section numbering

Use numbered H1-level sections for long governance documents:

```markdown
# 1. Purpose

# 2. Principles

# 3. Workflow
```

Use unnumbered sections for shorter component and token pages.

Do not mix numbered and unnumbered primary sections within the same document without a clear reason.

---

# 11. Paragraphs and lists

## Paragraphs

Keep paragraphs concise. Use one to four sentences for most documentation paragraphs.

## Bulleted lists

Use bullets for unordered requirements or attributes.

```markdown
- semantic role
- accessible name
- keyboard interaction
```

## Numbered lists

Use numbers only for sequences.

```markdown
1. Validate the Figma source.
2. Export the approved delta.
3. Run token validation.
```

## Checklist items

Use checklists only when completion status matters.

```markdown
- [ ] Figma node verified
- [ ] Accessibility tests pass
```

Do not use checklists for explanatory content.

## Parallel construction

Keep list items grammatically consistent.

Preferred:

```text
- validate aliases
- generate outputs
- update Storybook
```

Avoid:

```text
- aliases should be validated
- generating outputs
- Storybook update
```

---

# 12. Tables

Use tables for comparison, mapping, compact reference, and status.

Suitable uses:

- token values
- variant matrices
- role mappings
- status definitions
- Figma-to-code mappings
- release impact

Avoid tables when:

- cells contain several paragraphs
- content requires nested lists
- the table becomes difficult on narrow screens
- sequence matters

## Table style

```markdown
| Token       | Value | Usage                 |
| ----------- | ----: | --------------------- |
| `Spacing/8` | `8px` | Compact internal gaps |
```

Rules:

- use sentence case headers
- align numeric columns right
- format tokens and code as inline code
- keep cells concise
- include units
- do not use empty decorative columns

---

# 13. Code formatting

## Inline code

Use inline code for:

- token names
- prop names
- file names
- paths
- commands
- CSS custom properties
- literal values

Examples:

```text
`variant`
`docs/accessibility.md`
`--lumen-color-text-primary`
`pnpm build-storybook`
```

## Code blocks

Always specify the language.

````markdown
```tsx
<Button variant="primary">Save</Button>
```
````

Use:

```text
tsx
ts
js
css
json
yaml
bash
markdown
text
```

## Code examples

Examples must:

- use public APIs
- be syntactically valid
- include required imports when context is not obvious
- avoid hardcoded token-backed values
- demonstrate production-relevant usage
- preserve accessibility
- avoid deprecated APIs

## Before and after

Use explicit labels:

````markdown
### Before

```tsx
<Button quiet />
```
````

### After

```tsx
<Button variant="ghost" />
```

````

---

# 14. File and path references

Use repository-relative paths:

```text
`docs/accessibility.md`
`packages/tokens/src/semantic.json`
````

Do not use local machine paths such as:

```text
C:\Users\Name\Desktop\project
```

Use forward slashes in repository paths, including documentation written on Windows.

---

# 15. Links

## Link text

Use descriptive link text.

Preferred:

```markdown
See [Lumen accessibility requirements](./accessibility.md).
```

Avoid:

```markdown
Click [here](./accessibility.md).
```

## Figma links

Use the exact node-specific Dev Mode URL.

A component page should link to the component node, not only the design-system file root.

## Storybook links

Use the most specific stable story or Docs URL available.

Local URLs may be documented for development, but published documentation should also reference the deployed Storybook when available.

## Link maintenance

- avoid duplicate links in one section
- remove broken links
- update links when stories or files move
- use relative links for repository documentation
- do not expose private URLs in public documentation

---

# 16. Figma documentation

## Component descriptions

Every published component description should include:

```text
Purpose
When to use
When not to use
Required content
Variants
States
Accessibility
Known limitations
Code reference
```

## Variable descriptions

Every semantic or component variable should explain:

- what it represents
- where it should be used
- where it should not be used
- mode behavior when relevant

Preferred:

```text
Primary text used for headings and high-emphasis body content on default surfaces.
```

Avoid:

```text
Main dark text.
```

## Layer names

Use semantic layer names:

```text
Label
Leading icon
Supporting text
Focus ring
Loading indicator
```

Avoid:

```text
Frame 42
Group 8
Vector 12
```

## Annotations

Keep annotations concise and implementation-oriented.

```text
Keyboard: Enter and Space activate.
Focus: Returns to the trigger on close.
```

---

# 17. Token documentation

Each token category should document:

```text
Purpose
Naming model
Token layers
Values or aliases
Modes
Usage
Do
Do not
Accessibility
Implementation
Migration
Verification status
```

## Token naming examples

```text
Primitive: `Color/Blue/600`
Semantic: `Color/Action/Primary/Default`
Component: `Button/Primary/Background/Default`
Code: `--lumen-button-primary-background-default`
```

## Verification language

Use:

```text
Verified from Figma metadata
Verified from variable export
Recommended
Pending verification
Not represented in the supplied node
```

Do not state exact values when the source only confirms a section or label.

---

# 18. Component documentation

Use this order for stable component pages:

```text
Overview
When to use
When not to use
Anatomy
Variants
Sizes
States
Behavior
Content
Accessibility
Design tokens
API
Examples
Do and Don't
Responsive behavior
Known limitations
Related components
Figma source
Changelog
```

## Overview

One or two concise paragraphs.

## Usage guidance

Make guidance task-specific.

## Anatomy

Name only meaningful parts.

## Variants and states

Document supported combinations and prohibited combinations.

## Accessibility

Include:

- semantic role
- accessible-name source
- keyboard model
- focus behavior
- announcements
- target size
- reduced motion
- known assistive-technology limitations

## API documentation

For each public prop, document:

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

Avoid documenting private implementation props.

---

# 19. Storybook documentation

Read:

```text
docs/storybook-guidelines.md
```

## Story titles

Use predictable hierarchy:

```text
Foundations/Colors
Foundations/Typography
Components/Actions/Button
Components/Forms/Text Input
AI/AI Response Panel
```

Avoid:

```text
New Button
Button Final
Button Test
```

## Story names

Use semantic names:

```text
Default
Variants
Sizes
Loading
Disabled
Long content
Dark theme
Keyboard focus
```

## Docs pages

Keep the same section order across components.

Do not expose unsupported controls merely because Storybook can generate them.

## Customized Storybook UI

Documentation updates must preserve:

- Lumen branding
- navigation hierarchy
- dark background consistency
- typography hierarchy
- custom Docs layouts
- improved search and discovery

---

# 20. Accessibility writing

Accessibility documentation should be specific.

Preferred:

```text
When the Dialog opens, focus moves to the first meaningful control. Escape closes the Dialog and returns focus to the trigger.
```

Avoid:

```text
The Dialog is accessible.
```

## Alternative text guidance

Describe purpose, not every visual detail.

## Error messages

Use this structure:

```text
What happened
Why it matters
How to fix it
```

Example:

```text
Enter a valid email address, such as name@example.com.
```

Avoid blame:

```text
You entered the email incorrectly.
```

## Instructions

Do not rely only on:

- color
- direction
- shape
- position
- sound

---

# 21. AI documentation

AI component documentation must include:

```text
AI disclosure
User benefit
Inputs
Outputs
Generation states
Human review
Confidence
Evidence or citations
Privacy
Errors and partial results
Cancel and undo
Accessibility
```

## Confidence language

Avoid implying certainty.

Preferred:

```text
Confidence applies to the extracted field, not the entire document.
```

Avoid:

```text
The AI is 92% accurate.
```

unless the metric and methodology are explicitly defined.

## Generated content

Clearly distinguish:

- user-authored content
- AI-generated content
- AI-suggested edits
- approved content

---

# 22. Status language

Use a controlled status vocabulary.

## Component maturity

```text
Draft
In Progress
Beta
Stable
Deprecated
Experimental
Archived
```

## Review status

```text
Not Reviewed
In Review
Blocked
Approved with Conditions
Approved
Released
```

## Sync status

```text
Not Synced
Figma Ahead
Code Ahead
Partially Synced
Blocked
In Review
Synced
Deprecated
```

Do not create synonyms without updating the system-wide vocabulary.

---

# 23. Release notes and changelog

Use the established categories:

```text
Added
Changed
Deprecated
Removed
Fixed
Security
Accessibility
Migration
```

## Changelog entries

Describe user or consumer impact.

Preferred:

```text
Changed Button focus styling to use the semantic focus-ring token in Light and Dark themes.
```

Avoid:

```text
Updated button CSS.
```

## Breaking changes

State:

- what changed
- who is affected
- previous usage
- new usage
- migration deadline
- removal version

---

# 24. Warnings, notes, and callouts

Use callouts sparingly.

## Note

Use for useful supporting information.

```markdown
> **Note:** `Radius/full` represents a pill radius. Its code value is implementation-specific.
```

## Warning

Use for risk or release impact.

```markdown
> **Warning:** Renaming a public semantic token is a breaking change.
```

## Important

Use for mandatory behavior that readers may miss.

```markdown
> **Important:** Do not manually edit generated token files.
```

Do not use multiple callouts in succession.

---

# 25. Do and Don't examples

Use Do and Don't only when the contrast teaches a meaningful rule.

## Do

```text
Use semantic token names that describe purpose.
```

## Don't

```text
Name a token after its current hex value.
```

Rules:

- use equivalent scenarios
- explain the reason
- avoid shaming language
- make examples realistic
- ensure both examples are accessible

---

# 26. Dates, versions, and review metadata

Use ISO dates:

```text
2026-07-12
```

Use semantic versions:

```text
1.5.0
2.0.0-beta.1
```

Every governance document should include:

```text
Last reviewed
Owner, when assigned
Status, when applicable
```

Review dates should indicate an actual evidence review, not an automated file update.

---

# 27. Documentation ownership

Each document should have an accountable owner.

Suggested ownership:

| Document type      | Primary owner                       |
| ------------------ | ----------------------------------- |
| Token foundations  | Design-system designer              |
| Component behavior | Designer and engineer               |
| API reference      | Component engineer                  |
| Accessibility      | Accessibility owner                 |
| Storybook guidance | Storybook owner                     |
| Release process    | Release manager                     |
| Migration guide    | Engineer and documentation owner    |
| AI guidance        | AI product and design-system owners |

Ownership does not remove cross-functional review.

---

# 28. Documentation review checklist

## Accuracy

- [ ] Statements match Figma, code, or an identified standard.
- [ ] Assumptions are labeled.
- [ ] Exact values are verified.
- [ ] Links point to the correct nodes and stories.
- [ ] Public APIs match the implementation.
- [ ] Deprecated guidance is marked.

## Structure

- [ ] One H1 is used.
- [ ] Heading levels are sequential.
- [ ] Sections follow the standard order.
- [ ] Lists use parallel construction.
- [ ] Tables are readable.
- [ ] Code blocks specify a language.

## Language

- [ ] Sentences are direct.
- [ ] Requirements are explicit.
- [ ] Terminology is consistent.
- [ ] Sentence case is used.
- [ ] Em dashes are not used.
- [ ] Promotional or vague language is removed.
- [ ] Acronyms are explained on first use where needed.

## Accessibility

- [ ] Link text is descriptive.
- [ ] Images have appropriate alternative text.
- [ ] Instructions do not rely on sensory cues.
- [ ] Tables have clear headers.
- [ ] Code examples preserve accessibility.
- [ ] Reading order is logical.

## Maintenance

- [ ] Last-reviewed date is current.
- [ ] Changelog is updated when required.
- [ ] Related documents are linked.
- [ ] Duplicated specifications are removed.
- [ ] Known limitations are included.
- [ ] Storybook and repository documentation agree.

---

# 29. Standard document template

````markdown
# Lumen [Document name]

> One-sentence purpose.

## Source

- **Figma file:**
- **File key:**
- **Node:**
- **Dev Mode URL:**
- **Local Storybook:**
- **Last reviewed:**

## Related documents

```text
docs/example.md
```
````

---

# 1. Purpose

# 2. Principles

# 3. Requirements

# 4. Workflow

# 5. Validation

# 6. Checklist

# 7. Known limitations

# 8. Current verification status

````

Use only sections relevant to the document.

---

# 30. Standard component page template

```markdown
# [Component]

> Concise purpose.

## Overview

## When to use

## When not to use

## Anatomy

## Variants

## Sizes

## States

## Behavior

## Content

## Accessibility

## Design tokens

## API

## Examples

## Do and Don't

## Responsive behavior

## Known limitations

## Related components

## Figma source

## Changelog
````

---

# 31. Claude Code documentation protocol

Before editing Lumen documentation, Claude Code must read `CLAUDE.md`,
`AGENTS.md`, and `docs/project-governance.md`. `project-governance.md` §3
sets the authority order when documents conflict, and §4 lists which
additional documents are relevant per task type (documentation work
specifically reads `docs/documentation-style.md` and `docs/changelog.md`) —
consult it rather than reading every file in `docs/` for every edit. See
§33 below for why this document doesn't repeat that policy.

## Required behavior

1. Read the current `[Unreleased]` scope.
2. Identify the authoritative source for each statement.
3. Preserve verified facts.
4. Label recommendations and unresolved items.
5. Update only affected documents.
6. Use established terminology and section order.
7. Preserve repository-relative links.
8. Run available documentation and link checks.
9. Report contradictions instead of choosing silently.
10. Do not rewrite unrelated documents for stylistic preference.

## Reusable prompt

```markdown
Read `docs/project-governance.md` to determine which source documents are relevant to the requested change, then read `docs/documentation-style.md` and those documents.

Update only documentation affected by `[Unreleased]`.

Requirements:

- preserve verified facts
- label assumptions and recommendations
- use sentence case
- use direct, professional language
- avoid em dashes
- preserve exact token, component, prop, file, and package names
- use repository-relative paths
- include node-specific Figma links
- include accessibility behavior where relevant
- avoid duplicating complete specifications
- do not invent values or implementation details
- do not rewrite unrelated documents

After editing, report:

1. files changed
2. factual sources used
3. unresolved contradictions
4. links requiring verification
5. documentation checks completed
```

---

# 32. Current Figma verification status

The Figma metadata request for node `426:4395` succeeded.

Verified sections:

```text
01 Colors
02 Typography
03 Scale
04 Spacing
05 Radius
```

Verified visible documentation patterns include:

- numbered foundation sections
- section title and description
- token, value, and visual presentation for spacing
- named radius tokens and values
- named typography categories with size and line-height examples

The metadata does not verify:

- exact color names and values
- variable collections, aliases, scopes, or modes
- font families, weights, or letter spacing
- complete scale-token values
- component descriptions
- Storybook documentation content
- repository-specific writing conventions

Do not document these items as confirmed without direct Figma Variable, component, Storybook, or repository evidence.

---

# 33. Living documentation and governance writing

Lumen documentation is a living knowledge base.

When writing governance instructions:

- state which documents Claude Code should read
- identify when a recommendation is advisory
- include confirmation and Skip options
- separate recommendation from implementation
- state the consequence of skipping without using blocking language
- avoid presenting optional workflow steps as mandatory release gates
- link to `docs/project-governance.md` rather than duplicating the full governance policy

## Preferred confirmation language

```text
Recommended: Generate a local Figma-to-Storybook comparison before publishing.

Options:
1. Generate the report
2. Generate a limited report
3. Skip and continue
4. Cancel
```

## Avoid

```text
You must generate the report before continuing.
```

unless another governing document explicitly defines the step as a mandatory release gate.

## Documentation precedence language

Use:

```text
Follow the latest relevant living documentation. Report conflicts and request confirmation when they affect implementation.
```

Avoid:

```text
Always read every Markdown file before every action.
```

The preferred model is relevance-based loading governed by `docs/project-governance.md`.
