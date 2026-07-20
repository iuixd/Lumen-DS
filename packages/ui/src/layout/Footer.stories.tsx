import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sourced from the Figma 'appshell-desktop-closed-light' reference screen (Lumen-AI-Design-System, node 1197:1652, Footer instance 1102:6529): the app-shell bottom bar — platform version, a live-status indicator, and a trailing link row."
      }
    }
  },
  args: {
    version: "Lumen Platform v4.0",
    statusLabel: "All systems normal",
    statusTone: "success",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" }
    ]
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StatusTones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Footer version="Lumen Platform v4.0" statusLabel="All systems normal" statusTone="success" />
      <Footer version="Lumen Platform v4.0" statusLabel="Degraded performance" statusTone="warning" />
      <Footer version="Lumen Platform v4.0" statusLabel="Service outage" statusTone="error" />
    </div>
  )
};
