import React, { FC } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PATH } from "~/const";

import { Error } from "~/components/pages/error/Error";
import { MusicPlayer } from "~/components/pages/music-player/MusicPlayer";
import { Products } from "~/components/pages/products/Products";
import { Profile } from "~/components/pages/profile/Profile";
import { Top } from "~/components/pages/top/Top";

export const Route: FC = () => {
  const router = createBrowserRouter([
    {
      path: PATH.TOP,
      element: <Top />,
      errorElement: <Error />,
    },
    {
      path: PATH.PROFILE,
      element: <Profile />,
    },
    {
      path: PATH.PRODUCTS,
      element: <Products />,
    },
    {
      path: PATH.MUSIC_PLAYER,
      element: <MusicPlayer />,
    },
  ]);

  return <RouterProvider router={router} />;
};
