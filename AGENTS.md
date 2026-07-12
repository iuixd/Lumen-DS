# AGENTS.md — Lumen Design System

This file governs how AI coding agents should work **inside this
repository**. See `CLAUDE.md` for the full set of hard rules (tokens,
component reuse, Figma taxonomy matching, Storybook/Changeset requirements)
and its "Documentation system" section for the full `docs/` index; the
instruction below applies on top of those.

## Maintaining the changelog

`docs/changelog.md` is the scope-control document for Figma-to-code
synchronization, not just a history log. Before starting any Figma-sourced
change, read its `[Unreleased]` section — that's the authorized scope.
After making the change, add an entry there (not in a separate file)
following its own "Change-entry format":

- affected token group or component
- Figma source (node ID/page)
- old value or behavior, new value or behavior
- affected code files and components
- migration requirement
- validation status
- the `.changeset/*.md` filename, if one was added

If an existing prop/variant already covered the new design and no new code
was needed, say so explicitly in the entry — that saves the next person
from re-deriving the decision.

This is in addition to, not instead of, `docs/figma-sync.md` (the
current-state reference — what's sourced from where, what's still
provisional) and each package's own Changeset-generated `CHANGELOG.md`
(release history, written when versions are actually cut).
