import LinkButton from "~/components/common/Link/LinkButton";
import type { To } from "~/types/route";
import { cn } from "~/utils/cn";

type Props = {
  title: string;
  descriptions: string[];
  linkButtton: {
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
      <div className={cn("p-6 m-auto max-w-7xl", "flex flex-col")}>
        <h1 className={cn("text-6xl font-bold")}>{title}</h1>
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
              text="View My Products"
              to="/products"
              backgroundColor="bg-blue-500"
            />
          </span>
        )}
      </div>
    </div>
  );
}
