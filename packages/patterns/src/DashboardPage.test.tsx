import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardPage, type MetricCard } from "./DashboardPage";

const metrics: MetricCard[] = [
  { label: "Open renewals", value: "47", delta: "▲ 12% this quarter", deltaTone: "success" },
  { label: "At risk", value: "9", delta: "▲ 3 flagged", deltaTone: "warning" }
];

describe("DashboardPage", () => {
  it("renders the title and each metric's label/value", () => {
    render(<DashboardPage title="Overview" metrics={metrics} />);
    expect(screen.getByRole("heading", { level: 1, name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("Open renewals")).toBeInTheDocument();
    expect(screen.getByText("47")).toBeInTheDocument();
    expect(screen.getByText("At risk")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });

  it("renders breadcrumbs, description, and actions when provided", () => {
    render(
      <DashboardPage
        title="Renewal pipeline"
        metrics={metrics}
        breadcrumbs={[{ label: "Workspace", href: "#" }, { label: "Renewal pipeline" }]}
        description="Track all risk accounts."
        actions={<button>Share</button>}
      />
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Track all risk accounts.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <DashboardPage title="Overview" metrics={metrics}>
        <p>Custom content</p>
      </DashboardPage>
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });
});
