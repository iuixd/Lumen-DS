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
          'Sourced from the canonical AppShell light/dark variants (Lumen-AI-Design-System node 1007:3700; ThemeToggle nodes 1079:1723 and 1330:2282): an exact 54×24px two-cell Sun/Moon switch built on a native checkbox with role="switch".'
      }
    }
  },
  args: { name: "theme" }
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { checked: false },
  decorators: [
    (Story) => (
      <div data-theme="light">
        <Story />
      </div>
    )
  ]
};

export const Dark: Story = {
  args: { checked: true },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        className="bg-[var(--color-app-shell-background)] p-[var(--spacing-16)]"
      >
        <Story />
      </div>
    )
  ]
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [dark, setDark] = useState(false);
      return (
        <div
          data-theme={dark ? "dark" : "light"}
          className="bg-[var(--color-app-shell-background)] p-[var(--spacing-16)]"
        >
          <ThemeToggle name="theme" checked={dark} onChange={(e) => setDark(e.target.checked)} />
        </div>
      );
    }
    return <Demo />;
  }
};
