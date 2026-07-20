import type { Meta, StoryObj } from "@storybook/react";
import { KPICard } from "./KPICard";

const meta = {
  title: "Primitives/KPICard",
  component: KPICard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'appshell-desktop-closed-light' reference screen (Lumen-AI-Design-System, node 1197:1652): a metric tile — label, large value, and an optional colored delta line."
      }
    }
  },
  argTypes: {
    deltaTone: { control: "select", options: ["success", "warning", "error"] }
  },
  args: {
    label: "Open renewals",
    value: "47",
    delta: "▲ 12% this quarter",
    deltaTone: "success"
  }
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Row: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-4">
      <KPICard label="Open renewals" value="47" delta="▲ 12% this quarter" deltaTone="success" />
      <KPICard label="At risk" value="9" delta="▲ 3 flagged" deltaTone="warning" />
      <KPICard label="Forecast ARR" value="$4.2M" delta="83% confidence" deltaTone="success" />
    </div>
  )
};

export const WithoutDelta: Story = {
  args: { delta: undefined }
};
