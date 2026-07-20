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
          "Sourced from the Figma 'appshell-desktop-closed-light' reference screen (Lumen-AI-Design-System, node 1197:1652): a Sun/Moon pill switch for Light/Dark theme, built on a native checkbox with role=\"switch\" — same accessible-toggle approach as Switch."
      }
    }
  },
  args: { name: "theme" }
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true }
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [dark, setDark] = useState(false);
      return <ThemeToggle name="theme" checked={dark} onChange={(e) => setDark(e.target.checked)} />;
    }
    return <Demo />;
  }
};
