import React, { ReactNode } from "react";

import { AnimationProps, motion } from "framer-motion";

type Props = {
  componentType: string;
  animateProps: AnimationProps["animate"];
  transitionProps: AnimationProps["transition"];
  children: ReactNode;
};

/**
 * SimpleAnimation Component
 * @description 属性を必要とするHTMl要素にこのコンポーネントを使用する場合は、componentType=divにし、childrenにその要素を渡す。
 *
 * @return {React.FC<Props>} SimpleAnimation
 */
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
