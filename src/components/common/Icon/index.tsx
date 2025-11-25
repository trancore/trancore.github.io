import { Bars3Icon } from "@heroicons/react/24/outline";
import { cn } from "~/utils/cn";

const ICON: Record<IconType, IconComponent> = {
  BARS: Bars3Icon,
};
const ICON_TYPE = "BARS";
const ICON_SIZE_PIXEL = 24 | 32 | 48;
const ICON_SIZE: Record<IconSizePixel, string> = {
  24: "size-6",
  32: "size-8",
  48: "size-12",
};

type IconType = typeof ICON_TYPE;
type IconSizePixel = typeof ICON_SIZE_PIXEL;
type IconComponent = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

type Props = {
  /** アイコンの種類 */
  type: IconType;
  /**
   * アイコンの色\
   * stroke-xxxで指定
   */
  color?: string;
  /** アイコンのサイズ(px) */
  size?: IconSizePixel;
  /** クリック時の挙動 */
  onClick?: () => void;
};

export default function Icon({
  type,
  color = "stroke-black",
  size = 24,
  onClick,
}: Props) {
  const IconComponent = ICON[type];
  const sizeClass = ICON_SIZE[size];

  return (
    <IconComponent
      className={cn(`${sizeClass} ${color}`, "size", {})}
      onClick={onClick}
    />
  );
}
