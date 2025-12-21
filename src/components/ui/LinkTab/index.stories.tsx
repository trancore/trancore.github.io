import { TabGroup, TabList } from "@headlessui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import LinkTab from "~/components/ui/LinkTab";

const meta = {
  component: LinkTab,
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
} satisfies Meta<typeof LinkTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const active: Story = {
  args: {
    text: "active",
    to: "/",
    isActive: true,
  },
};

export const inactive: Story = {
  args: {
    text: "inactive",
    to: "/",
    isActive: false,
  },
};
