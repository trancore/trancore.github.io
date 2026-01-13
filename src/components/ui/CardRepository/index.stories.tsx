import type { Meta, StoryObj } from "@storybook/react-vite";

import CardRepository from "~/components/ui/CardRepository";

const meta = {
  component: CardRepository,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CardRepository>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: {
      readme: "This is a sample README content for the repository.",
      name: "Sample Repository",
      description: "This is a sample description for the repository.",
      url: "https://github.com/trancore/trancore.github.io",
      code: {
        color: "red",
        language: "TypeScript",
      },
    },
  },
};
