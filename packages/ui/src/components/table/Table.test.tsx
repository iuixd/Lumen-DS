import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import * as PublicExports from "../../index";

describe("Table", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.Table).toBe(Table);
    expect(PublicExports.TableHeader).toBeDefined();
    expect(PublicExports.TableBody).toBeDefined();
    expect(PublicExports.TableFooter).toBeDefined();
    expect(PublicExports.TableRow).toBeDefined();
    expect(PublicExports.TableHead).toBeDefined();
    expect(PublicExports.TableCell).toBeDefined();
    expect(PublicExports.TableCaption).toBeDefined();
  });

  it("renders a real <table> with headers, rows, and caption", () => {
    render(
      <Table>
        <TableCaption>A list of invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByText("INV001")).toBeInTheDocument();
    expect(screen.getByText("A list of invoices.")).toBeInTheDocument();
  });
});
