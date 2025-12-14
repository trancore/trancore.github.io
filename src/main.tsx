import { createRouter, RouterProvider } from "@tanstack/react-router";

import * as TanStackQueryProvider from "~/integrations/tanstackQuery/rootProvider";
import { routeTree } from "~/routeTree.gen";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";

import "swiper/css";
import "swiper/css/navigation";

import reportWebVitals from "~/reportWebVitals.ts";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
