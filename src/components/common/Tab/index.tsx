import { Tab as HeadlessTab } from "@headlessui/react";
import { cn } from "~/utils/cn";

type Props = {
  text: string;
  isActive?: boolean;
  onClick: () => void;
};

export default function Tab({ text, isActive = false, onClick }: Props) {
  return (
    <HeadlessTab
      className={cn("py-2", "font-bold", "cursor-pointer", {
        "border-b-2": isActive,
      })}
      onClick={onClick}
    >
      {text}
    </HeadlessTab>
  );
}
