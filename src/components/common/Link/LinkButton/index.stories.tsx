import type { Meta, StoryObj } from "@storybook/react-vite";
import LinkButton from "~/components/common/Link/LinkButton";

const meta = {
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "View My Products",
    to: "/products",
  },
};
