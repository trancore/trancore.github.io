import Icon from "~/components/common/Icon";
import { cn } from "~/utils/cn";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type Props = {
  content: {
    readme: string;
    name: string;
    description: string;
    url: string;
    code: {
      color: string;
      language: string;
    };
  };
};

export default function CardRepository({ content }: Props) {
  const { readme, name, description, url, code } = content;

  return (
    <div
      className={cn(
        "p-4",
        "flex flex-col justify-between",
        "rounded-lg border-2 border-gray-100 shadow-xl",
      )}
    >
      <div className={cn("flex flex-1 flex-col")}>
        <div
          className={cn(
            "markdown-content",
            "mb-2 h-80 p-4",
            "text-gray-500 text-sm",
            "mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] overflow-hidden",
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {readme}
          </ReactMarkdown>
        </div>
        <div className={cn("mb-1.5 gap-2", "flex items-center")}>
          <Icon type="BOOK_OPEN" size={24} />
          <p className={cn("font-bold")}>{name}</p>
        </div>
        <p className={cn("mb-2", "flex-1", "text-gray-500 text-sm")}>
          {description}
        </p>
        <div className={cn("mb-4 gap-2", "flex items-center")}>
          <div
            className={cn("mt-1 size-3", "rounded-full")}
            style={{ backgroundColor: code.color }}
          />
          <p>{code.language}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("font-bold text-blue-500 hover:underline")}
        >
          ＞＞＞
        </a>
      </div>
    </div>
  );
}
