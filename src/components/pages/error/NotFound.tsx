import React from "react";

import { Error } from "~/components/common/error/Error";

export const NotFound: React.FC = () => {
  return <Error errorStatus={404}></Error>;
};
