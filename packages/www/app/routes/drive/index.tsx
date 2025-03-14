import { UploadDialog } from "@/components/upload-dialog";
import { Item } from "@boogle/core/item/item";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "../-functions";

const getFiles = createServerFn({ method: "GET" }).handler(async () => {
  const subject = await auth();
  if (!subject) {
    throw new Error("Unauthorized");
  }
  const files = await Item.byOwner(subject.properties.userId);
  return files;
});

export const Route = createFileRoute("/drive/")({
  component: RouteComponent,
  loader: async () => {
    const files = await getFiles();
    return { files };
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const files = data.files;
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col gap-2 p-8">
        <div className="flex flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Drive</h1>
          <UploadDialog />
        </div>
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <div key={file.id}>{file.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
