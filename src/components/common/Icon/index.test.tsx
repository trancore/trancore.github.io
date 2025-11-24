import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Icon from "./index";

describe("components/common/Icon", () => {
  it("デフォルトのサイズとカラーで Bars3Icon を描画する", () => {
    const { container } = render(<Icon type="BARS" />);
    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("class")).toContain("size-6");
    expect(svg?.getAttribute("class")).toContain("stroke-black");
  });

  it("size と color を上書きできる", () => {
    const { container } = render(
      <Icon type="BARS" size={48} color="stroke-white" />,
    );
    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("class")).toContain("size-12");
    expect(svg?.getAttribute("class")).toContain("stroke-white");
  });
});
