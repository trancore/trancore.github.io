import React from "react";

import "~/components/common/button/LinkButton.modules.scss";

const DEFAULT_TEXT_SIZE = 12;
const DEFAULT_BUTTON_WIDTH = 350;

type TextSize = typeof DEFAULT_TEXT_SIZE | 14 | 16 | 20;
type ButtonWidth = typeof DEFAULT_BUTTON_WIDTH;

type Props = {
  text: string;
  buttonWidth?: ButtonWidth;
  textSize?: TextSize;
};

export const LinkButton: React.FC<Props> = ({
  buttonWidth = DEFAULT_BUTTON_WIDTH,
  text,
  textSize = DEFAULT_TEXT_SIZE,
}) => {
  const linkButtonStyle: React.CSSProperties = {
    width: buttonWidth,
    fontSize: textSize,
  };

  return (
    <div className="linkButton" style={linkButtonStyle}>
      <p className="linkButton_text">{text}</p>
    </div>
  );
};