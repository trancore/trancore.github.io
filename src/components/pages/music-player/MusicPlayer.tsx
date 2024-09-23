import { FC } from "react";

import { Link } from "react-router-dom";

import { PAGE_PATH } from "~/const";

import { Icon } from "~/components/common/icon/Icon";
import { MusicTable } from "~/components/common/table/MusicTable";

import classes from "~/components/pages/music-player/MusicPlayer.module.scss";

export const MusicPlayer: FC = () => {
  const musicList = [
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
    {
      artist: "kosuke iwasaki",
      title: "test test test",
      length: "20:00",
    },
  ];

  return (
    <div className={classes["music-player"]}>
      <header className={classes.header}>
        <Link to={PAGE_PATH.TOP}>
          <Icon name="ArrowLeft" size={32}></Icon>
        </Link>
        <div className={classes["input-file"]}>
          <input id="fileElement" type="file" multiple></input>
          <button id="fileSelect" type="button">
            ファイル選択
          </button>
        </div>
      </header>
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
                <span className={classes.play}>
                  <Icon name="Fish" size={44}></Icon>
                  {/* <Icon name="Resume" size={44}></Icon> */}
                </span>
                <Icon name="Forward" size={24}></Icon>
              </div>
            </div>
            <MusicTable musicList={musicList}></MusicTable>
          </div>
        </div>
      </div>
    </div>
  );
};
