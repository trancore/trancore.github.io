import { FC } from "react";

import classes from "~/components/common/animation/Loading.module.scss";

export const Loading: FC = () => {
  return <div className={classes.loading}></div>;
};
