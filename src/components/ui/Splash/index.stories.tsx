import type { Meta, StoryObj } from "@storybook/react-vite";
import Splash from "~/components/ui/Splash";

const meta = {
  component: Splash,
} satisfies Meta<typeof Splash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    title: "About Me",
    descriptions: [
      "私のことについて紹介します。",
      "学歴、スキル、資格について記載しています。",
    ],
    linkButtton: {
      href: "/products",
      label: "View My Products",
    },
    backgroundColor: "bg-blue-200",
  },
};
