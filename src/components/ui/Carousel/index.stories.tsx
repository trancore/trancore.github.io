import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "~/components/ui/Card";
import Carousel from "~/components/ui/Carousel";

const meta = {
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = {
  args: {
    slides: Array.from({ length: 10 }).map((_, index) => (
      <Card
        key={index.toString()}
        card={{
          hasEmoji: true,
          title:
            "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
          description:
            "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
          url: "/",
        }}
      />
    )),
  },
};

export const Books: Story = {
  args: {
    slides: Array.from({ length: 10 }).map((_, index) => (
      <Card
        key={index.toString()}
        card={{
          imgSrc: "https://placehold.jp/500x300.png",
          title:
            "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
          description:
            "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
          url: "/",
        }}
      />
    )),
  },
};
