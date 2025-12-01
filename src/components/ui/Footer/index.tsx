import { cn } from "~/utils/cn";

export default function Footer() {
  return (
    <footer className={cn("py-5 w-full", "border-t-2 border-t-gray-200")}>
      <p className={cn("flex justify-center", "text-gray-500 text-sm")}>
        ©︎ 2025 Kosuke Iwasaki
      </p>
    </footer>
  );
}
