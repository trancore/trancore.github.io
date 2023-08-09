import React, { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "~/components/App";
import "~/components/App.modules.scss";
import { Error } from "~/components/pages/error/Error";

export const Route: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "profile",
          element: <App />,
        },
        {
          path: "products",
          element: <App />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
