import Card from "~/components/ui/Card";
import Carousel from "~/components/ui/Carousel";
import Section from "~/components/ui/Section";
import Splash from "~/components/ui/Splash";
import booksJson from "~/consts/books.json";
import webArticlesJson from "~/consts/web-articles.json";
import { cn } from "~/utils/cn";

export default function Home() {
  const articles = webArticlesJson.sort((a, b) => {
    return Number(b.No) - Number(a.No);
  }) as {
    No: string;
    url: string;
    title: string;
    description: string;
    // 存在しない場合は""（空文字列）になる
    image: string;
  }[];
  const books = booksJson as {
    No: string;
    url: string;
    title: string;
    description: string;
    // 存在しない場合は""（空文字列）になる
    image: string;
  }[];

  return (
    <>
      <Splash
        title="Home"
        descriptions={["Welcome to My WebPage !!!", "ようこそ！"]}
        linkButtton={{ href: "/about", label: "View About Me" }}
        backgroundColor="bg-gray-200"
      />
      <div
        className={cn(
          "m-auto max-w-7xl p-6",
          "text-black dark:text-white",
          "bg-white dark:bg-black",
        )}
      >
        <Section title="Recent Articles - 最近読んだ記事">
          <Carousel
            slides={articles.map((article) => (
              <Card
                key={article.No}
                card={{
                  hasEmoji: article.image === "",
                  imgSrc: article.image === "" ? undefined : article.image,
                  title: article.title,
                  description: article.description,
                  url: article.url,
                }}
              />
            ))}
          />
        </Section>
        <Section title="Books - 読んだ本">
          <Carousel
            slides={books.map((book) => (
              <Card
                key={book.No}
                card={{
                  hasEmoji: book.image === "",
                  imgSrc: book.image === "" ? undefined : book.image,
                  title: book.title,
                  description: book.description,
                  url: book.url,
                }}
              />
            ))}
          />
        </Section>
      </div>
    </>
  );
}
