import { TabGroup, TabList } from "@headlessui/react";
import { Link } from "@tanstack/react-router";
import Icon from "~/components/common/Icon";
import Tab from "~/components/common/Tab";
import { PAGE_PATH } from "~/consts";
import { cn } from "~/utils/cn";

export default function Header() {
  const isPC = true;

  return (
    <header
      className={cn(
        "px-2 py-4 mx-auto max-w-7xl",
        "flex items-center justify-between",
      )}
    >
      <h1 className={cn("font-bold text-2xl md:text-4xl")}>Kosuke Iwasaki</h1>
      {isPC ? (
        <nav>
          <TabGroup>
            <TabList className={cn("flex gap-8")}>
              <Link to={PAGE_PATH.HOME}>
                <Tab text="Home" onClick={() => {}} />
              </Link>
              <Link to={PAGE_PATH.ABOUT}>
                <Tab text="About" onClick={() => {}} />
              </Link>
              <Link to={PAGE_PATH.PRODUCTS}>
                <Tab text="Products" onClick={() => {}} />
              </Link>
            </TabList>
          </TabGroup>
        </nav>
      ) : (
        <Icon type="BARS" size={32} />
      )}
    </header>
  );
}
