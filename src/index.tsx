import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "~/components/common/Layout";
import { Route } from "~/components/common/route/Route";
import "~/index.modules.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Layout>
      <Route />
    </Layout>
  </React.StrictMode>,
);

// https://create-react-app.dev/docs/measuring-performance/
// reportWebVitals();
