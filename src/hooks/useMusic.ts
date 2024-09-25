import { useState } from "react";

const STATUS = {
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
} as const;

type Status = keyof typeof STATUS;

export default function useMusic() {
  const context = new AudioContext();
  const [currentMusic] = useState<HTMLAudioElement>(new Audio());
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(STATUS.STOP);

  const volumeControl = context.createGain();
  //   const analyser = context.createAnalyser();

  volumeControl.connect(context.destination);

  /**
   * 音楽ソースファイルへのURLをObjectURLに変換した音楽の取得
   * @param {File} file 選択されたファイル
   * @returns {string} ObjectURLに変換した音楽
   */
  function getMusicURL(file: File): string {
    return window.URL.createObjectURL(file);
  }

  /**
   * 音楽のBinary Dataを取得
   * @param {File} file 音楽ファイル
   * @returns {Promise<string | ArrayBuffer | null>} Binary Data
   */
  function getAudioArrayBuffer(
    file: File,
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = function () {
        const result = fileReader.result;
        resolve(result);
      };
      fileReader.onerror = () => {
        reject(new Error("File reading failed"));
      };
    });
  }

  /**
   * 音楽の再生
   */
  function play() {
    currentMusic.play();
    setStatus(STATUS.PLAY);
  }

  /**
   * 音楽の一時停止
   */
  function pause() {
    currentMusic.pause();
    setStatus(STATUS.PAUSE);
  }

  return {
    currentMusic,
    isLoading,
    status,
    getAudioArrayBuffer,
    getMusicURL,
    pause,
    play,
    setIsLoading,
  };
}
