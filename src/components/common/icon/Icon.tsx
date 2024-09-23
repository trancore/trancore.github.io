import { FC } from "react";

import { ReactComponent as ArrowLeft } from "~/assets/images/icon/arrow-left:64.svg";
import { ReactComponent as Backforward } from "~/assets/images/icon/backforward_64.svg";
import { ReactComponent as Book } from "~/assets/images/icon/book_64.svg";
import { ReactComponent as Fish } from "~/assets/images/icon/fish_64.svg";
import { ReactComponent as Forward } from "~/assets/images/icon/forward_64.svg";
import { ReactComponent as Home } from "~/assets/images/icon/home_64.svg";
import { ReactComponent as Music } from "~/assets/images/icon/music_64.svg";
import { ReactComponent as Person } from "~/assets/images/icon/person_64.svg";
import { ReactComponent as Products } from "~/assets/images/icon/products_64.svg";
import { ReactComponent as Resume } from "~/assets/images/icon/resume_64.svg";

const ICONS = {
  ArrowLeft,
  Backforward,
  Book,
  Fish,
  Forward,
  Home,
  Music,
  Person,
  Products,
  Resume,
};
const DEFAULT_ICON_SIZE = 32 | 44;

type IconName = keyof typeof ICONS;
type IconSize = 24 | typeof DEFAULT_ICON_SIZE;

type Props = {
  name: IconName;
  size?: IconSize;
  color?: string;
};

export const Icon: FC<Props> = ({
  name,
  size = DEFAULT_ICON_SIZE,
  color = "#FFFFFF",
}) => {
  const Icon = ICONS[name];
  return (
    <>
      <Icon width={size} height={size} fill={color} />
    </>
  );
};
