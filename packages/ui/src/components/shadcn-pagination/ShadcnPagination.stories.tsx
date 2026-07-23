import type { Meta, StoryObj } from "@storybook/react";
import {
  ShadcnPagination,
  ShadcnPaginationContent,
  ShadcnPaginationEllipsis,
  ShadcnPaginationItem,
  ShadcnPaginationLink,
  ShadcnPaginationNext,
  ShadcnPaginationPrevious
} from "./ShadcnPagination";

const meta = {
  title: "Composite/ShadcnPagination",
  component: ShadcnPagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "shadcn/ui's own Pagination, sourced and adapted to Lumen's token system — see docs/shadcn-integration.md. `Shadcn`-prefixed because Lumen's own `Pagination` already fills this role; prefer `Pagination` for direct product use. Dark mode follows the global `data-theme` toolbar toggle, not a separate story."
      }
    }
  }
} satisfies Meta<typeof ShadcnPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ShadcnPagination>
      <ShadcnPaginationContent>
        <ShadcnPaginationItem>
          <ShadcnPaginationPrevious href="#" />
        </ShadcnPaginationItem>
        <ShadcnPaginationItem>
          <ShadcnPaginationLink href="#">1</ShadcnPaginationLink>
        </ShadcnPaginationItem>
        <ShadcnPaginationItem>
          <ShadcnPaginationLink href="#" isActive>
            2
          </ShadcnPaginationLink>
        </ShadcnPaginationItem>
        <ShadcnPaginationItem>
          <ShadcnPaginationLink href="#">3</ShadcnPaginationLink>
        </ShadcnPaginationItem>
        <ShadcnPaginationItem>
          <ShadcnPaginationEllipsis />
        </ShadcnPaginationItem>
        <ShadcnPaginationItem>
          <ShadcnPaginationNext href="#" />
        </ShadcnPaginationItem>
      </ShadcnPaginationContent>
    </ShadcnPagination>
  )
};
