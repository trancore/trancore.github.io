import { TabGroup, TabList } from "@headlessui/react";
import { useRouterState } from "@tanstack/react-router";

import Icon from "~/components/common/Icon";
import LinkTab from "~/components/ui/LinkTab";
import { PAGE_PATH } from "~/consts";
import { useMediaQuery } from "~/hooks/useMeidaQuery";
import { cn } from "~/utils/cn";

type Props = {
  hamburgerMenu: {
    onClick: () => void;
  };
};

export default function Header({ hamburgerMenu }: Props) {
  const { isPC, isTablet } = useMediaQuery();
  const { location } = useRouterState();

  return (
    <header
      className={cn(
        "mx-auto max-w-7xl px-2 py-4",
        "flex items-center justify-between",
      )}
    >
      <h1 className={cn("font-bold text-2xl md:text-4xl")}>
        Trancore's Home Page
      </h1>
      {isPC || isTablet ? (
        <nav>
          <TabGroup>
            <TabList className={cn("flex gap-8")}>
              <LinkTab
                text="Home"
                to={PAGE_PATH.HOME}
                isActive={location.pathname === PAGE_PATH.HOME}
              />
              <LinkTab
                text="About"
                to={PAGE_PATH.ABOUT}
                isActive={location.pathname === PAGE_PATH.ABOUT}
              />
              <LinkTab
                text="Products"
                to={PAGE_PATH.PRODUCTS}
                isActive={location.pathname === PAGE_PATH.PRODUCTS}
              />
            </TabList>
          </TabGroup>
        </nav>
      ) : (
        <Icon type="BARS" size={48} onClick={hamburgerMenu.onClick} />
      )}
    </header>
  );
}
