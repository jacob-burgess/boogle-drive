import { UploadForm } from "@/components/upload-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/drive/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
      <UploadForm />
    </div>
  );
}
