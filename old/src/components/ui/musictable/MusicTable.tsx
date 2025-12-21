import { FC, MouseEventHandler } from "react";

import classes from "~/components/ui/musictable/MusicTable.module.scss";

type Props = {
  musicList: {
    artist: string;
    title: string;
    length: string;
  }[];
  currentMusicNo: number | undefined;
  onClick: MouseEventHandler<HTMLTableRowElement>;
};

export const MusicTable: FC<Props> = ({
  musicList,
  currentMusicNo,
  onClick,
}) => {
  return (
    <table>
      <tbody>
        {musicList.map((music, index) => {
          const no = index + 1;
          return (
            <tr key={`row-${no}`} id={String(no)} onClick={onClick}>
              <td key={`no_${no}`} id={String(no)} className={classes.no}>
                {no}
              </td>
              <td
                key={`name_${index}`}
                id={String(no)}
                className={classes.name}
                style={{
                  fontWeight: no === currentMusicNo ? "bold" : undefined,
                }}
              >
                {music.artist} - {music.title}
              </td>
              <td
                key={`length_${index}`}
                id={String(no)}
                className={classes.length}
                style={{
                  fontWeight: no === currentMusicNo ? "bold" : undefined,
                }}
              >
                {music.length}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
