import React, { ReactNode } from "react";

import { AnimationProps, motion } from "framer-motion";

type Props = {
  componentType: string;
  animateProps: AnimationProps["animate"];
  transitionProps: AnimationProps["transition"];
  children: ReactNode;
};

export const SimpleAnimation: React.FC<Props> = ({
  componentType,
  animateProps,
  transitionProps,
  children,
}) => {
  const MotionComponent = motion(componentType);

  return (
    <MotionComponent animate={animateProps} transition={transitionProps}>
      {children}
    </MotionComponent>
  );
};
