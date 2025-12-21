import type { Meta, StoryObj } from "@storybook/react-vite";

import Menu from "~/components/ui/Menu";

const meta = {
  component: Menu,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    close: {
      onClick: () => {},
    },
  },
};
