import type { Meta, StoryObj } from "@storybook/react";
import {
  ShadcnCard,
  ShadcnCardContent,
  ShadcnCardDescription,
  ShadcnCardFooter,
  ShadcnCardHeader,
  ShadcnCardTitle
} from "./ShadcnCard";
import { Button } from "../../primitives/Button";

const meta = {
  title: "Composite/ShadcnCard",
  component: ShadcnCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Card, sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Card` already fills this role; prefer `Card` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ShadcnCard className="w-[360px]">
      <ShadcnCardHeader>
        <ShadcnCardTitle>Create project</ShadcnCardTitle>
        <ShadcnCardDescription>Deploy your new project in one click.</ShadcnCardDescription>
      </ShadcnCardHeader>
      <ShadcnCardContent>
        <p className="text-body-sm">Card body content goes here.</p>
      </ShadcnCardContent>
      <ShadcnCardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </ShadcnCardFooter>
    </ShadcnCard>
  )
};

export const LongContent: Story = {
  render: () => (
    <ShadcnCard className="w-[360px]">
      <ShadcnCardHeader>
        <ShadcnCardTitle>Terms and conditions</ShadcnCardTitle>
      </ShadcnCardHeader>
      <ShadcnCardContent>
        {Array.from({ length: 5 }, (_, i) => (
          <p key={i} className="mb-2 text-body-sm last:mb-0">
            Paragraph {i + 1}: demonstrating a card with enough content to scroll the
            surrounding page, rather than the card itself.
          </p>
        ))}
      </ShadcnCardContent>
    </ShadcnCard>
  )
};
