import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
  booleanAttribute
} from "@angular/core";

const toggleAssets = {
  sunLight: new URL("../assets/theme-toggle-sun-light.svg", import.meta.url).href,
  moonLight: new URL("../assets/theme-toggle-moon-light.svg", import.meta.url).href,
  sunDark: new URL("../assets/theme-toggle-sun-dark.svg", import.meta.url).href,
  moonDark: new URL("../assets/theme-toggle-moon-dark.svg", import.meta.url).href
};

/**
 * `<lumen-theme-toggle>` — Angular standalone implementation of
 * `ThemeToggle` (packages/ui/src/primitives/ThemeToggle.tsx), sourced from
 * the canonical AppShell variants (Lumen-AI-Design-System node 1007:3700;
 * ThemeToggle nodes 1079:1723 and 1330:2282). Mirrors the Web Components
 * package's exact 54×24px fixed two-cell Sun/Moon design in both modes.
 *
 * `checked`/`checkedChange` follows Angular's own two-way-binding idiom
 * (`[(checked)]`) rather than a bubbling custom event, matching this
 * framework's conventions elsewhere in the package (e.g.
 * `<lumen-split-button>`'s `(mainClick)`/`(dropdownClick)` outputs).
 * `aria-label` is read directly off the host element (same pattern
 * `<lumen-button>` already uses) rather than a separate `@Input()`, so a
 * plain `aria-label="…"` attribute on the host works without a binding.
 */
@Component({
  selector: "lumen-theme-toggle",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.checked]": "checked ? '' : null"
  },
  template: `
    <label part="track">
      <input
        type="checkbox"
        role="switch"
        [checked]="checked"
        [disabled]="disabled"
        [attr.aria-label]="resolvedAriaLabel"
        (change)="handleChange($event)"
      />
      <span class="icon-cell sun" aria-hidden="true">
        <img class="light-asset" [src]="toggleAssets.sunLight" alt="" />
        <img class="dark-asset" [src]="toggleAssets.sunDark" alt="" />
      </span>
      <span class="icon-cell moon" aria-hidden="true">
        <img class="light-asset" [src]="toggleAssets.moonLight" alt="" />
        <img class="dark-asset" [src]="toggleAssets.moonDark" alt="" />
      </span>
    </label>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    label {
      position: relative;
      display: inline-flex;
      height: var(--spacing-24);
      width: var(--spacing-54);
      flex-shrink: 0;
      cursor: pointer;
      align-items: center;
      overflow: hidden;
      border-radius: var(--radius-full);
      background-color: var(--color-app-shell-toggle-track);
    }

    label:has(input:focus-visible) {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 4px;
    }

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      opacity: 0;
    }

    .icon-cell {
      pointer-events: none;
      position: absolute;
      top: var(--spacing-2);
      display: flex;
      width: var(--spacing-20);
      height: var(--spacing-20);
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
    }

    .sun {
      left: var(--spacing-2);
    }
    .moon {
      left: var(--spacing-32);
    }
    .dark-asset {
      display: none;
    }
    :host([checked]) .light-asset {
      display: none;
    }
    :host([checked]) .dark-asset {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  `
})
export class LumenThemeToggleComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly toggleAssets = toggleAssets;

  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  get resolvedAriaLabel(): string {
    return this.elementRef.nativeElement.getAttribute("aria-label") ?? "Toggle dark theme";
  }

  handleChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(this.checked);
  }
}
