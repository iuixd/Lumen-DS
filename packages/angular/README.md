# @lumen/angular

Angular (standalone components) implementation of Lumen's component
specifications. This is Lumen's second non-React framework package — see
`docs/roadmap.md` Phase 13 — following `@lumen/web-components`. It currently
ships **Button only**.

## Angular version

Targets **Angular 20 (the current LTS)**, not the latest Angular major (22
at time of writing). Angular 22's `@angular/compiler-cli` requires
TypeScript `>=6.0 <6.1`, which conflicts with the TypeScript version
(`^5.5.4`, currently resolved to `5.9.3`) used across the rest of this
monorepo. Angular 20 requires `typescript >=5.8 <6.0`, which the repo's
existing resolved TypeScript version already satisfies — no isolated
second TypeScript install needed. Revisit this pin once the rest of the
monorepo moves to TypeScript 6.

## Usage

```ts
import { LumenButtonComponent } from "@lumen/angular";

@Component({
  standalone: true,
  imports: [LumenButtonComponent],
  template: `
    <lumen-button variant="primary" size="md">Save changes</lumen-button>
  `
})
export class MyComponent {}
```

```css
@import "@lumen/tokens/css";
```

Icon content uses Angular's native content-projection selectors, not React's
`iconStart`/`iconEnd` node props or Web Components' named `<slot>`s:

```html
<lumen-button>
  <span iconStart>…</span>
  Save changes
  <span iconEnd>…</span>
</lumen-button>
```

## Why classic `@Input()` decorators, not signal `input()`

This package uses `@Input()`/`OnChanges`, not Angular's newer signal-based
`input()`/`output()` functions — a testing-driven constraint, not a style
preference. Angular's JIT compiler (what `TestBed` uses for components that
aren't pre-compiled via `ngtsc`/AOT) needs a dedicated compiler AST
transform (`getInitializerApiJitTransform`) to recognize signal-based
`input()`/`output()` fields as component inputs. That transform only runs
inside a real TypeScript-compiler pipeline (`tsc`, `ts-jest`, `ngtsc`) — not
esbuild, which is what Vitest uses to transform TypeScript. Under plain
Vitest, a signal-input component fails at runtime with `NG0303: Can't set
value of the '...' input`, and any host template binding to it fails with
`Can't bind to '...' since it isn't a known property` — because Angular's
JIT compiler never learns the field is an input at all (see
[angular/angular#54013](https://github.com/angular/angular/issues/54013)).

Classic `@Input()` decorators don't have this problem — JIT reflects on the
decorator directly, no special transform required. The alternative fix
(`@analogjs/vite-plugin-angular`, which runs Angular's real compiler inside
Vite) requires `@angular/build`/`@angular-devkit/build-angular` as a peer
dependency — full Angular CLI build tooling — which would make this
package's tooling meaningfully heavier than `@lumen/ui` and
`@lumen/web-components`. Decorator-based inputs avoid that tradeoff
entirely for a one-component proof of concept. Revisit if/when this package
grows enough to justify the heavier toolchain, or if `getInitializerApiJitTransform`
becomes available as a standalone package.

## Change detection

Built and tested against `provideZonelessChangeDetection()` — no `zone.js`
dependency. `@Input()`-based components work identically under zoneless and
zone-based apps; consuming applications choose either.

## Testing

`pnpm --filter @lumen/angular test` runs Vitest + `TestBed` (JIT, zoneless)
against jsdom. Like the Web Components package, tests assert DOM structure,
reflected host attributes, and accessibility behavior rather than computed
CSS values — jsdom can't meaningfully resolve styles derived from CSS
custom properties, and those tokens aren't loaded in the test environment.

One real gotcha worth documenting: mutating a test host component's plain
property *after* an initial `fixture.detectChanges()` and then calling
`detectChanges()` again threw `NG0100: ExpressionChangedAfterItHasBeenCheckedError`
under zoneless `TestBed`, even though the mutate-then-redetect pattern is
completely standard in zone-based Angular tests. The reliable fix used here:
set all desired input state on the host **before** the first (and only)
`detectChanges()` call per test, rather than mutating and re-detecting.

## Storybook

Not yet covered — same open decision as `@lumen/web-components`; see
`docs/roadmap.md` Phase 13.
