import type { Meta, StoryObj } from "@storybook/react";
import { Icon, type IconProps } from "./Icon";
import { iconRegistry } from "../icons/generated/registry";

const meta = {
  title: "Primitives/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Looks up a generated icon by name — for data-driven cases where the icon isn't known until render. Prefer importing the specific `{Name}Icon` component directly when the icon is static in JSX, so bundlers can tree-shake unused icons — this matters more than usual here: the registry below eagerly imports all ~1,920 icons, so any use of <Icon name> pulls the whole set into the bundle. Three sources feed this set: a curated Sharp/Light starter subset of the old Iconly library (not the full 1,949-icon set), the form-control state glyphs (checkbox/radio) from the current Lumen-DS-2027 Figma file's 'Icons' page, and 1,893 icons from that same file's much larger bulk icon library (Lucide-style generic icons, a curated Lumen-branded subset, and third-party brand logos rendered in their authentic colors rather than currentColor). See docs/figma-sync.md for the extraction workflow for all three."
      }
    }
  },
  argTypes: {
    name: { control: "select", options: Object.keys(iconRegistry) }
  },
  args: { name: "home" }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: IconProps) => <Icon {...args} className="size-6 text-[var(--color-text-title)]" />
};

export const AllIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {Object.keys(iconRegistry).map((name) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-md border border-[var(--color-border-default)] p-3">
          <Icon name={name} className="size-6 text-[var(--color-text-title)]" />
          <span className="text-label-sm text-[var(--color-text-muted)]">{name}</span>
        </div>
      ))}
    </div>
  )
};
