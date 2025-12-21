import type { Meta, StoryObj } from "@storybook/react-vite";
import Layout from "~/components/common/Layout";

const meta = {
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Layout Component Content</div>,
  },
  render: (args) => <Layout {...args} />,
};
