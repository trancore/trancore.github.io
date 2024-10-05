import { useEffect, useState } from "react";

import { Metadata } from "~/types/Music";

const STATUS = {
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
} as const;

type Status = keyof typeof STATUS;
type CurrentMusic = {
  url: string;
  // TODO useMusicPlayerにするのでdisplayで問題ない。
  display: Pick<Metadata, "title" | "artist" | "length">;
};

export default function useMusic() {
  // const context = new AudioContext();
  const [currentMusic, setCurrentMusic] = useState<{
    no: number;
    audioElement: HTMLAudioElement;
  }>({
    no: 0,
    audioElement: new Audio(),
  });
  const [currentMusicList, setCurrentMusicList] = useState<CurrentMusic[]>([]);
  const [currentMusicTime, setCurrentMusicTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(STATUS.STOP);

  // const volumeControl = context.createGain();
  //   const analyser = context.createAnalyser();

  // volumeControl.connect(context.destination);

  useEffect(() => {
    function updateCurrentTime() {
      setCurrentMusicTime(currentMusic.audioElement.currentTime);
    }

    currentMusic.audioElement.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      currentMusic.audioElement.removeEventListener(
        "timeupdate",
        updateCurrentTime,
      );
    };
  }, [currentMusicTime, currentMusic, setCurrentMusicTime]);

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
   * 状態の初期化
   */
  function clear() {
    setCurrentMusic({ no: 0, audioElement: new Audio() });
    setCurrentMusicTime(0);
    setStatus(STATUS.STOP);
  }

  /**
   * 音楽の再生
   */
  function play() {
    currentMusic.audioElement.play();
    setStatus(STATUS.PLAY);
  }

  /**
   * 音楽の一時停止
   */
  function pause() {
    currentMusic.audioElement.pause();
    setStatus(STATUS.PAUSE);
  }

  function forward() {
    const nextMusic = new Audio();
    const nextNo =
      currentMusicList.length > currentMusic.no + 1 ? currentMusic.no + 1 : 1;
    nextMusic.src = currentMusicList[nextNo - 1].url;
    setCurrentMusic({ no: nextNo, audioElement: nextMusic });
  }

  function backForward() {}

  return {
    currentMusic,
    currentMusicList,
    currentMusicTime,
    isLoading,
    status,
    clear,
    forward,
    getAudioArrayBuffer,
    getMusicURL,
    pause,
    play,
    setCurrentMusic,
    setCurrentMusicList,
    setIsLoading,
  };
}
