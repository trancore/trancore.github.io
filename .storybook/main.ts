import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@vueless/storybook-dark-mode",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        "~": path.resolve(__dirname, "../src"),
      };
    }

    return config;
  },
};
export default config;
