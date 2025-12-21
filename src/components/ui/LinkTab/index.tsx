import { Tab as HeadlessTab } from "@headlessui/react";
import { Link } from "@tanstack/react-router";

import type { To } from "~/types/route";
import { cn } from "~/utils/cn";

type Props = {
  text: string;
  to: To;
  isActive?: boolean;
};

export default function Tab({ text, to, isActive = false }: Props) {
  return (
    <Link to={to}>
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
