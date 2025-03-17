import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { auth } from "@/server/functions/auth";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

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
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <hr />
      <main className="flex-1">
        <Outlet />
      </main>
      <hr />
      <AppFooter />
    </div>
  );
}
