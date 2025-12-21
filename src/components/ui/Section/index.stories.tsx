import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "~/components/ui/Card";
import Carousel from "~/components/ui/Carousel";
import Section from "~/components/ui/Section";

const meta = {
  component: Section,
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RecentArticles: Story = {
  args: {
    title: "Recent Articles",
    children: (
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
    ),
  },
};

export const RecentBooks: Story = {
  args: {
    title: "Recent Books",
    children: (
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
    ),
  },
};
