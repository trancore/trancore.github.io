import type { Meta, StoryObj } from "@storybook/react-vite";

import Card from "~/components/ui/Card";

const meta = {
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    card: {
      hasEmoji: true,
      title:
        "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
      description:
        "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
      url: "/",
    },
  },
};

export const Book: Story = {
  args: {
    card: {
      imgSrc: "https://placehold.jp/500x300.png",
      title:
        "タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル",
      description:
        "説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明",
      url: "/",
    },
  },
};
