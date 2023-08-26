import React from "react";

import geometry68 from "~/assets/images/geometry68.svg";
import { useMediaQuery } from "~/hooks/useMediaQuery";

import { PAGE_PATH } from "~/const";

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
              to={PAGE_PATH.PROFILE}
            />
          </li>
          <li>
            <LinkButton
              text="Products"
              buttonWidth={isSp ? 250 : 350}
              textSize={20}
              to={PAGE_PATH.PRODUCTS}
            />
          </li>
          <li>
            <LinkButton
              text="🎵 ※工事中"
              buttonWidth={isSp ? 250 : 350}
              textSize={20}
              to={PAGE_PATH.MUSIC_PLAYER}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
