import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnTooltip, ShadcnTooltipContent, ShadcnTooltipProvider, ShadcnTooltipTrigger } from "./ShadcnTooltip";
import { Button } from "../../primitives/Button";

const meta = {
  title: "Primitives/ShadcnTooltip",
  component: ShadcnTooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Tooltip (Radix Tooltip), sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Tooltip` already fills this role; prefer `Tooltip` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ShadcnTooltipProvider>
      <ShadcnTooltip>
        <ShadcnTooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </ShadcnTooltipTrigger>
        <ShadcnTooltipContent>Add to library</ShadcnTooltipContent>
      </ShadcnTooltip>
    </ShadcnTooltipProvider>
  )
};

export const OpenByDefault: Story = {
  render: () => (
    <ShadcnTooltipProvider>
      <ShadcnTooltip defaultOpen>
        <ShadcnTooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </ShadcnTooltipTrigger>
        <ShadcnTooltipContent>Shown open by default for visual review.</ShadcnTooltipContent>
      </ShadcnTooltip>
    </ShadcnTooltipProvider>
  )
};
