import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/products")({
  component: Products,
});

function Products() {
  return <div>Products</div>;
}
