import React, { FC } from "react";
import "~/components/App.modules.scss";
import { Layout } from "~/components/common/Layout";

export const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <p>🚧工事中。。。</p>
          <p>只今作成中です。</p>
        </Layout>
      </header>
    </div>
  );
};
