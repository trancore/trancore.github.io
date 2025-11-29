import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import LinkButton from "./index";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a data-testid="link" data-to={to} href={to}>
      {children}
    </a>
  ),
}));

describe("components/common/Link/LinkButton", () => {
  it("リンクテキストが表示される", () => {
    render(<LinkButton text="Docs" to="/docs" />);

    expect(screen.getByText("Docs")).toBeTruthy();
  });

  it("デフォルトで bg-black が付与される", () => {
    render(<LinkButton text="Default" to="/default" />);

    const wrapper = screen.getByText("Default").parentElement;
    expect(wrapper?.className).toContain("bg-black");
  });

  it("backgroundColor を指定すると上書きされる", () => {
    render(
      <LinkButton text="Custom" to="/custom" backgroundColor="bg-blue-500" />,
    );

    const wrapper = screen.getByText("Custom").parentElement;
    expect(wrapper?.className).toContain("bg-blue-500");
  });

  it("Link に to が渡される", () => {
    render(<LinkButton text="Route" to="/route" />);

    expect(screen.getByTestId("link").getAttribute("data-to")).toBe("/route");
  });
});
