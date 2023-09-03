import React from "react";

import geometry68 from "~/assets/images/geometry68.svg";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { framerMotion } from "~/libs/framer-motion";

import { PAGE_PATH } from "~/const";

import { SimpleAnimation } from "~/components/common/animation/SimpleAnimation";
import { LinkButton } from "~/components/common/button/LinkButton";

import classes from "~/components/pages/top/Top.module.scss";

const BUTTON_PROPERtY = {
  TEXT_SIZE: 20,
  WIDTH: { PC: 350, SP: 250 },
  LIST: [
    { TEXT: "Profile", TO: PAGE_PATH.PROFILE },
    { TEXT: "Products", TO: PAGE_PATH.PRODUCTS },
    { TEXT: "🎵 ※工事中", TO: PAGE_PATH.MUSIC_PLAYER },
  ],
} as const;

const DEFAULT_DELAY_SECOND = 0.5;

export const Top: React.FC = () => {
  const { isSp } = useMediaQuery();
  const { animationProperty } = framerMotion();

  const animateProps = animationProperty.riseFromBelow.animate;

  const getTransitionProps = (delay: number) => {
    return { ...animationProperty.riseFromBelow.transition, delay: delay };
  };

  return (
    <div className={classes.content}>
      <div className={classes["left-content"]}>
        <SimpleAnimation
          componentType="p"
          animateProps={animateProps}
          transitionProps={getTransitionProps(0)}
        >
          welcome
        </SimpleAnimation>
        <SimpleAnimation
          componentType="div"
          animateProps={animateProps}
          transitionProps={getTransitionProps(DEFAULT_DELAY_SECOND)}
        >
          <img className={classes["nazo-image"]} src={geometry68} />
        </SimpleAnimation>
      </div>
      <div className={classes["right-content"]}>
        <ul>
          {BUTTON_PROPERtY.LIST.map((button, index) => {
            return (
              <SimpleAnimation
                key={button.TEXT}
                componentType="li"
                animateProps={animateProps}
                transitionProps={getTransitionProps(
                  DEFAULT_DELAY_SECOND + (index + 1) * DEFAULT_DELAY_SECOND,
                )}
              >
                <LinkButton
                  text={button.TEXT}
                  buttonWidth={
                    isSp ? BUTTON_PROPERtY.WIDTH.SP : BUTTON_PROPERtY.WIDTH.PC
                  }
                  textSize={BUTTON_PROPERtY.TEXT_SIZE}
                  to={button.TO}
                ></LinkButton>
              </SimpleAnimation>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
