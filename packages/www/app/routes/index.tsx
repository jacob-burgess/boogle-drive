import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { auth, loginFn, logoutFn } from "./-functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const subject = await auth();
    return { subject };
  },
});

function Home() {
  const { subject } = Route.useLoaderData();

  const login = useServerFn(loginFn);
  const logout = useServerFn(logoutFn);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-6xl font-bold">Welcome to Boogle!</h1>
      <div className="flex flex-col gap-2">
        {subject ? (
          <>
            <p>You are logged in as {subject.properties.email}</p>
            <Button onClick={() => logout()}>Logout</Button>
          </>
        ) : (
          <>
            <p>You are not logged in</p>
            <Button onClick={() => login()}>Login</Button>
          </>
        )}
      </div>
    </div>
  );
}
