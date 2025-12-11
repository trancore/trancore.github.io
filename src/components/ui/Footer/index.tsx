import { cn } from "~/utils/cn";

export default function Footer() {
  return (
    <footer className={cn("w-full py-5", "border-t-2 border-t-gray-200")}>
      <p className={cn("flex justify-center", "text-gray-500 text-sm")}>
        ©︎ 2025 Kosuke Iwasaki
      </p>
    </footer>
  );
}
