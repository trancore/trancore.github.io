import React from "react";

import geometry68 from "~/assets/images/geometry68.svg";
import { useMediaQuery } from "~/hooks/useMediaQuery";

import { LinkButton } from "~/components/common/button/LinkButton";

import classes from "~/components/pages/top/Top.module.scss";

export const Top: React.FC = () => {
  const { isSp } = useMediaQuery();

  return (
    <div className={classes.content}>
      <div className={classes["left-content"]}>
        <p className={classes.welcome}>welcome</p>
        <img className={classes["nazo-image"]} src={geometry68} />
      </div>
      <div className={classes["right-content"]}>
        <ul>
          <li>
            <LinkButton
              text="Profile"
              buttonWidth={isSp ? 250 : 350}
              textSize={20}
            />
          </li>
          <li>
            <LinkButton
              text="Products"
              buttonWidth={isSp ? 250 : 350}
              textSize={20}
            />
          </li>
          <li>
            <LinkButton
              text="🎵"
              buttonWidth={isSp ? 250 : 350}
              textSize={20}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
