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
        <div className={classes["readme-back"]}>
          <div className={classes["readme-content"]}>
            <p>{repositry.readme}</p>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <div className={classes["repository-name"]}>
          <Icon name="Book" size={44}></Icon>
          <p>{repositry.name}</p>
        </div>
        <div className={classes["repository-description"]}>
          <p>{repositry.description}</p>
        </div>
        <div className={classes["repository-code"]}>
          <div className={classes["code-color"]}>⚪️</div>
          <div className={classes["code-language"]}>
            <p>{repositry.codeLanguage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
