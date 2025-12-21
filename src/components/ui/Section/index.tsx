import { cn } from "~/utils/cn";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <>
      <h2 className={cn("font-bold text-2xl")}>{title}</h2>
      <div className={cn("pt-4 pb-10")}>{children}</div>
    </>
  );
}
