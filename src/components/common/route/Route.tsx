import React, { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "~/components/App";
import { Error } from "~/components/pages/error/Error";
import { MusicPlayer } from "~/components/pages/music-player/MusicPlayer";
import { Products } from "~/components/pages/products/Products";
import { Profile } from "~/components/pages/profile/Profile";

export const Route: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "musicplayer",
      element: <MusicPlayer />,
    },
  ]);

  return <RouterProvider router={router} />;
};
