import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PATH } from "~/const";

import { Layout } from "~/components/common/layout/Layout";
import { Error } from "~/components/pages/error/Error";
import { MusicPlayer } from "~/components/pages/music-player/MusicPlayer";
import { Products } from "~/components/pages/products/Products";
import { Profile } from "~/components/pages/profile/Profile";
import { Top } from "~/components/pages/top/Top";

export const Route: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: PATH.TOP,
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Top />,
        },
        {
          path: PATH.PROFILE,
          element: <Profile />,
        },
        {
          path: PATH.PRODUCTS,
          element: <Products />,
        },
        { path: PATH.MUSIC_PLAYER, element: <MusicPlayer /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
