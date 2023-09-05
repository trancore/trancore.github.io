/**
 * framer-motionに関するファイル
 * @see https://www.framer.com/motion/
 * @returns animationProperty アニメーションの設定値
 */
export const framerMotion = () => {
  const animationProperty = {
    riseFromBelow: {
      animate: { y: [50, 0], opacity: [0, 1] },
      transition: { ease: "easeIn", duration: 1.0 },
    },
    rotate: {
      animate: { rotate: 360 },
      transition: { ease: "linear", repeat: Infinity, duration: 9 },
    },
  };

  return { animationProperty };
};
