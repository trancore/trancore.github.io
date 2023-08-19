import React from "react";

import classes from "~/components/common/table/Table.module.scss";

const DEFAULT_TEXT_SIZE = 36;

type Props = {
  tableHeaderTitle: string;
  tableBodyRows: {
    firstCell: string;
    secondCell: string;
  }[];
  textSize?: typeof DEFAULT_TEXT_SIZE;
};

export const Table: React.FC<Props> = ({
  tableHeaderTitle,
  tableBodyRows,
  textSize = DEFAULT_TEXT_SIZE,
}) => {
  return (
    <>
      <p className={classes.title} style={{ fontSize: textSize }}>
        {tableHeaderTitle}
      </p>
      <table style={{ fontSize: textSize }}>
        <tbody>
          {tableBodyRows.map((row, index) => {
            return (
              <tr key={`row-${index}`}>
                <td key={`cell1_${index}`} className={classes["first-cell"]}>
                  {row.firstCell}
                </td>
                <td key={`cell2_${index}`} className={classes["second-cell"]}>
                  {row.secondCell}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
