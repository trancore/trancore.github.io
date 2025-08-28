import { useRef } from "react";

export default function useFile() {
  const fileRef = useRef<HTMLInputElement>(null);

  function onClickInputFileList() {
    if (fileRef.current) {
      fileRef.current.accept = "audio/*";
      fileRef.current.click();
    }
  }

  return { fileRef, onClickInputFileList };
}
