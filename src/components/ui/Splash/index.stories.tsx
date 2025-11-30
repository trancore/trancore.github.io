import type { Meta, StoryObj } from "@storybook/react-vite";
import Splash from "~/components/ui/Splash";

const meta = {
  component: Splash,
} satisfies Meta<typeof Splash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    title: "Home",
    descriptions: ["Welcome to My WebPage !!!", "ようこそ！"],
    linkButtton: {
      href: "/about",
      label: "View About Me",
    },
    backgroundColor: "bg-gray-200",
  },
};

export const About: Story = {
  args: {
    title: "About Me",
    descriptions: [
      "私のことについて紹介します。",
      "学歴、スキル、取得した資格について記載しています。",
    ],
    linkButtton: {
      href: "/products",
      label: "View My Products",
    },
    backgroundColor: "bg-blue-200",
  },
};

export const Products: Story = {
  args: {
    title: "My Products",
    descriptions: ["", ""],
    linkButtton: {
      href: "/about",
      label: "Back to Home",
    },
    backgroundColor: "bg-emerald-200",
  },
};
