import { TabGroup, TabList } from "@headlessui/react";
import { useRouterState } from "@tanstack/react-router";

import Icon from "~/components/common/Icon";
import LinkTab from "~/components/ui/LinkTab";
import { PAGE_PATH } from "~/consts";
import { cn } from "~/utils/cn";
import { useEffect } from "react";

type Props = {
  close: {
    onClick: () => void;
  };
};

/**
 * SPの時だけ表示するメニューコンポーネント
 */
export default function Menu({ close }: Props) {
  const { location } = useRouterState();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className={cn(
        "h-full w-dvw",
        "absolute z-50",
        "bg-gray-300/50",
        "overflow-hidden",
      )}
    >
      <div
        className={cn(
          "h-dvh w-4/5",
          "absolute right-0",
          "text-black dark:text-white",
          "bg-white dark:bg-black",
          "animate-fade-in-from-right",
        )}
      >
        <div className={cn("px-2 py-4", "flex justify-end")}>
          <Icon type="X_MARK" size={48} onClick={close.onClick} />
        </div>
        <div className={cn("mt-4 pl-6")}>
          <TabGroup>
            <TabList
              className={cn("gap-8", "flex flex-col")}
              onClick={close.onClick}
            >
              <LinkTab
                text="Home"
                to={PAGE_PATH.HOME}
                onClick={close.onClick}
                isActive={location.pathname === PAGE_PATH.HOME}
              />
              <LinkTab
                text="About"
                to={PAGE_PATH.ABOUT}
                onClick={close.onClick}
                isActive={location.pathname === PAGE_PATH.ABOUT}
              />
              <LinkTab
                text="Products"
                to={PAGE_PATH.PRODUCTS}
                onClick={close.onClick}
                isActive={location.pathname === PAGE_PATH.PRODUCTS}
              />
            </TabList>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
