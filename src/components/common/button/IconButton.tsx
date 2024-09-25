import { ComponentProps, FC } from "react";

import { Icon } from "../icon/Icon";

import classes from "~/components/common/button/IconButton.module.scss";

type Props = {
  icon: ComponentProps<typeof Icon>;
  onclick: () => void;
};

export const IconButton: FC<Props> = ({ icon, onclick }) => {
  const { name, size, color } = icon;

  return (
    <button className={classes["icon-button"]} onClick={onclick}>
      <Icon name={name} size={size} color={color}></Icon>
    </button>
  );
};
