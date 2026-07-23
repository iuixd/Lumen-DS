import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "./Breadcrumb";
import * as PublicExports from "../../index";

describe("Breadcrumb", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Breadcrumb).toBe(Breadcrumb);
    expect(PublicExports.BreadcrumbList).toBeDefined();
    expect(PublicExports.BreadcrumbItem).toBeDefined();
    expect(PublicExports.BreadcrumbLink).toBeDefined();
    expect(PublicExports.BreadcrumbPage).toBeDefined();
    expect(PublicExports.BreadcrumbSeparator).toBeDefined();
    expect(PublicExports.BreadcrumbEllipsis).toBeDefined();
  });

  it("renders as a labeled nav landmark with its trail", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });
});
