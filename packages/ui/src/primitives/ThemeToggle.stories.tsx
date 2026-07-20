import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
  title: "Primitives/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Sourced from the final Figma ThemeToggle component set (Lumen-AI-Design-System, node 1126:4185): an exact 54×24px Sun/Moon theme switch with a white 20px selected circle in both modes, built on a native checkbox with role="switch".'
      }
    }
  },
  args: { name: "theme" }
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="inline-flex bg-[var(--color-background-default)] p-4">
        <Story />
      </div>
    )
  ]
};

export const FinalModeCollection: Story = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div className="grid gap-6 bg-[var(--color-background-subtle)] p-6 sm:grid-cols-2">
      <section
        data-theme="light"
        className="grid min-h-32 place-items-center rounded-lg bg-[var(--color-background-default)] p-6"
      >
        <div className="grid justify-items-center gap-3">
          <span className="text-label-sm text-[var(--color-text-muted)]">Light</span>
          <ThemeToggle name="light-theme" aria-label="Light theme selected" />
        </div>
      </section>
      <section
        data-theme="dark"
        className="grid min-h-32 place-items-center rounded-lg bg-[var(--color-background-default)] p-6"
      >
        <div className="grid justify-items-center gap-3">
          <span className="text-label-sm text-[var(--color-text-muted)]">Dark</span>
          <ThemeToggle name="dark-theme" aria-label="Dark theme selected" defaultChecked />
        </div>
      </section>
    </div>
  )
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [dark, setDark] = useState(false);
      return (
        <div
          data-theme={dark ? "dark" : "light"}
          className="inline-flex bg-[var(--color-background-default)] p-4"
        >
          <ThemeToggle name="theme" checked={dark} onChange={(e) => setDark(e.target.checked)} />
        </div>
      );
    }
    return <Demo />;
  }
};
