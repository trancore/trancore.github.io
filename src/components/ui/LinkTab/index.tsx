import { Tab as HeadlessTab } from "@headlessui/react";
import { Link } from "@tanstack/react-router";

import type { To } from "~/types/route";
import { cn } from "~/utils/cn";

type Props = {
  text: string;
  to: To;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Tab({ text, to, isActive = false, onClick }: Props) {
  return (
    <Link to={to} onClick={onClick}>
      <HeadlessTab
        className={cn("py-2 text-2xl", "font-bold", "cursor-pointer", {
          "border-b-2": isActive,
        })}
      >
        {text}
      </HeadlessTab>
    </Link>
  );
}
