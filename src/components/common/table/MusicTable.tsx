import { FC } from "react";

import classes from "~/components/common/table/MusicTable.module.scss";

type Props = {
  musicList: {
    artist: string;
    title: string;
    length: string;
  }[];
};

export const MusicTable: FC<Props> = ({ musicList }) => {
  return (
    <table>
      <tbody>
        {musicList.map((music, index) => {
          const no = index + 1;
          return (
            <tr key={`row-${no}`}>
              <td key={`no_${no}`} className={classes.no}>
                {no}
              </td>
              <td key={`name_${index}`} className={classes.name}>
                {music.artist} - {music.title}
              </td>
              <td key={`length_${index}`} className={classes.length}>
                {music.length}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
