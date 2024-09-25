import { ChangeEvent, ComponentProps, FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { PAGE_PATH } from "~/const";

import { Loading } from "~/components/common/animation/Loading";
import { IconButton } from "~/components/common/button/IconButton";
import { Icon } from "~/components/common/icon/Icon";
import { MusicTable } from "~/components/common/table/MusicTable";

import useFile from "~/hooks/useFile";
import useMusic from "~/hooks/useMusic";

import classes from "~/components/pages/music-player/MusicPlayer.module.scss";

type CurrentMusic = {
  url: string;
  musicMetadata: ComponentProps<typeof MusicTable>["musicList"][number];
};

export const MusicPlayer: FC = () => {
  const [currentMusicList, setCurrentMusicList] = useState<CurrentMusic[]>([]);
  const { fileRef, onClickInputFileList } = useFile();
  const {
    currentMusic,
    isLoading,
    status,
    getAudioArrayBuffer,
    getMusicURL,
    pause,
    play,
    setIsLoading,
  } = useMusic();

  async function onChangeFileList(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    setIsLoading(true);
    setCurrentMusicList([]);

    if (files === null || files.length === 0) {
      setIsLoading(false);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const objectURLMusic = getMusicURL(files[i]);
      const arrayBuffer = await getAudioArrayBuffer(files[i]);
      const music = {
        url: objectURLMusic,
        musicMetadata: {
          title: "test",
          artist: "test",
          length: "999:99",
        },
      };
      currentMusicList.push(music);
    }

    currentMusic.src = currentMusicList[0].url;

    setCurrentMusicList(currentMusicList);
    setIsLoading(false);

    console.log("準備完了");
  }

  useEffect(() => {
    // setMusicList([
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    //   {
    //     artist: "kosuke iwasaki",
    //     title: "test test test",
    //     length: "20:00",
    //   },
    // ]);
  }, []);

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
            <div className={classes["jacket-picture"]}></div>
            <div className={classes["player-control"]}>
              <div className={classes.player}>
                <div className={classes.time}>
                  <p>0:00</p>
                  <input className={classes.seekbar} type="range"></input>
                  <p>999:99</p>
                </div>
                <p>Artist - 曲名</p>
                <div className={classes.control}>
                  <Icon name="Backforward" size={24}></Icon>
                  {status === "PLAY" ? (
                    <IconButton
                      icon={{ name: "Resume", size: 44 }}
                      onclick={() => pause()}
                    />
                  ) : (
                    <span className={classes.play}>
                      <IconButton
                        icon={{ name: "Fish", size: 44 }}
                        onclick={() => play()}
                      />
                    </span>
                  )}
                  <Icon name="Forward" size={24}></Icon>
                </div>
              </div>
              <MusicTable
                musicList={currentMusicList.map((music) => music.musicMetadata)}
              ></MusicTable>
            </div>
          </div>
        </div>
      ) : (
        <p className={classes["no-music"]}>音楽を選択してください</p>
      )}
    </div>
  );
};
