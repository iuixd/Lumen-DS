import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ShadcnAvatar, ShadcnAvatarFallback, ShadcnAvatarImage } from "./ShadcnAvatar";
import * as PublicExports from "../../index";

describe("ShadcnAvatar", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.ShadcnAvatar).toBe(ShadcnAvatar);
    expect(PublicExports.ShadcnAvatarImage).toBeDefined();
    expect(PublicExports.ShadcnAvatarFallback).toBeDefined();
  });

  // jsdom never fires a real image load event, so Radix Avatar renders its
  // fallback — the same behavior a real broken-image URL would produce.
  it("renders the fallback when the image hasn't loaded", () => {
    render(
      <ShadcnAvatar>
        <ShadcnAvatarImage src="https://example.com/avatar.png" alt="User" />
        <ShadcnAvatarFallback>LU</ShadcnAvatarFallback>
      </ShadcnAvatar>
    );
    expect(screen.getByText("LU")).toBeInTheDocument();
  });
});
