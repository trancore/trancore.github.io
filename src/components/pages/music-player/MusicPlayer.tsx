import { FC } from "react";

import classes from "~/components/pages/music-player/MusicPlayer.module.scss";

export const MusicPlayer: FC = () => {
  return (
    <div>
      <div>
        <div>
          <div>ジャケット画像</div>
        </div>
        <div>
          <div>シークバー</div>
          <div>Artist - 曲名</div>
          <div>
            <div>前の曲へ</div>
            <div>再生 / 一時停止</div>
            <div>次の曲へ</div>
          </div>
        </div>
      </div>
      <div>音楽リスト</div>
    </div>
  );
};
