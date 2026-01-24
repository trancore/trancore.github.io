import { Button as HeadlessButton } from "@headlessui/react";
import { useBlocker } from "@tanstack/react-router";

import Button from "~/components/common/Button";
import Icon from "~/components/common/Icon";
import useMusicPlayer from "~/hooks/useMusicPlayer";
import { cn } from "~/utils/cn";
import { formatSecondsToMMSS } from "~/utils/format";
import { getAudioUint8Array } from "~/utils/music";
import { getMusicMetadata } from "~/utils/musicMetadata";
import { type ChangeEvent, type MouseEvent, useEffect, useRef } from "react";

export default function MusicPlayer() {
  const seekBarRef = useRef<HTMLInputElement>(null);
  const {
    currentMusic,
    updateCurrentMusic,
    currentMusicList,
    setCurrentMusicList,
    currentMusicPlayTime,
    currentMusicDuration,
    isLoading,
    setIsLoading,
    currentMusicStatus,
    clear,
    play,
    pause,
    stop,
    forward,
    backForward,
    getMusicURL,
  } = useMusicPlayer();

  useBlocker({
    shouldBlockFn: () => {
      stop();
      return false;
    },
  });

  async function onChangeFileList(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(() => true);

    const { files } = event.target;

    stop();
    clear();
    currentMusic.current = { no: 0, audioElement: new Audio() };
    setCurrentMusicList([]);

    if (files === null || files.length === 0) {
      setIsLoading(() => false);
      return;
    }

    const flushMusicList: typeof currentMusicList = [];
    // 音楽リストの作成
    for (let i = 0; i < files.length; i++) {
      const objectURLMusic = getMusicURL(files[i]);
      const arrayBuffer = await getAudioUint8Array(files[i]);
      const musicMetadata = getMusicMetadata(arrayBuffer);
      const music: (typeof currentMusicList)[number] = {
        url: objectURLMusic,
        display: {
          title: musicMetadata?.title || "",
          artist: musicMetadata?.artist || "",
          length: "",
          albumWork: musicMetadata?.albumWork || "",
        },
      };
      flushMusicList.push(music);
    }

    // 現在選択されている音楽に音楽ソースを設定
    await updateCurrentMusic(1, flushMusicList[0]);
    setCurrentMusicList(flushMusicList);
    setIsLoading(() => false);

    console.log("準備完了");
  }

  function onClickSeekbar(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    currentMusic.current.audioElement.currentTime = Number(value);
  }

  async function onClickMusicRow(event: MouseEvent) {
    const { id } = event.currentTarget;
    const clickedMusic = currentMusicList[Number(id) - 1];

    await updateCurrentMusic(Number(id), clickedMusic);
    play();
  }

  useEffect(() => {
    if (seekBarRef.current) {
      seekBarRef.current.value = String(currentMusicPlayTime);
    }
    if (currentMusic.current.audioElement.ended) {
      forward();
    }
  }, [currentMusicPlayTime, currentMusic.current.audioElement.ended, forward]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      {/* ファイル選択 */}
      <div
        className={cn(
          "border-product-page-theme",
          "w-full px-2 py-3",
          "flex items-center gap-4",
          `border-2`,
        )}
      >
        <Button
          type="file"
          text="ファイル選択"
          backgroundColor="bg-product-page-theme"
          fileOptions={{
            accept: "audio/*",
            onChangeInputFile: onChangeFileList,
          }}
        />
        <p>
          ※選択したファイルはメモリ上に保持されるだけなので、永続的に保存されません。
        </p>
      </div>

      {/* ミュージックプレイヤー */}
      {currentMusicList && currentMusicList.length > 0 && (
        <div className={cn("gap-15 px-4", "flex")}>
          {/* アルバムワーク */}
          <img
            src={
              currentMusicList[currentMusic.current.no - 1].display.albumWork ||
              "/src/assets/images/no-album-work.jpg"
            }
            alt="album-work"
            className={cn(
              "size-75",
              "sticky top-10",
              "aspect-square object-contain",
            )}
          />

          {/* コントロール */}
          <div className={cn("mt-[-20px] w-full")}>
            <div
              className={cn(
                "gap-2 pt-10 pb-5",
                "sticky top-0 flex flex-col items-center",
                "bg-white dark:bg-black",
              )}
            >
              <div className={cn("w-full gap-4.5", "flex items-center")}>
                {/* 再生時間 */}
                <p className={cn("text-sm")}>
                  {formatSecondsToMMSS(currentMusicPlayTime)}
                </p>
                {/* シークバー */}
                <input
                  className={cn(
                    "h-3 w-3/4 grow",
                    "cursor-pointer appearance-none rounded-xl bg-gray-300",
                  )}
                  type="range"
                  ref={seekBarRef}
                  step={1}
                  max={currentMusicDuration}
                  value={currentMusicPlayTime || 0}
                  onChange={onClickSeekbar}
                />
                {/* 曲時間 */}
                <p className={cn("text-sm")}>
                  {formatSecondsToMMSS(currentMusicDuration)}
                </p>
              </div>
              {/* TODO: 横に流れるようにする */}
              <p className={cn("mb-2.5", "font-bold text-lg")}>
                {currentMusic.current.no}
                {". "}
                {currentMusicList[currentMusic.current.no - 1].display.artist} -{" "}
                {currentMusicList[currentMusic.current.no - 1].display.title}
              </p>
              <div className={cn("flex items-center gap-6")}>
                <div className={cn("cursor-pointer")}>
                  <Icon
                    type="BACKWARD"
                    size={32}
                    onClick={backForward}
                    strokeColor="stroke-product-page-theme"
                  />
                </div>
                {currentMusicStatus === "PLAY" ? (
                  <span className={cn("cursor-pointer")}>
                    <Icon
                      type="PAUSE"
                      size={48}
                      onClick={pause}
                      strokeColor="stroke-product-page-theme"
                    />
                  </span>
                ) : (
                  <span className={cn("cursor-pointer")}>
                    <Icon
                      type="PLAY"
                      size={48}
                      onClick={play}
                      strokeColor="stroke-product-page-theme"
                    />
                  </span>
                )}
                <span className={cn("cursor-pointer")}>
                  <Icon
                    type="FORWARD"
                    size={32}
                    onClick={forward}
                    strokeColor="stroke-product-page-theme"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* ミュージックリスト */}
          {!isLoading && currentMusicList.length > 0 && (
            <div className={cn("pb-5")}>
              {currentMusicList.map((music, index) => (
                <HeadlessButton
                  key={`music-row-${(index + 1).toString()}`}
                  id={(index + 1).toString()}
                  className={cn(
                    "mt-4 w-full pb-3",
                    "text-left",
                    "grid grid-cols-10 items-center",
                    "cursor-pointer border-b",
                    {
                      "font-bold": currentMusic.current.no === index + 1,
                      "text-product-page-theme":
                        currentMusic.current.no === index + 1,
                    },
                  )}
                  onClick={onClickMusicRow}
                >
                  <p className={cn("pl-2", "col-start-1")}>{index + 1}</p>
                  <p className={cn("col-start-2 col-end-10")}>
                    {music.display.artist} - {music.display.title}
                  </p>
                  <p className={cn("col-start-10")}>{music.display.length}</p>
                </HeadlessButton>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
