import React, { ComponentProps } from "react";

import { framerMotion } from "~/libs/framer-motion";

import { SimpleAnimation } from "~/components/common/animation/SimpleAnimation";
import { Repository } from "~/components/ui/repository/Repository";

import classes from "~/components/pages/products/Products.module.scss";

const DEFAULT_DELAY_SECOND = 0.5;

export const Products: React.FC = () => {
  const dummyList: ComponentProps<typeof Repository>["repositry"][] = [
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description: "My portfolio site.",
      codeLanguage: "Typescript",
    },
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description: "My portfolio site.",
      codeLanguage: "Typescript",
    },
    {
      readme: "README",
      name: "trancore/trancore.github.io",
      description:
        "My portfolio site.My portfolio site.My portfolio site.My portfolio site.My portfolio site.",
      codeLanguage: "Typescript",
    },
  ];

  const { animationProperty } = framerMotion();

  const animationProps = animationProperty.riseFromBelow.animate;

  const getTransitionProps = (delay: number) => {
    return { ...animationProperty.riseFromBelow.transition, delay: delay };
  };

  return (
    <div className={classes.content}>
      <SimpleAnimation
        componentType="p"
        animateProps={animationProps}
        transitionProps={getTransitionProps(DEFAULT_DELAY_SECOND)}
      >
        Products
      </SimpleAnimation>
      <div className={classes["repository-box"]}>
        {dummyList.map((dummy, index) => (
          <div key={dummy.name} className={classes.repository}>
            <SimpleAnimation
              componentType="div"
              animateProps={animationProps}
              transitionProps={getTransitionProps(
                DEFAULT_DELAY_SECOND + (index + 1) * DEFAULT_DELAY_SECOND,
              )}
            >
              <Repository key={dummy.name} repositry={dummy} />
            </SimpleAnimation>
          </div>
        ))}
      </div>
    </div>
  );
};
