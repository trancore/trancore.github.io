import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名管理カスタムヘルパー関数。
 * 引数の順番に応じてグルーピングされたスタイルが定義される。
 *
 * 第1引数：
 * 末端引数：オブジェクトとし、条件分岐によって変わるスタイル
 *
 * @param inputs クラス名
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
