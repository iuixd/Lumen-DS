import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders as a footer landmark", () => {
    render(<Footer version="Lumen Platform v4.0" />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders version and status text when provided", () => {
    render(<Footer version="Lumen Platform v4.0" statusLabel="All systems normal" />);
    expect(screen.getByText("Lumen Platform v4.0")).toBeInTheDocument();
    expect(screen.getByText("All systems normal")).toBeInTheDocument();
  });

  it("renders links as real anchor elements", () => {
    render(<Footer links={[{ label: "Privacy", href: "/privacy" }]} />);
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("omits version and status when not provided", () => {
    render(<Footer />);
    expect(screen.queryByText(/Lumen Platform/)).not.toBeInTheDocument();
  });
});
