import React from "react";

import { useNavigate } from "react-router-dom";

import { PAGE_PATH } from "~/const";

import classes from "~/components/common/button/LinkButton.module.scss";

const DEFAULT_TEXT_SIZE = 12;
const DEFAULT_BUTTON_WIDTH = 350;

type TextSize = typeof DEFAULT_TEXT_SIZE | 14 | 16 | 20;
type ButtonWidth = 250 | typeof DEFAULT_BUTTON_WIDTH;

type Props = {
  text: string;
  buttonWidth?: ButtonWidth;
  textSize?: TextSize;
  to: (typeof PAGE_PATH)[keyof typeof PAGE_PATH];
};

export const LinkButton: React.FC<Props> = ({
  buttonWidth = DEFAULT_BUTTON_WIDTH,
  text,
  textSize = DEFAULT_TEXT_SIZE,
  to,
}) => {
  const navigate = useNavigate();

  const linkButtonStyle: React.CSSProperties = {
    width: buttonWidth,
    fontSize: textSize,
  };

  return (
    <div
      className={classes["link-button"]}
      style={linkButtonStyle}
      onClick={() => navigate(to)}
    >
      <p className={classes["link-button-text"]}>{text}</p>
    </div>
  );
};
