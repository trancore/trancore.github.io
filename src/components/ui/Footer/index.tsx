import Icon from "~/components/common/Icon";
import { cn } from "~/utils/cn";

export default function Footer() {
  return (
    <footer className={cn("w-full py-5", "border-t-2 border-t-gray-200")}>
      <div className={cn("mb-4 gap-6", "flex justify-center")}>
        <Icon type="FACEBOOK" size={32} />
        <Icon type="GITHUB" size={32} />
        <Icon type="HATENA" size={32} />
        <Icon type="LINKEDIN" size={32} />
        <Icon type="X" size={32} />
        <Icon type="ZENN" size={32} />
      </div>
      <p className={cn("flex justify-center", "text-gray-500 text-sm")}>
        ©︎ 2025 Kosuke Iwasaki
      </p>
    </footer>
  );
}
