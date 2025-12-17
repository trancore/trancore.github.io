import { Tab as HeadlessTab } from "@headlessui/react";

import { cn } from "~/utils/cn";

type Props = {
  text: string;
  /** 背景色。tailwindCSSのbg-xxxで指定可能 */
  backgroundColor?: string;
};

export default function Tab({ text, backgroundColor = "bg-white" }: Props) {
  return (
    <HeadlessTab
      className={cn(
        "px-3 py-1",
        "font-bold text-sm",
        `${backgroundColor} rounded-4xl`,
      )}
    >
      {text}
    </HeadlessTab>
  );
}
