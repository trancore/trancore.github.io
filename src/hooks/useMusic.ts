import { useEffect, useRef, useState } from "react";

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
  const currentMusic = useRef<{
    no: number;
    audioElement: HTMLAudioElement;
  }>({
    no: 0,
    audioElement: new Audio(),
  });
  const [currentMusicList, setCurrentMusicList] = useState<CurrentMusic[]>([]);
  const [currentMusicTime, setCurrentMusicTime] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>(STATUS.STOP);

  // const volumeControl = context.createGain();
  //   const analyser = context.createAnalyser();

  // volumeControl.connect(context.destination);

  useEffect(() => {
    function updateCurrentTime() {
      setCurrentMusicTime(currentMusic.current.audioElement.currentTime);
    }

    currentMusic.current.audioElement.addEventListener(
      "timeupdate",
      updateCurrentTime,
    );
    return () => {
      currentMusic.current.audioElement.removeEventListener(
        "timeupdate",
        updateCurrentTime,
      );
    };
  }, [currentMusicTime, currentMusic.current, setCurrentMusicTime]);

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

  function loadedAudioMetadata(
    audioElement: HTMLAudioElement,
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      audioElement.addEventListener("loadedmetadata", () => {
        const { duration } = audioElement;
        resolve(duration);
      });
    });
  }

  /**
   * 状態の初期化
   */
  function clear() {
    currentMusic.current.audioElement.remove();
    currentMusic.current = { no: 0, audioElement: new Audio() };
    setCurrentMusicTime(0);
    setDuration(0);
    setStatus(STATUS.STOP);
  }

  /**
   * 音楽の再生
   */
  async function play(): Promise<void> {
    await currentMusic.current.audioElement.play();
    setStatus(STATUS.PLAY);
  }

  /**
   * 音楽の一時停止
   */
  function pause(): void {
    currentMusic.current.audioElement.pause();
    setStatus(STATUS.PAUSE);
  }

  /**
   * 音楽の停止
   */
  function stop() {
    currentMusic.current.audioElement.pause();
    currentMusic.current.audioElement.currentTime = 0;
    setStatus(STATUS.STOP);
  }

  /**
   * 次の音楽へ進む
   */
  function forward() {
    stop();
    currentMusic.current.audioElement.remove();
    const nextMusic = new Audio();
    const nextNo =
      currentMusicList.length > currentMusic.current.no + 1
        ? currentMusic.current.no + 1
        : 1;
    nextMusic.src = currentMusicList[nextNo - 1].url;
    currentMusic.current = { no: nextNo, audioElement: nextMusic };
  }

  /**
   * 次の音楽へ進む
   */
  async function backForward(): Promise<void> {
    stop();
    currentMusic.current.audioElement.remove();
    const previousMusic = new Audio();
    const previousNo =
      currentMusic.current.no - 1 < 1
        ? currentMusicList.length
        : currentMusic.current.no - 1;
    previousMusic.src = currentMusicList[previousNo - 1].url;
    currentMusic.current = { no: previousNo, audioElement: previousMusic };
  }

  return {
    currentMusic,
    currentMusicList,
    currentMusicTime,
    duration,
    isLoading,
    status,
    backForward,
    clear,
    forward,
    getAudioArrayBuffer,
    getMusicURL,
    loadedAudioMetadata,
    pause,
    play,
    setCurrentMusicList,
    setDuration,
    setIsLoading,
    stop,
  };
}
