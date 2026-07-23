import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "./AspectRatio";
import * as PublicExports from "../../index";

describe("AspectRatio", () => {
  it("is exported from @lumen/ui's public entry point", () => {
    expect(PublicExports.AspectRatio).toBe(AspectRatio);
  });

  it("renders its children within the ratio wrapper", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span>content</span>
      </AspectRatio>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("applies the given ratio via padding-bottom on the wrapper", () => {
    const { container } = render(
      <AspectRatio ratio={2}>
        <span>content</span>
      </AspectRatio>
    );
    const wrapper = container.querySelector("[style]") as HTMLElement;
    expect(wrapper.style.paddingBottom).toBe("50%");
  });
});
