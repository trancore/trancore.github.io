import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "~/components/common/Button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const File: Story = {
  args: {
    type: "file",
    text: "ファイル選択",
  },
};

export const Event: Story = {
  args: {
    type: "event",
    text: "イベントボタン",
  },
};
