import Carousel from "~/components/common/Carousel";
import Card from "~/components/ui/Card";
import Section from "~/components/ui/Section";
import Splash from "~/components/ui/Splash";
import webArticles from "~/consts/webArticles.json";
import { cn } from "~/utils/cn";

export default function Home() {
  console.log("🚀 ~ webArticle:", webArticles);

  return (
    <>
      <Splash
        title="Home"
        descriptions={["Welcome to My WebPage !!!", "ようこそ！"]}
        linkButtton={{ href: "/about", label: "View About Me" }}
        backgroundColor="bg-gray-200"
      />
      <div className={cn("m-auto max-w-7xl p-6")}>
        <Section title="Recent Articles">
          <Carousel
            slides={[
              <Card
                key={1}
                card={{
                  hasEmoji: true,
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={2}
                card={{
                  hasEmoji: true,
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={3}
                card={{
                  hasEmoji: true,
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={4}
                card={{
                  hasEmoji: true,
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
            ]}
          />
        </Section>
        <Section title="Web Articles">
          <Carousel
            slides={[
              <Card
                key={1}
                card={{
                  imgSrc: "https://placehold.jp/500x300.png",
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={2}
                card={{
                  imgSrc: "https://placehold.jp/500x300.png",
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={3}
                card={{
                  imgSrc: "https://placehold.jp/500x300.png",
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
              <Card
                key={4}
                card={{
                  imgSrc: "https://placehold.jp/500x300.png",
                  title:
                    "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
                  description:
                    "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
                  url: "/",
                }}
              />,
            ]}
          />
        </Section>
      </div>
    </>
  );
}
