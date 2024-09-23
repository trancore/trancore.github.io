import { FC, useLayoutEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import { PAGE_PATH } from "~/const";

import { Header } from "~/components/common/header/Header";

import classes from "~/components/common/layout/Layout.module.scss";

export const Layout: FC = () => {
  const { pathname } = useLocation();
  const [hasHeader, setHasHeader] = useState(true);

  useLayoutEffect(() => {
    setHasHeader(
      pathname === PAGE_PATH.PRODUCTS.toString() ||
        pathname === PAGE_PATH.PROFILE.toString(),
    );
  });

  return (
    <div className={classes.page}>
      {hasHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
