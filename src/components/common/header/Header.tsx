import React from "react";

import { Icon } from "~/components/common/icon/Icon";

import classes from "~/components/common/header/Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <div className={classes.list}>
        <Icon name="Home" />
        <Icon name="Person" />
        <Icon name="Music" />
      </div>
    </div>
  );
};
