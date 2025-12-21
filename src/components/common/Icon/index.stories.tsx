import type { Meta, StoryObj } from "@storybook/react-vite";

import Icon from "~/components/common/Icon";

const meta = {
  component: Icon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bars: Story = {
  args: {
    type: "BARS",
    size: 48,
  },
};

export const Facdbook: Story = {
  args: {
    type: "FACEBOOK",
    size: 48,
  },
};

export const Github: Story = {
  args: {
    type: "GITHUB",
    size: 48,
  },
};

export const Hatena: Story = {
  args: {
    type: "HATENA",
    size: 48,
  },
};

export const Linkedin: Story = {
  args: {
    type: "LINKEDIN",
    size: 48,
  },
};

export const X: Story = {
  args: {
    type: "X",
    size: 48,
  },
};

export const Zenn: Story = {
  args: {
    type: "ZENN",
    size: 48,
  },
};
