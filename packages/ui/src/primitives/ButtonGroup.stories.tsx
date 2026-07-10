import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "./Button";

const meta = {
  title: "Primitives/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Maps to Figma \"Button Groups\" — a connected row of buttons sharing borders, used for segmented actions (view toggles, bulk actions)."
      }
    },
    controls: { disable: true }
  },
  args: { children: null }
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="tertiary">List</Button>
      <Button variant="tertiary">Board</Button>
      <Button variant="tertiary">Calendar</Button>
    </ButtonGroup>
  )
};
