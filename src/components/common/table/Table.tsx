import React, { FC } from "react";

type Props = {
  tableHeaderTitle: string;
  tableBodyRows: {
    firstCell: string;
    secondCell: string;
  }[];
};

export const Table: FC<Props> = ({ tableHeaderTitle, tableBodyRows }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{tableHeaderTitle}</th>
        </tr>
      </thead>
      <tbody>
        {tableBodyRows.map((row, index) => {
          return (
            <tr key={`row-${index}`}>
              <td key={`cell1_${index}`}>{row.firstCell}</td>
              <td key={`cell2_${index}`}>{row.secondCell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
