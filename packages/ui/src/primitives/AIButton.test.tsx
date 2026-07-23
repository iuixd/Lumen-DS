import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AIButton } from "./AIButton";

describe("AIButton", () => {
  it("renders the default AI symbol and label", () => {
    render(<AIButton>AI Draft</AIButton>);
    const button = screen.getByRole("button", { name: "AI Draft" });
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it.each(["primary", "secondary", "ghost", "outline", "destructive"] as const)(
    "renders the canonical %s variant",
    (variant) => {
      render(<AIButton variant={variant}>AI Draft</AIButton>);
      expect(screen.getByRole("button", { name: "AI Draft" })).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg", "xl"] as const)("renders the canonical %s size", (size) => {
    render(<AIButton size={size}>AI Draft</AIButton>);
    expect(screen.getByRole("button", { name: "AI Draft" })).toBeInTheDocument();
  });

  it("keeps the loading label visible and blocks activation", async () => {
    const onClick = vi.fn();
    render(
      <AIButton isLoading onClick={onClick}>
        Generating...
      </AIButton>
    );
    const button = screen.getByRole("button", { name: "Generating..." });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Generating...");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("requires an accessible name for icon-only use", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<AIButton iconOnly />);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("accessible name"));
    warnSpy.mockRestore();
  });

  it("resolves the exact Figma capability label and icon", () => {
    render(<AIButton capability="summarize" />);
    const button = screen.getByRole("button", { name: "AI Summarize" });
    expect(button).toHaveAttribute("data-capability", "summarize");
    expect(button).toHaveAttribute("data-ai-analytics-event", "ai_button.summarize");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("uses a capability label as the icon-only accessible name", () => {
    render(<AIButton iconOnly capability="translate" />);
    expect(screen.getByRole("button", { name: "AI Translate" })).toBeInTheDocument();
  });

  it("lets explicit content and icon override capability defaults", () => {
    render(
      <AIButton capability="summarize" icon={<span data-testid="custom-icon" />}>
        Custom action
      </AIButton>
    );
    expect(screen.getByRole("button", { name: "Custom action" })).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it.each(["primary", "secondary", "outline"] as const)(
    "renders the canonical %s split button with two actions",
    async (variant) => {
      const onClick = vi.fn();
      const onDropdownClick = vi.fn();
      render(
        <AIButton
          split
          variant={variant}
          onClick={onClick}
          onDropdownClick={onDropdownClick}
        >
          AI Draft
        </AIButton>
      );
      await userEvent.click(screen.getByRole("button", { name: "AI Draft" }));
      await userEvent.click(screen.getByRole("button", { name: "More AI actions" }));
      expect(onClick).toHaveBeenCalledOnce();
      expect(onDropdownClick).toHaveBeenCalledOnce();
    }
  );
});
