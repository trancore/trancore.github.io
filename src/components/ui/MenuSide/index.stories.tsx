import type { Meta, StoryObj } from "@storybook/react-vite";

import MenuSide from "~/components/ui/MenuSide";

const meta = {
  component: MenuSide,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MenuSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuItems: [
      {
        id: "github",
        title: "GitHub",
      },
      {
        id: "musicplayer",
        title: "music player",
      },
      {
        id: "lp",
        title: "🚧 LP",
        items: ["test1", "test2", "test3", "test4", "test5"],
      },
    ],
    onClickMenuItem: () => {},
  },
};
