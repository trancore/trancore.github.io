import type { DisplayMetadata } from "~/types/music";
import { loadAudioMetadata } from "~/utils/music";
import { useEffect, useRef, useState } from "react";

const STATUS = {
  PLAY: "PLAY",
  STOP: "STOP",
  PAUSE: "PAUSE",
} as const;

type Status = keyof typeof STATUS;

type CurrentMusic = {
  url: string;
  display: DisplayMetadata;
};

/**
 * 音楽プレイヤーの状態管理・操作用カスタムフック
 *
 * - 再生・一時停止・停止・曲送り/戻しの操作
 * - 曲リスト・現在曲・再生位置・再生状態等の管理
 * - mediaファイルのObjectURL管理
 */
export default function useMusicPlayer() {
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

  // 音量用コンテキスト。今のところ実装予定がないためコメントアウト。
  // const context = new AudioContext();
  // const volumeControl = context.createGain();
  // const analyser = context.createAnalyser();
  // volumeControl.connect(context.destination);

  // biome-ignore lint/correctness/useExhaustiveDependencies: リントに従うと更新されないため
  useEffect(() => {
    /**
     * 再生位置が変化したときに更新するイベントハンドラ
     */
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
   * 現在再生する曲情報とソースを更新
   * @param {number} id 曲ID
   * @param {CurrentMusic} updatedMusic 更新する曲情報
   */
  async function updateCurrentMusic(id: number, updatedMusic: CurrentMusic) {
    currentMusic.current.audioElement.src = updatedMusic.url;
    const duration = await loadAudioMetadata(currentMusic.current.audioElement);
    currentMusic.current = {
      no: Number(id),
      audioElement: currentMusic.current.audioElement,
    };
    setCurrentMusicDuration(duration);
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
   * 前の音楽に戻る
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
    updateCurrentMusic,
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
