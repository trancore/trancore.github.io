import React from "react";

import { Icon } from "~/components/common/icon/Icon";

import classes from "~/components/ui/repository/Repository.module.scss";

export const Repository: React.FC = () => {
  return (
    <div className={classes.repository}>
      <div className={classes.readme}>
        <div className={classes.readme_back}>
          <div className={classes.readme_content}>
            <p>README</p>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <div className={classes.repository_name}>
          <Icon name="Book" size={44}></Icon>
          <p>trancore/trancore.github.io</p>
        </div>
        <div className={classes.repository_description}>
          <p>My portfolio site.</p>
        </div>
        <div className={classes.repository_code}>
          <div className={classes.code_color}>⚪️</div>
          <div className={classes.code_language}>
            <p>Typescript</p>
          </div>
        </div>
      </div>
    </div>
  );
};
