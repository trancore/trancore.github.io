import { TabGroup, TabList } from "@headlessui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Tab from "./index";

describe("components/common/Tab", () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <TabGroup>
        <TabList>{ui}</TabList>
      </TabGroup>,
    );
  };

  it("テキストを表示する", () => {
    renderWithProviders(<Tab text="Home" isActive onClick={() => {}} />);
    const el = screen.getByText("Home");
    expect(el).toBeTruthy();
  });

  it("isActive=true のとき active スタイルが付与される", () => {
    renderWithProviders(<Tab text="Active" isActive onClick={() => {}} />);
    const tab = screen.getByText("Active");
    expect(tab.classList.contains("border-b-2")).toBe(true);
  });

  it("isActive=false のとき active スタイルが付与されない", () => {
    renderWithProviders(
      <Tab text="Inactive" isActive={false} onClick={() => {}} />,
    );
    const tab = screen.getByText("Inactive");
    expect(tab.classList.contains("border-b-2")).toBe(false);
  });

  it("クリックで onClick が呼ばれる", () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <Tab text="Click" isActive={false} onClick={handleClick} />,
    );
    const tab = screen.getByText("Click");
    fireEvent.click(tab);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
