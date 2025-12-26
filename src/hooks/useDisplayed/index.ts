import { useState } from "react";

/**
 * UI要素などの表示・非表示の状態を管理するためのカスタムフック。
 *
 * @returns `displayed`状態と、その状態を更新・トグルするための関数を含むオブジェクト。
 */
export function useDisplayed() {
  /**
   * 現在の表示状態。初期値は `false`。
   */
  const [displayed, setDisplayed] = useState(false);

  /**
   * 現在の`displayed`の状態を反転させる。
   */
  function toggleDisplayed() {
    setDisplayed((prev) => !prev);
  }

  return { displayed, toggleDisplayed };
}
