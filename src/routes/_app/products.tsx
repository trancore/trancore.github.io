import { createFileRoute } from "@tanstack/react-router";

import Products from "~/components/page/Products";

export const Route = createFileRoute("/_app/products")({
  component: Products,
});
