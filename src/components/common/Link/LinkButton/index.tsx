import { Link } from "@tanstack/react-router";
import type { To } from "~/types/route";
import { cn } from "~/utils/cn";

type Props = {
  text: string;
  to: To;
  /** 背景色。tailwindCSSのbg-xxxで指定可能 */
  backgroundColor?: string;
};

export default function LinkButton({
  text,
  to,
  backgroundColor = "bg-black",
}: Props) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 w-fit",
        `font-bold text-white ${backgroundColor}`,
        "rounded-sm ",
      )}
    >
      <Link to={to}>{text}</Link>
    </div>
  );
}
