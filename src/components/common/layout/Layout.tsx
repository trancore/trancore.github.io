import React, { FC, ReactNode } from "react";

import { Header } from "~/components/common/header/Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="page">
      <Header />
      {children}
    </div>
  );
};
