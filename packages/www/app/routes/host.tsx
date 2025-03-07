import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getHeader } from "@tanstack/react-start/server";
import { useState } from "react";

export const getHost = createServerFn({ method: "GET" }).handler(async () => {
  return getHeader("host");
});

export const Route = createFileRoute("/host")({
  component: RouteComponent,
});

function RouteComponent() {
  const [host, setHost] = useState<string>();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col gap-2">
        <Button
          onClick={async () => {
            setHost(await getHost());
          }}
        >
          Get Host
        </Button>
        <p>{host}</p>
      </div>
    </div>
  );
}
