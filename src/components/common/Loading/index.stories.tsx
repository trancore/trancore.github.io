import type { Meta, StoryObj } from "@storybook/react-vite";

import Loading from "~/components/common/Loading";

const meta = {
  component: Loading,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    type: "spinner",
  },
};
