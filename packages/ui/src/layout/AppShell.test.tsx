import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppShell, type NavItem } from "./AppShell";

const nav: NavItem[] = [
  { label: "Home", href: "/home", active: true },
  { label: "Settings", href: "/settings" }
];

describe("AppShell", () => {
  it("defaults to the sidebar variant and renders visible nav labels", () => {
    render(
      <AppShell nav={nav}>
        <p>Content</p>
      </AppShell>
    );
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("marks the active nav item with aria-current", () => {
    render(
      <AppShell nav={nav}>
        <p>Content</p>
      </AppShell>
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Settings" })).not.toHaveAttribute("aria-current");
  });

  it("renders the rail variant with icon-only nav items exposing labels via aria-label", () => {
    render(
      <AppShell nav={nav} variant="rail">
        <p>Content</p>
      </AppShell>
    );
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders header and footer content in both variants when provided", () => {
    const { rerender } = render(
      <AppShell nav={nav} header={<p>Header content</p>} footer={<p>Footer content</p>}>
        <p>Content</p>
      </AppShell>
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();

    rerender(
      <AppShell nav={nav} variant="rail" header={<p>Header content</p>} footer={<p>Footer content</p>}>
        <p>Content</p>
      </AppShell>
    );
    expect(screen.getByText("Header content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("omits header and footer when not provided, in either variant", () => {
    const { container } = render(
      <AppShell nav={nav}>
        <p>Content</p>
      </AppShell>
    );
    expect(container.querySelector("header")).not.toBeInTheDocument();
    expect(container.querySelector("footer")).not.toBeInTheDocument();
  });
});
