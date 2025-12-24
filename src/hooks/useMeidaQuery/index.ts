import { useEffect, useState } from "react";

/**
 * 画面幅に基づいてメディアクエリの状態を提供するカスタムフック。
 *
 * @remarks
 * このフックは、ウィンドウのリサイズを監視し現在の画面幅と
 * PC、タブレット、SP（スマートフォン）の各ブレークポイントに一致するかどうかを判定する。\
 * ブレークポイントの定義は以下の通り。
 * - PC: 1024px以上
 * - Tablet: 768px以上 かつ 1024px以下
 * - SP: 768px以下
 * ※ ブレークポイントは、/src/assets/css/styles.css の定義に基づく。
 *
 * @example
 * ```tsx
 * import { useMediaQuery } from '~/hooks/useMediaQuery';
 *
 * const MyComponent = () => {
 *   const { isPC, isSP } = useMediaQuery();
 *
 *   return (
 *     <div>
 *       {isPC && <p>PC向けのコンテンツ</p>}
 *       {isSP && <p>スマートフォン向けのコンテンツ</p>}
 *     </div>
 *   );
 * };
 * ```
 */
export function useMediaQuery() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isPC, setIsPC] = useState<boolean>(false);
  const [isSP, setIsSP] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsPC(() => width >= 1024);
      setIsSP(() => width <= 768);
      setIsTablet(() => width >= 768 && width <= 1024);
      setWindowWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowWidth, isPC, isSP, isTablet };
}
