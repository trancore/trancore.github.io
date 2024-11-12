import { ChangeEvent, FC, useEffect, useRef, MouseEvent } from "react";

import { Link } from "react-router-dom";

import noImage from "~/assets/images/no-image.jpg";

import { PAGE_PATH } from "~/const";

import { Loading } from "~/components/common/animation/Loading";
import { IconButton } from "~/components/common/button/IconButton";
import { Icon } from "~/components/common/icon/Icon";
import { MusicTable } from "~/components/ui/musictable/MusicTable";

import useFile from "~/hooks/useFile";
import useMusicPlayer from "~/hooks/useMusicPlayer";
import useNavigate from "~/hooks/useNavigate";

import { formatSecondsToMMSS } from "~/utils/format";
import { getAudioUint8Array } from "~/utils/music";
import { getMusicMetadata } from "~/utils/musicMetadata";

import classes from "~/components/pages/music-player/MusicPlayer.module.scss";

export const MusicPlayer: FC = () => {
  const { fileRef, onClickInputFileList } = useFile();
  const { navigateHandler } = useNavigate();
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
  const seekBarRef = useRef<HTMLInputElement>(null);

  async function onChangeFileList(event: ChangeEvent<HTMLInputElement>) {
    setIsLoading(() => true);

    const { files } = event.target;

    stop();
    clear();
    currentMusic.current = { no: 0, audioElement: new Audio() };
    setCurrentMusicList((prevArray) =>
      prevArray.filter((_, index) => index !== index),
    );

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

  async function onClickMusicRow(
    event: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
  ) {
    const { id } = event.currentTarget;
    const clickedMusic = currentMusicList[Number(id) - 1];

    await updateCurrentMusic(Number(id), clickedMusic);
    play();
  }

  navigateHandler(stop);

  useEffect(() => {
    if (seekBarRef.current) {
      seekBarRef.current.value = String(currentMusicPlayTime);
    }
    if (currentMusic.current.audioElement.ended) {
      forward();
    }
  }, [currentMusicPlayTime, location]);

  return (
    <div className={classes["music-player"]}>
      <header className={classes.header}>
        <Link to={PAGE_PATH.TOP}>
          <Icon name="ArrowLeft" size={32}></Icon>
        </Link>
        <div className={classes["input-file"]}>
          <input
            id="fileElement"
            type="file"
            ref={fileRef}
            onChange={onChangeFileList}
            multiple
          ></input>
          <button id="fileSelect" type="button" onClick={onClickInputFileList}>
            ファイル選択
          </button>
        </div>
      </header>
      {isLoading && <Loading />}
      {currentMusicList && currentMusicList.length > 0 ? (
        <div className={classes.content}>
          <div className={classes["music-meta"]}>
            <img
              className={classes["jacket-picture"]}
              src={
                currentMusicList[currentMusic.current.no - 1].display
                  .albumWork || noImage
              }
              alt="albumwork"
            />
            <div className={classes["player-control"]}>
              <div className={classes.player}>
                <div className={classes.time}>
                  <p>{formatSecondsToMMSS(currentMusicPlayTime)}</p>
                  <input
                    className={classes.seekbar}
                    type="range"
                    ref={seekBarRef}
                    step={1}
                    max={currentMusicDuration}
                    value={currentMusicPlayTime || 0}
                    onChange={onClickSeekbar}
                  ></input>
                  <p>{formatSecondsToMMSS(currentMusicDuration)}</p>
                </div>
                <p className={classes["current-music-display"]}>
                  {currentMusic.current.no}
                  {". "}
                  {
                    currentMusicList[currentMusic.current.no - 1].display.artist
                  }{" "}
                  -{" "}
                  {currentMusicList[currentMusic.current.no - 1].display.title}
                </p>
                <div className={classes.control}>
                  <IconButton
                    icon={{ name: "Backforward", size: 24 }}
                    onclick={backForward}
                  />
                  {currentMusicStatus === "PLAY" ? (
                    <IconButton
                      icon={{ name: "Resume", size: 44 }}
                      onclick={pause}
                    />
                  ) : (
                    <span className={classes.play}>
                      <IconButton
                        icon={{ name: "Fish", size: 44 }}
                        onclick={play}
                      />
                    </span>
                  )}
                  <IconButton
                    icon={{ name: "Forward", size: 24 }}
                    onclick={forward}
                  />
                </div>
              </div>
              <MusicTable
                musicList={currentMusicList.map((music) => music.display)}
                currentMusicNo={currentMusic.current.no}
                onClick={onClickMusicRow}
              ></MusicTable>
            </div>
          </div>
        </div>
      ) : (
        <p className={classes["no-music"]}>
          音楽を選択してください。
          <br />
          ※選択したファイルはメモリ上に保持されるだけなので、永続的には保存されません。
        </p>
      )}
    </div>
  );
};
