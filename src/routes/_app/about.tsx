import { createFileRoute } from "@tanstack/react-router";

import About from "~/components/page/About";

export const Route = createFileRoute("/_app/about")({
  component: About,
});
