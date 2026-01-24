import { cn } from "~/utils/cn";

type Props = {
  type: "spinner";
};

export default function Loading({ type }: Props) {
  switch (type) {
    case "spinner":
      return <Spinner />;
    default:
      // 型で制限されるため、ここには到達しない
      return null;
  }
}

function Spinner() {
  return <div className={cn("loading-spinner", "mt-10 size-10", "border-5")} />;
}
