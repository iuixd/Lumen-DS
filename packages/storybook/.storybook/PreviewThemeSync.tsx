import { useEffect, useRef, type PropsWithChildren } from "react";
import { DocsContainer, type DocsContainerProps } from "@storybook/blocks";

const GLOBALS_UPDATED = "globalsUpdated";
const STORY_ARGS_UPDATED = "storyArgsUpdated";

interface GlobalsEventPayload {
  globals?: Record<string, unknown>;
}

interface StoryArgsUpdatedPayload {
  storyId?: string;
  args?: Record<string, unknown>;
}

function themeFromContext(context: DocsContainerProps["context"]): unknown {
  try {
    const { story } = context.resolveOf("story", ["story"]);
    return context.getStoryContext(story).globals.theme;
  } catch {
    return undefined;
  }
}

function addReloadButtons() {
  document.querySelectorAll<HTMLElement>(".sbdocs-preview").forEach((preview) => {
    if (preview.querySelector(".lumen-preview-reload")) return;

    const resetZoomButton = preview.querySelector<HTMLButtonElement>('button[title="Reset zoom"]');
    const toolbarIcons = resetZoomButton?.parentElement;
    if (!toolbarIcons) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "lumen-preview-reload";
    button.title = "Reload preview";
    button.setAttribute("aria-label", "Reload preview");
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M20 11a8 8 0 1 0-2.34 5.66" />
        <path d="M20 4v7h-7" />
      </svg>
    `;
    button.addEventListener("click", () => {
      const iframe = preview.querySelector<HTMLIFrameElement>("iframe");
      if (!iframe) return;

      try {
        iframe.contentWindow?.location.reload();
      } catch {
        iframe.src = iframe.src;
      }
    });
    toolbarIcons.append(button);
  });
}

/**
 * With `docs.story.inline: false`, each embedded preview is its own iframe.
 * That iframe's `withThemeByDataAttribute` decorator sets its *own*
 * `data-theme` from the globals it had at mount — toggling the toolbar
 * afterwards reaches the outer Docs document (handled below) but doesn't
 * reliably re-run inside iframes that already finished loading. Without
 * this, the iframe's own tokens (e.g. --color-text-title) stay on their
 * old value while only the outer `.sbdocs-preview` background (driven by
 * data-preview-theme) flips dark, making icons render in light-mode
 * (near-black) color against what only looks like a dark box.
 */
function applyIframeTheme(iframe: HTMLIFrameElement, theme: string) {
  try {
    const html = iframe.contentDocument?.documentElement;
    if (html && html.getAttribute("data-theme") !== theme) {
      html.setAttribute("data-theme", theme);
    }
  } catch {
    // Not yet navigated past about:blank, or (unexpectedly) cross-origin.
  }
}

function applyThemeToAllIframes(theme: string) {
  document.querySelectorAll<HTMLIFrameElement>(".sbdocs-preview iframe").forEach((iframe) => {
    applyIframeTheme(iframe, theme);
  });
}

const IFRAME_POLL_INTERVAL_MS = 300;
const IFRAME_POLL_ATTEMPTS = 30;

function wireIframeThemeSync(iframe: HTMLIFrameElement, currentTheme: () => string | undefined) {
  if (iframe.dataset.lumenThemeWired) return;
  iframe.dataset.lumenThemeWired = "true";

  // The iframe's `src` starts navigating the instant it's inserted, so a
  // one-shot `load` listener attached here can race the real navigation and
  // never fire again. Poll for a few seconds instead, re-asserting the
  // theme on the (possibly newly-swapped-in) document until it sticks.
  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;
    const theme = currentTheme();
    if (theme) applyIframeTheme(iframe, theme);
    if (attempts >= IFRAME_POLL_ATTEMPTS) window.clearInterval(interval);
  }, IFRAME_POLL_INTERVAL_MS);

  // The lumen-preview-reload button (and Storybook's own reload) re-navigate
  // the iframe later, well past the polling window — resume enforcing then.
  iframe.addEventListener("load", () => {
    const theme = currentTheme();
    if (theme) applyIframeTheme(iframe, theme);
  });
}

function storyIdFromIframe(iframe: HTMLIFrameElement): string | undefined {
  return iframe.id.startsWith("iframe--") ? iframe.id.slice("iframe--".length) : undefined;
}

function encodeArgValue(value: unknown): string {
  if (value === undefined || value === null) return "";
  return encodeURIComponent(String(value));
}

/**
 * Matches Storybook's own shareable-URL args format (`buildArgsParam` in
 * @storybook/router): `key:value;key2:value2`, percent-encoded values.
 * Storybook's args-from-URL restoration — a stable, widely used feature for
 * sharing story links with preset args — decodes and coerces this the same
 * way no matter where the URL came from, which is what makes reloading a
 * nested iframe with args baked into its `src` a safe way to apply changes.
 */
function buildArgsParam(args: Record<string, unknown>): string {
  return Object.entries(args)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}:${encodeArgValue(value)}`)
    .join(";");
}

/**
 * The Controls addon's args updates only reach the primary story; they
 * don't propagate into embedded (docs.story.inline: false) preview
 * iframes, which each run their own separate, unreachable preview/channel
 * instance — the same isolation that breaks theme sync above. There's no
 * supported way to poke React props directly across that boundary, so
 * reload the iframe with the new args encoded in its URL instead, mirroring
 * what happens when a user opens a shared Storybook link with args set.
 */
function applyIframeArgs(iframe: HTMLIFrameElement, args: Record<string, unknown>) {
  const argsParam = buildArgsParam(args);
  if (iframe.dataset.lumenArgs === argsParam) return;
  iframe.dataset.lumenArgs = argsParam;

  const url = new URL(iframe.src, window.location.href);
  // buildArgsParam already percent-encodes each value (colons/semicolons
  // stay literal, matching Storybook's own shareable-URL format) —
  // url.searchParams.set() would encode the whole string a *second* time,
  // turning e.g. "%20" into "%2520" and corrupting any arg with a space.
  url.searchParams.delete("args");
  const base = `${url.pathname}${url.search}`;
  const nextSrc = argsParam ? `${base}${url.search ? "&" : "?"}args=${argsParam}` : base;
  if (iframe.getAttribute("src") !== nextSrc) {
    iframe.setAttribute("src", nextSrc);
  }
}

// Controls fire on every keystroke/drag — batch rapid changes into one
// reload instead of thrashing the iframe on each intermediate value.
const ARGS_RELOAD_DEBOUNCE_MS = 500;

/** Mirrors Storybook's theme global onto the outer Docs document and every embedded preview iframe. */
export const PreviewThemeSync = ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
  const themeRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const applyTheme = (theme: unknown) => {
      if (theme === "light" || theme === "dark") {
        themeRef.current = theme;
        document.documentElement.setAttribute("data-preview-theme", theme);
        applyThemeToAllIframes(theme);
      }
    };

    // The manager URL is not the URL of the nested Docs iframe. The prepared
    // story context contains the globals Storybook resolved for this render.
    applyTheme(themeFromContext(context));

    const handleGlobals = (payload: GlobalsEventPayload) => applyTheme(payload.globals?.theme);
    context.channel.on(GLOBALS_UPDATED, handleGlobals);
    return () => context.channel.off(GLOBALS_UPDATED, handleGlobals);
  }, [context]);

  useEffect(() => {
    let debounceTimer: number | undefined;

    const handleArgsUpdated = ({ storyId, args }: StoryArgsUpdatedPayload) => {
      if (!storyId || !args) return;
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        document.querySelectorAll<HTMLIFrameElement>(".sbdocs-preview iframe").forEach((iframe) => {
          if (storyIdFromIframe(iframe) === storyId) applyIframeArgs(iframe, args);
        });
      }, ARGS_RELOAD_DEBOUNCE_MS);
    };

    context.channel.on(STORY_ARGS_UPDATED, handleArgsUpdated);
    return () => {
      window.clearTimeout(debounceTimer);
      context.channel.off(STORY_ARGS_UPDATED, handleArgsUpdated);
    };
  }, [context]);

  useEffect(() => {
    const sync = () => {
      addReloadButtons();
      document.querySelectorAll<HTMLIFrameElement>(".sbdocs-preview iframe").forEach((iframe) => {
        wireIframeThemeSync(iframe, () => themeRef.current);
      });
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return <DocsContainer context={context}>{children}</DocsContainer>;
};
