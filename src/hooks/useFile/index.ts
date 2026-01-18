import { useRef } from "react";

type Accept = "audio/*" | "*" | string;

type Options = {
  accept: Accept;
};

/**
 * ファイルを選択するためのinput要素を操作するカスタムフック
 *
 * @param {Options} options - オプション
 * @param {Accept} options.accept - input要素のaccept属性に指定する値
 * @returns fileRefとonClickInputFile関数を返す
 * @example
 * ```tsx
 * const { fileRef, onClickInputFile } = useFile({ accept: "audio/*" });
 *
 * return (
 *   <>
 *     <input type="file" ref={fileRef} style={{ display: "none" }} />
 *     <button onClick={onClickInputFile}>ファイルを選択</button>
 *   </>
 * )
 * ```
 */
export default function useFile({ accept }: Options) {
  const fileRef = useRef<HTMLInputElement>(null);

  function onClickInputFile() {
    if (fileRef.current) {
      fileRef.current.accept = accept;
      fileRef.current.click();
    }
  }

  return { fileRef, onClickInputFile };
}
