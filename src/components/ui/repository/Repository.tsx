import React from "react";

import { Icon } from "~/components/common/icon/Icon";

import classes from "~/components/ui/repository/Repository.module.scss";

type Props = {
  repositry: {
    readme: string;
    name: string;
    description: string;
    codeLanguage: string;
  };
};

export const Repository: React.FC<Props> = ({ repositry }) => {
  return (
    <div className={classes.repository}>
      <div className={classes.readme}>
        <div className={classes.readme_back}>
          <div className={classes.readme_content}>
            <p>{repositry.readme}</p>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <div className={classes.repository_name}>
          <Icon name="Book" size={44}></Icon>
          <p>{repositry.name}</p>
        </div>
        <div className={classes.repository_description}>
          <p>{repositry.name}</p>
        </div>
        <div className={classes.repository_code}>
          <div className={classes.code_color}>⚪️</div>
          <div className={classes.code_language}>
            <p>{repositry.codeLanguage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
