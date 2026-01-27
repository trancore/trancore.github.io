import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import Icon from "~/components/common/Icon";
import { useDisplayed } from "~/hooks/useDisplayed";
import { useMediaQuery } from "~/hooks/useMeidaQuery";
import type { MenuSideItemsList } from "~/types/menu";
import { cn } from "~/utils/cn";
import type { ComponentProps } from "react";

type MenuSideItemsListId = MenuSideItemsList[number]["id"];
type Props = {
  menuItems: (MenuSideItemsList[number] & { items?: string[] })[];
  onClickMenuItem: (id: string) => void;
};

export default function MenuSide({ menuItems, onClickMenuItem }: Props) {
  const { displayed, toggleDisplayed } = useDisplayed();
  const { isSP } = useMediaQuery();

  function getIconPosition(id: MenuSideItemsListId) {
    switch (id) {
      case "github":
        return "right-32 bottom-2";
      case "musicplayer":
        return "right-20 bottom-20";
      case "lp":
        return "right-3 bottom-32";
      default:
        return "";
    }
  }
  function getIconType(
    id: MenuSideItemsListId,
  ): ComponentProps<typeof Icon>["type"] {
    switch (id) {
      case "github":
        return "GITHUB";
      case "musicplayer":
        return "MUSICAL_NOTE";
      case "lp":
        return "COMPUTER_DESKTOP";
    }
  }

  return isSP ? (
    <aside className={cn("fixed")}>
      {displayed &&
        menuItems.map(({ id }) => (
          <SmartPhoneFloatButton
            key={id}
            className={cn(
              `float-${id}`,
              `animate-float-${id}`,
              getIconPosition(id),
            )}
          >
            <Icon
              type={getIconType(id)}
              size={48}
              fillColor="fill-black"
              onClick={() => {
                onClickMenuItem(id);
                toggleDisplayed();
              }}
            ></Icon>
          </SmartPhoneFloatButton>
        ))}
      <SmartPhoneFloatButton className={cn("right-3 bottom-2")}>
        <Icon
          type="ELLIPSIS_VERTICAL"
          size={48}
          fillColor="fill-black"
          onClick={toggleDisplayed}
        ></Icon>
      </SmartPhoneFloatButton>
    </aside>
  ) : (
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

type SmartPhoneFloatButtonProps = {
  children: React.ReactNode;
  className?: string;
};

function SmartPhoneFloatButton({
  children,
  className,
}: SmartPhoneFloatButtonProps) {
  return (
    <div
      className={cn(
        "size-16",
        "fixed flex items-center justify-center",
        "rounded-full border-2 bg-white",
        className,
      )}
    >
      {children}
    </div>
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
