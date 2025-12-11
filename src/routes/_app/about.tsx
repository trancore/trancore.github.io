import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about")({
  component: About,
});

function About() {
  return <div>About</div>;
}
