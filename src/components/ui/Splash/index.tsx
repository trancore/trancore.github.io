import LinkButton from "~/components/common/Link/LinkButton";
import type { To } from "~/types/route";
import { cn } from "~/utils/cn";

type Props = {
  title: string;
  descriptions: string[];
  linkButtton?: {
    href: To;
    label: string;
  };
  /** 背景色。tailwindCSSのbg-xxxで指定可能 */
  backgroundColor?: string;
};

export default function Splash({
  title,
  descriptions,
  linkButtton,
  backgroundColor = "bg-white",
}: Props) {
  return (
    <div className={cn("py-6", `${backgroundColor}`)}>
      <div className={cn("m-auto max-w-7xl p-6", "flex flex-col")}>
        <h1 className={cn("font-bold text-6xl")}>{title}</h1>
        <div className={cn("py-2")}>
          {descriptions.length > 0 &&
            descriptions.map((description, index) => (
              <p key={`description-${String(index)}`} className={cn("text-lg")}>
                {description}
              </p>
            ))}
        </div>
        {linkButtton && (
          <span className={cn("pt-1.5")}>
            <LinkButton
              backgroundColor="bg-blue-500"
              text={linkButtton.label}
              to={linkButtton.href}
            />
          </span>
        )}
      </div>
    </div>
  );
}
