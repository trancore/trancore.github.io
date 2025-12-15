import { TabGroup, TabList } from "@headlessui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Tab from "~/components/common/Tab";

const meta = {
  component: Tab,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (story) => (
      <TabGroup>
        <TabList>{story}</TabList>
      </TabGroup>
    ),
  ],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const active: Story = {
  args: {
    text: "active",
    isActive: true,
    onClick: () => {},
  },
};

export const inactive: Story = {
  args: {
    text: "inactive",
    isActive: false,
    onClick: () => {},
  },
};
