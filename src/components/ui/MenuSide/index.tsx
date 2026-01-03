import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import Icon from "~/components/common/Icon";
import { cn } from "~/utils/cn";

type Props = {
  menuItems: {
    title: string;
    items?: string[];
  }[];
};

export default function MenuSide({ menuItems }: Props) {
  return (
    <aside
      className={cn(
        "p-6",
        "flex flex-col items-start",
        "rounded-lg border-2 border-gray-100 shadow-xl",
      )}
    >
      {menuItems.map(({ title, items }) => (
        <DisclosureItem key={title} title={title} items={items} />
      ))}
    </aside>
  );
}

type DisclosureItemProps = Pick<Props["menuItems"][number], "title" | "items">;

function DisclosureItem({ title, items }: DisclosureItemProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton className={cn("py-2", "cursor-pointer font-bold")}>
            <div className={cn("gap-2", "flex items-center")}>
              {title}
              {items &&
                items.length > 0 &&
                (open ? (
                  <Icon type="CHEVRON_UP" size={16} />
                ) : (
                  <Icon type="CHEVRON_DOWN" size={16} />
                ))}
            </div>
          </DisclosureButton>
          {items && items.length > 0 && (
            <DisclosurePanel
              className={cn("py-2 pl-2", "cursor-pointer")}
              as="ul"
            >
              {items.map((item) => (
                <li className={cn("py-1", "cursor-pointer")} key={item}>
                  {item}
                </li>
              ))}
            </DisclosurePanel>
          )}
        </>
      )}
    </Disclosure>
  );
}
