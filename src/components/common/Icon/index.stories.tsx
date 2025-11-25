import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "~/components/common/Icon";

const meta = {
  component: Icon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bars_48: Story = {
  args: {
    type: "BARS",
    size: 48,
  },
};
