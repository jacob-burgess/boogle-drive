import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "../-functions";

export const Route = createFileRoute("/drive")({
  beforeLoad: async ({ context }) => {
    const subject = await auth();
    if (!subject) {
      throw redirect({ to: "/" });
    }
  },
  component: DriveLayout,
});

function DriveLayout() {
  return (
    <div>
      <h1>Hello "/drive" route!</h1>
      <Outlet />
    </div>
  );
}
