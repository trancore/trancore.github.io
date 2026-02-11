import { useEffect, useState } from "react";

/**
 * ユーザーがページの一番下までスクロールしたかどうかを検出するためのカスタムフック。
 *
 * @returns `isAtBottom`状態を含むオブジェクト。
 */
export default function useAtBottom() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      setIsAtBottom(isBottom);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isAtBottom };
}
