import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import { TextLink } from "../../primitives/TextLink";

const meta = {
  title: "Composite/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Rich-content preview panel shown on hover/focus, sourced from shadcn/ui (Radix HoverCard) and adapted to Lumen's token system — see docs/shadcn-integration.md. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <TextLink href="#">@lumen</TextLink>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-title-sm text-foreground">@lumen</h4>
          <p className="text-body-sm text-muted-foreground">
            The Lumen AI Design System — tokens, components, and patterns for enterprise SaaS.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
};

export const OpenByDefault: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <TextLink href="#">@lumen</TextLink>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-body-sm">Shown open by default for visual review.</p>
      </HoverCardContent>
    </HoverCard>
  )
};

export const LongContent: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <TextLink href="#">Read more</TextLink>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        {Array.from({ length: 4 }, (_, i) => (
          <p key={i} className="mb-2 text-body-sm last:mb-0">
            Paragraph {i + 1}: demonstrating a hover card with more content than its default
            16rem width comfortably fits.
          </p>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
};
