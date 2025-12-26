import type { Meta, StoryObj } from "@storybook/react-vite";

import Header from "~/components/ui/Header";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const active_home: Story = {
  args: {
    hamburgerMenu: {
      onClick: () => {},
    },
  },
};
