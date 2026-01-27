import {
  BackwardIcon,
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ComputerDesktopIcon,
  EllipsisVerticalIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";

import FacebookIcon from "~/assets/images/icons/facebook.svg?react";
import GithubIcon from "~/assets/images/icons/github.svg?react";
import HatenaIcon from "~/assets/images/icons/hatena.svg?react";
import LinkedinIcon from "~/assets/images/icons/linkedin.svg?react";
import XIcon from "~/assets/images/icons/x.svg?react";
import ZennIcon from "~/assets/images/icons/zenn.svg?react";
import { cn } from "~/utils/cn";

type IconType =
  | "BACKWARD"
  | "BARS"
  | "BOOK_OPEN"
  | "CHEVRON_DOWN"
  | "CHEVRON_UP"
  | "COMPUTER_DESKTOP"
  | "ELLIPSIS_VERTICAL"
  | "FORWARD"
  | "MUSICAL_NOTE"
  | "PAUSE"
  | "PLAY"
  | "X_MARK"
  | "FACEBOOK"
  | "GITHUB"
  | "HATENA"
  | "LINKEDIN"
  | "X"
  | "ZENN";
type IconSizePixel = 16 | 24 | 32 | 48;
type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;
type Props = {
  /** アイコンの種類 */
  type: IconType;
  /**
   * アイコンの塗り色\
   * fill-xxxで指定
   */
  fillColor?: string;
  /**
   * アイコンのストローク色\
   * stroke-xxxで指定
   */
  strokeColor?: string;
  /** アイコンのサイズ(px) */
  size?: IconSizePixel;
  /** クリック時の挙動 */
  onClick?: () => void;
};

const ICON: Record<IconType, IconComponent> = {
  BACKWARD: BackwardIcon,
  BARS: Bars3Icon,
  BOOK_OPEN: BookOpenIcon,
  CHEVRON_DOWN: ChevronDownIcon,
  CHEVRON_UP: ChevronUpIcon,
  COMPUTER_DESKTOP: ComputerDesktopIcon,
  ELLIPSIS_VERTICAL: EllipsisVerticalIcon,
  FORWARD: ForwardIcon,
  MUSICAL_NOTE: MusicalNoteIcon,
  PAUSE: PauseIcon,
  PLAY: PlayIcon,
  X_MARK: XMarkIcon,
  FACEBOOK: FacebookIcon,
  GITHUB: GithubIcon,
  HATENA: HatenaIcon,
  LINKEDIN: LinkedinIcon,
  X: XIcon,
  ZENN: ZennIcon,
};

const ICON_SIZE: Record<IconSizePixel, string> = {
  16: "size-4",
  24: "size-6",
  32: "size-8",
  48: "size-12",
};

export default function Icon({
  type,
  fillColor,
  strokeColor,
  size = 24,
  onClick,
}: Props) {
  const IconComponent = ICON[type];
  const sizeClass = ICON_SIZE[size];

  return (
    <IconComponent
      className={cn(sizeClass, fillColor, strokeColor)}
      onClick={onClick}
    />
  );
}
