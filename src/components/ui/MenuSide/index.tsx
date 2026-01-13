import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import Icon from "~/components/common/Icon";
import { useMediaQuery } from "~/hooks/useMeidaQuery";
import { cn } from "~/utils/cn";

type Props = {
  menuItems: {
    id: string;
    title: string;
    items?: string[];
  }[];
  onClickMenuItem: (id: string) => void;
};

export default function MenuSide({ menuItems, onClickMenuItem }: Props) {
  const { isSP } = useMediaQuery();

  return isSP ? null : (
    <aside
      className={cn(
        "p-6",
        "flex flex-col items-start",
        "rounded-lg border-2 border-gray-100 shadow-xl",
      )}
    >
      {menuItems.map(({ id, title, items }) => (
        <DisclosureItem
          key={title}
          id={id}
          title={title}
          items={items}
          onClickMenuItem={onClickMenuItem}
        />
      ))}
    </aside>
  );
}

type DisclosureItemProps = Pick<
  Props["menuItems"][number],
  "id" | "title" | "items"
> &
  Pick<Props, "onClickMenuItem">;

function DisclosureItem({
  id,
  title,
  items,
  onClickMenuItem,
}: DisclosureItemProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton
            className={cn("py-2", "cursor-pointer font-bold")}
            onClick={() => onClickMenuItem(id)}
          >
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
