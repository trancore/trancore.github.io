import React from "react";

import { Outlet, useLocation } from "react-router-dom";

import { PATH } from "~/const";

import { Header } from "~/components/common/header/Header";

import "~/components/common/layout/Layout.modules.scss";

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="page">
      {pathname !== PATH.TOP && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
