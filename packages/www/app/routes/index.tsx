import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Welcome!</h1>
      <Button onClick={() => router.navigate({ to: "/drive" })}>
        {"Drive ->"}
      </Button>
    </div>
  );
}
