import React, { FC } from "react";

import { useRouteError } from "react-router-dom";

export const Error: FC = () => {
  const error = useRouteError();
  // FIXME: エラーページの仕様が決まったら対応する。
  console.log(error);

  return (
    <div className="error">
      <p>⚠️404Error!!</p>
    </div>
  );
};
