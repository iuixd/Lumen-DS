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
      expect(screen.getByRole("menu", { name: "More AI actions" })).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
        "AI Summarize",
        "AI Rewrite",
        "AI Fix Grammar",
        "AI Translate"
      ]);
      expect(screen.getByRole("button", { name: "AI Draft" })).toHaveClass("rounded-l-lg");
      expect(screen.getByRole("button", { name: "More AI actions" })).toHaveClass(
        "rounded-r-lg"
      );
      expect(onClick).toHaveBeenCalledOnce();
      expect(onDropdownClick).toHaveBeenCalledOnce();
    }
  );

  it("selects a dropdown capability and closes the menu", async () => {
    const onDropdownOptionSelect = vi.fn();
    render(<AIButton split onDropdownOptionSelect={onDropdownOptionSelect}>AI Draft</AIButton>);
    await userEvent.click(screen.getByRole("button", { name: "More AI actions" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "AI Rewrite" }));
    expect(onDropdownOptionSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "rewrite", label: "AI Rewrite" })
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("uses auto width and caps the visible menu at eight options", async () => {
    const dropdownOptions = [
      "summarize",
      "draft",
      "rewrite",
      "improve-clarity",
      "fix-grammar",
      "translate",
      "explain-data",
      "generate-report",
      "extract-info",
      "detect-trends"
    ] as const;
    render(
      <AIButton split dropdownOptions={dropdownOptions}>
        AI Draft
      </AIButton>
    );
    await userEvent.click(screen.getByRole("button", { name: "More AI actions" }));
    const menu = screen.getByRole("menu");
    expect(screen.getAllByRole("menuitem")).toHaveLength(10);
    expect(menu).toHaveClass("w-max", "overflow-y-auto");
    expect(menu).not.toHaveClass("w-[var(--spacing-200)]");
    expect(menu).toHaveStyle({
      maxHeight: "calc(var(--spacing-32) * 8 + var(--spacing-16))"
    });
  });

  it("supports arrow navigation and Escape in the dropdown menu", async () => {
    render(<AIButton split>AI Draft</AIButton>);
    const trigger = screen.getByRole("button", { name: "More AI actions" });
    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");
    const items = screen.getAllByRole("menuitem");
    expect(items[0]).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(items[1]).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
