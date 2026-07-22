import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const toggleAssets = {
  sunLight: new URL("../assets/theme-toggle-sun-light.svg", import.meta.url).href,
  moonLight: new URL("../assets/theme-toggle-moon-light.svg", import.meta.url).href,
  sunDark: new URL("../assets/theme-toggle-sun-dark.svg", import.meta.url).href,
  moonDark: new URL("../assets/theme-toggle-moon-dark.svg", import.meta.url).href
};

/**
 * `<lumen-theme-toggle>` — Web Components implementation of `ThemeToggle`
 * (`packages/ui/src/primitives/ThemeToggle.tsx`), sourced from the Figma
 * canonical AppShell variants (Lumen-AI-Design-System node 1007:3700;
 * ThemeToggle nodes 1079:1723 and 1330:2282). A native `role="switch"`
 * drives the exact 54×24px fixed two-cell Sun/Moon design in both modes.
 *
 * Fires a bubbling, composed `lumen-change` `CustomEvent<{ checked: boolean }>`
 * on toggle — the native `<input>`'s own `change` event doesn't cross the
 * shadow boundary, matching the same reasoning already documented on
 * `<lumen-split-button>`'s `lumen-main-click`/`lumen-dropdown-click` events.
 */
@customElement("lumen-theme-toggle")
export class LumenThemeToggle extends LitElement {
  static styles = css`
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
    input:checked ~ .icon-cell .light-asset {
      display: none;
    }
    input:checked ~ .icon-cell .dark-asset {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ attribute: "aria-label" })
  ariaLabelOverride: string | null = null;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(
      new CustomEvent("lumen-change", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <label part="track">
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          aria-label=${this.ariaLabelOverride ?? "Toggle dark theme"}
          @change=${this._handleChange}
        />
        <span class="icon-cell sun" aria-hidden="true">
          <img class="light-asset" src=${toggleAssets.sunLight} alt="" />
          <img class="dark-asset" src=${toggleAssets.sunDark} alt="" />
        </span>
        <span class="icon-cell moon" aria-hidden="true">
          <img class="light-asset" src=${toggleAssets.moonLight} alt="" />
          <img class="dark-asset" src=${toggleAssets.moonDark} alt="" />
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lumen-theme-toggle": LumenThemeToggle;
  }
}
