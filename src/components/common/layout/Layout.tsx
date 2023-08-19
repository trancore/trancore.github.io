import React from "react";

import { Outlet, useLocation } from "react-router-dom";

import { Header } from "~/components/common/header/Header";

export const Layout: React.FC = () => {
  const location = useLocation();
  console.log("🚀 ~ file: Layout.tsx:13 ~ location:", location);

  return (
    <div className="page">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
