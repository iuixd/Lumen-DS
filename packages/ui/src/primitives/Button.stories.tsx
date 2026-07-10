import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { SearchIcon } from "../icons/generated";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sourced from the Figma 'Buttons' page (Lumen-DS-2027): Primary, Secondary, Tertiary, Link, each in xs/sm/md/lg. Extend with a new variant/prop instead of creating a new button component — see CONTRIBUTING.md."
      }
    }
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "link"]
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  args: {
    children: "Save changes",
    variant: "primary",
    size: "md",
    isLoading: false,
    disabled: false
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
};

export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconOnly size="xs" aria-label="Search">
        <SearchIcon className="size-3" />
      </Button>
      <Button iconOnly size="sm" aria-label="Search">
        <SearchIcon className="size-4" />
      </Button>
      <Button iconOnly size="md" aria-label="Search">
        <SearchIcon className="size-5" />
      </Button>
      <Button iconOnly size="lg" aria-label="Search">
        <SearchIcon className="size-5" />
      </Button>
    </div>
  )
};

export const Loading: Story = {
  args: { isLoading: true, children: "Saving" }
};

export const Disabled: Story = {
  args: { disabled: true }
};
