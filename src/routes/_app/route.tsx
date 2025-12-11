import { createFileRoute, Outlet } from "@tanstack/react-router";

import Layout from "~/components/common/Layout";

export const Route = createFileRoute("/_app")({
  component: Home,
});

function Home() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
