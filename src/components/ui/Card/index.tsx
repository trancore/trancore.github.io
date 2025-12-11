import { cn } from "~/utils/cn";
import { getRandomEmoji } from "~/utils/emoji";

type Props = {
  card: {
    hasEmoji?: boolean;
    imgSrc?: string;
    title: string;
    description: string;
    url: string;
  };
};

export default function Card({ card }: Props) {
  const { hasEmoji, imgSrc, title, description, url } = card;

  return (
    <div
      className={cn(
        "max-w-xs p-4",
        "rounded-lg border-2 border-gray-100 shadow-xl",
      )}
    >
      <div className={cn("mb-4", "flex justify-center")}>
        {hasEmoji && <p className={cn("text-4xl")}>{getRandomEmoji()}</p>}
        {imgSrc && (
          <img
            alt="画像"
            src={imgSrc}
            height={500}
            width={300}
            className={cn("")}
          />
        )}
      </div>
      <p className={cn("mb-2", "font-bold", "line-clamp-1")}>{title}</p>
      <p className={cn("mb-2", "text-gray-500 text-sm", "line-clamp-3")}>
        {description}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("font-bold text-blue-500 hover:underline")}
      >
        ＞＞＞
      </a>
    </div>
  );
}
