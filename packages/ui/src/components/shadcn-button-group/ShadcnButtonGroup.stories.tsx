import type { Meta, StoryObj } from "@storybook/react";
import { ShadcnButtonGroup, ShadcnButtonGroupSeparator, ShadcnButtonGroupText } from "./ShadcnButtonGroup";
import { ShadcnButton } from "../shadcn-button/ShadcnButton";

const meta = {
  title: "Primitives/ShadcnButtonGroup",
  component: ShadcnButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own ButtonGroup, sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `ButtonGroup` already fills this role; prefer `ButtonGroup` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ShadcnButtonGroup>
      <ShadcnButton variant="outline">Left</ShadcnButton>
      <ShadcnButton variant="outline">Middle</ShadcnButton>
      <ShadcnButton variant="outline">Right</ShadcnButton>
    </ShadcnButtonGroup>
  )
};

export const WithSeparatorAndText: Story = {
  render: () => (
    <ShadcnButtonGroup>
      <ShadcnButton variant="outline">Copy</ShadcnButton>
      <ShadcnButtonGroupSeparator />
      <ShadcnButtonGroupText>Read-only</ShadcnButtonGroupText>
    </ShadcnButtonGroup>
  )
};

export const Vertical: Story = {
  render: () => (
    <ShadcnButtonGroup orientation="vertical">
      <ShadcnButton variant="outline">Top</ShadcnButton>
      <ShadcnButton variant="outline">Bottom</ShadcnButton>
    </ShadcnButtonGroup>
  )
};
