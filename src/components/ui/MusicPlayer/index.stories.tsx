import type { Meta, StoryObj } from "@storybook/react-vite";

import MusicPlayer from "~/components/ui/MusicPlayer";

const meta = {
  component: MusicPlayer,
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    themeColor: "green",
  },
};
