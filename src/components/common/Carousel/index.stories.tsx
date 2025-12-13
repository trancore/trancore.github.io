import type { Meta, StoryObj } from "@storybook/react-vite";

import Carousel from "~/components/common/Carousel";
import Card from "~/components/ui/Card";

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
