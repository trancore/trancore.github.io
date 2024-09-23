import { useRef } from "react";

export default function useFile() {
  const fileRef = useRef<HTMLInputElement>(null);

  function onClickInputFileList() {
    fileRef.current?.click();
  }

  return { fileRef, onClickInputFileList };
}
