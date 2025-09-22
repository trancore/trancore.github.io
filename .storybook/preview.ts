import type { Decorator, Preview } from "@storybook/react-vite";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";
import { themes } from "storybook/theming";

// Tanstack Router用デコレータ
const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({ component: Story });
  const routeTree = rootRoute;
  const router = createRouter({ routeTree });
  return React.createElement(RouterProvider, { router });
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark, appBg: "black" },
      light: { ...themes.normal, appBg: "white" },
    },
  },
  decorators: [RouterDecorator],
};

export default preview;
