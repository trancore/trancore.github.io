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
  display: Pick<Metadata, "title" | "artist" | "length">;
};

/**
 * ミュージックプレーヤーを扱うためのhooks
 */
export default function useMusicPlayer() {
  // const context = new AudioContext();
  const currentMusic = useRef<{
    no: number;
    audioElement: HTMLAudioElement;
  }>({
    no: 0,
    audioElement: new Audio(),
  });
  const [currentMusicList, setCurrentMusicList] = useState<CurrentMusic[]>([]);
  const [currentMusicPlayTime, setCurrentMusicPlayTime] = useState<number>(0);
  const [currentMusicDuration, setCurrentMusicDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMusicStatus, setCurrentMusicStatus] = useState<Status>(
    STATUS.STOP,
  );

  // const volumeControl = context.createGain();
  //   const analyser = context.createAnalyser();

  // volumeControl.connect(context.destination);

  useEffect(() => {
    function updateCurrentTime() {
      setCurrentMusicPlayTime(currentMusic.current.audioElement.currentTime);
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
  }, [currentMusicPlayTime, currentMusic.current, setCurrentMusicPlayTime]);

  /**
   * 音楽ソースファイルへのURLをObjectURLに変換した音楽の取得
   * @param {File} file 選択されたファイル
   * @returns {string} ObjectURLに変換した音楽
   */
  function getMusicURL(file: File): string {
    return window.URL.createObjectURL(file);
  }

  /**
   * 状態の初期化
   */
  function clear() {
    currentMusic.current.audioElement.remove();
    currentMusic.current = { no: 0, audioElement: new Audio() };
    setCurrentMusicPlayTime(0);
    setCurrentMusicDuration(0);
    setCurrentMusicStatus(STATUS.STOP);
  }

  /**
   * 音楽の再生
   */
  async function play(): Promise<void> {
    await currentMusic.current.audioElement.play();
    setCurrentMusicStatus(STATUS.PLAY);
  }

  /**
   * 音楽の一時停止
   */
  function pause(): void {
    currentMusic.current.audioElement.pause();
    setCurrentMusicStatus(STATUS.PAUSE);
  }

  /**
   * 音楽の停止
   */
  function stop() {
    currentMusic.current.audioElement.pause();
    currentMusic.current.audioElement.currentTime = 0;
    setCurrentMusicStatus(STATUS.STOP);
  }

  /**
   * 次の音楽へ進む
   */
  async function forward() {
    stop();
    currentMusic.current.audioElement.remove();
    const nextMusic = new Audio();
    const nextNo =
      currentMusicList.length > currentMusic.current.no + 1
        ? currentMusic.current.no + 1
        : 1;
    nextMusic.src = currentMusicList[nextNo - 1].url;
    currentMusic.current = { no: nextNo, audioElement: nextMusic };
    await play();
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
    await play();
  }

  return {
    currentMusic,
    currentMusicList,
    setCurrentMusicList,
    currentMusicPlayTime,
    setCurrentMusicPlayTime,
    currentMusicDuration,
    setCurrentMusicDuration,
    isLoading,
    setIsLoading,
    currentMusicStatus,
    setCurrentMusicStatus,
    clear,
    play,
    stop,
    pause,
    forward,
    backForward,
    getMusicURL,
  };
}
