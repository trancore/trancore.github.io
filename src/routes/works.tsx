import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/works")({
  component: Works,
});

function Works() {
  return;
}
