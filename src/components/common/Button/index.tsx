import { Button as HeadlessUIButton } from "@headlessui/react";

import useFile from "~/hooks/useFile";
import type { Accept } from "~/types/file";
import { cn } from "~/utils/cn";
import type { ChangeEvent } from "react";

type ButtonType = "file" | "event";

type Props = {
  type: ButtonType;
  text: string;
  /** 背景色。tailwindCSSのbg-xxxで指定可能 */
  backgroundColor?: string;
  /** type=file 時のオプション */
  fileOptions?: {
    /** ファイル選択ダイアログで許可するファイルタイプ */
    accept?: Accept;
    /** ファイル選択時のコールバック関数 */
    onChangeInputFile?: (event: ChangeEvent<HTMLInputElement>) => void;
  };
};

export default function Button({
  type,
  text,
  backgroundColor = "bg-black",
  fileOptions,
}: Props) {
  const { accept = "*", onChangeInputFile } = fileOptions || {};

  const { fileRef, onClickInputFile } = useFile({ accept: accept });

  return (
    type === "file" && (
      <>
        <input
          type="file"
          className={cn("hidden")}
          ref={fileRef}
          onChange={onChangeInputFile}
          multiple
        />
        <HeadlessUIButton
          className={cn(
            "w-fit px-3 py-1.5",
            `font-bold text-white ${backgroundColor}`,
            "cursor-pointer rounded-sm",
          )}
          onClick={onClickInputFile}
        >
          {text}
        </HeadlessUIButton>
      </>
    )
  );
}
