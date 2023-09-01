import React from "react";

import geometry68 from "~/assets/images/geometry68.svg";
import { useMediaQuery } from "~/hooks/useMediaQuery";

import { PAGE_PATH } from "~/const";

import { SimpleAnimation } from "~/components/common/animation/SimpleAnimation";
import { LinkButton } from "~/components/common/button/LinkButton";

import classes from "~/components/pages/top/Top.module.scss";

const BUTTON = {
  TEXT_SIZE: 20,
  WIDTH: { PC: 250, SP: 350 },
  LIST: [
    { TEXT: "Profile", TO: PAGE_PATH.PROFILE },
    { TEXT: "Products", TO: PAGE_PATH.PRODUCTS },
    { TEXT: "🎵 ※工事中", TO: PAGE_PATH.MUSIC_PLAYER },
  ],
} as const;

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
          {BUTTON.LIST.map((button) => {
            return (
              <li key={button.TEXT}>
                <LinkButton
                  text={button.TEXT}
                  buttonWidth={isSp ? BUTTON.WIDTH.SP : BUTTON.WIDTH.PC}
                  textSize={BUTTON.TEXT_SIZE}
                  to={button.TO}
                ></LinkButton>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
