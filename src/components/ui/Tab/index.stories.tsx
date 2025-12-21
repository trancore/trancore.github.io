import { TabGroup, TabList } from "@headlessui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Tab from "~/components/ui/Tab";

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

export const Default: Story = {
  args: {
    text: "example",
  },
};

export const LongText: Story = {
  args: {
    text: "Long Long Long Long Long Long Long Long Long Long Text",
  },
};
