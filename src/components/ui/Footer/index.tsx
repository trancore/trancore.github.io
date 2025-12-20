import { Link, Navigate } from "@tanstack/react-router";

import Icon from "~/components/common/Icon";
import { cn } from "~/utils/cn";

export default function Footer() {
  return (
    <footer className={cn("w-full py-5", "border-t-2 border-t-gray-200")}>
      <div className={cn("mb-4 gap-6", "flex justify-center")}>
        <a
          href="https://www.facebook.com/kosuke.iwasaki.16"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="FACEBOOK" size={32} />
        </a>
        <a
          href="https://github.com/trancore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="GITHUB" size={32} />
        </a>
        <a
          href="https://kostum.hatenablog.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="HATENA" size={32} />
        </a>
        <a
          href="https://www.linkedin.com/in/kosukeiwasaki/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="LINKEDIN" size={32} />
        </a>
        <a
          href="https://x.com/kosukePiwasaki"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="X" size={32} />
        </a>
        <a
          href="https://zenn.dev/kosuke_iwasaki"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon type="ZENN" size={32} />
        </a>
      </div>
      <p className={cn("flex justify-center", "text-gray-500 text-sm")}>
        ©︎ 2025 Kosuke Iwasaki
      </p>
    </footer>
  );
}
