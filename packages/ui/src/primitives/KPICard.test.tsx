import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { KPICard } from "./KPICard";

describe("KPICard", () => {
  it("renders the label and value", () => {
    render(<KPICard label="Open renewals" value="47" />);
    expect(screen.getByText("Open renewals")).toBeInTheDocument();
    expect(screen.getByText("47")).toBeInTheDocument();
  });

  it("renders the delta line when provided", () => {
    render(<KPICard label="Open renewals" value="47" delta="▲ 12% this quarter" />);
    expect(screen.getByText("▲ 12% this quarter")).toBeInTheDocument();
  });

  it("omits the delta line when not provided", () => {
    render(<KPICard label="Open renewals" value="47" />);
    expect(screen.queryByText(/this quarter/)).not.toBeInTheDocument();
  });
});
