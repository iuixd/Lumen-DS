import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ShadcnPagination,
  ShadcnPaginationContent,
  ShadcnPaginationItem,
  ShadcnPaginationLink
} from "./ShadcnPagination";
import * as PublicExports from "../../index";

describe("ShadcnPagination", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnPagination).toBe(ShadcnPagination);
    expect(PublicExports.ShadcnPaginationContent).toBeDefined();
    expect(PublicExports.ShadcnPaginationItem).toBeDefined();
    expect(PublicExports.ShadcnPaginationLink).toBeDefined();
    expect(PublicExports.ShadcnPaginationPrevious).toBeDefined();
    expect(PublicExports.ShadcnPaginationNext).toBeDefined();
    expect(PublicExports.ShadcnPaginationEllipsis).toBeDefined();
  });

  it("renders as a labeled navigation landmark with page links", () => {
    render(
      <ShadcnPagination>
        <ShadcnPaginationContent>
          <ShadcnPaginationItem>
            <ShadcnPaginationLink href="#">1</ShadcnPaginationLink>
          </ShadcnPaginationItem>
          <ShadcnPaginationItem>
            <ShadcnPaginationLink href="#" isActive>
              2
            </ShadcnPaginationLink>
          </ShadcnPaginationItem>
        </ShadcnPaginationContent>
      </ShadcnPagination>
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument();
    expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
  });
});
