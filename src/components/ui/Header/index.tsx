import { TabGroup, TabList } from "@headlessui/react";

import Icon from "~/components/common/Icon";
import LinkTab from "~/components/common/Link/LinkTab";
import { PAGE_PATH } from "~/consts";
import { cn } from "~/utils/cn";

export default function Header() {
  const isPC = true;

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
      {isPC ? (
        <nav>
          <TabGroup>
            <TabList className={cn("flex gap-8")}>
              <LinkTab text="Home" to={PAGE_PATH.HOME} onClick={() => {}} />
              <LinkTab text="About" to={PAGE_PATH.ABOUT} onClick={() => {}} />
              <LinkTab
                text="Products"
                to={PAGE_PATH.PRODUCTS}
                onClick={() => {}}
              />
            </TabList>
          </TabGroup>
        </nav>
      ) : (
        <Icon type="BARS" size={32} />
      )}
    </header>
  );
}
