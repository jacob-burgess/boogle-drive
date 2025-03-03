import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "./-functions";

export const Route = createFileRoute("/drive")({
  beforeLoad: async ({ context }) => {
    const subject = await auth();
    if (!subject) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/drive"!</div>;
}
