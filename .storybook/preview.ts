import type { Decorator, Preview } from "@storybook/react-vite";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import React from "react";

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
  },
  decorators: [RouterDecorator],
};

export default preview;
