import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title as an h1", () => {
    render(<PageHeader title="Renewal pipeline" />);
    expect(screen.getByRole("heading", { level: 1, name: "Renewal pipeline" })).toBeInTheDocument();
  });

  it("renders breadcrumbs as a labeled navigation landmark with the last crumb marked current", () => {
    render(
      <PageHeader
        title="Renewal pipeline"
        breadcrumbs={[{ label: "Workspace", href: "#" }, { label: "Projects", href: "#" }, { label: "Renewal pipeline" }]}
      />
    );
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Workspace" })).toBeInTheDocument();
    expect(screen.getByText("Renewal pipeline", { selector: "span" })).toHaveAttribute("aria-current", "page");
  });

  it("renders description text when provided", () => {
    render(<PageHeader title="Renewal pipeline" description="Track all risk accounts." />);
    expect(screen.getByText("Track all risk accounts.")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(<PageHeader title="Renewal pipeline" actions={<button>Share</button>} />);
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });

  it("omits breadcrumbs nav when not provided", () => {
    render(<PageHeader title="Renewal pipeline" />);
    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).not.toBeInTheDocument();
  });
});
