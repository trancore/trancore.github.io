import { createFileRoute } from "@tanstack/react-router";

import Home from "~/components/page/Home";

export const Route = createFileRoute("/_app/")({
  component: Home,
});
