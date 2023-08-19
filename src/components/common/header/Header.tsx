import React, { FC } from "react";
import "~/components/common/header/Header.modules.scss";
import { Icon } from "~/components/common/icon/Icon";

export const Header: FC = () => {
  return (
    <div className="header">
      <div className="list">
        <Icon name="Home" />
        <Icon name="Person" />
        <Icon name="Music" />
      </div>
    </div>
  );
};
