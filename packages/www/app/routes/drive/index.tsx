import { UploadDialog } from "@/components/upload-dialog";
import { Item } from "@boogle/core/item/item";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DataTable } from "@/components/files-table/data-table";
import { columns } from "@/components/files-table/columns";
import { loggingMiddleware, authMiddleware } from "@/server/middleware";

const getFiles = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, authMiddleware])
  .handler(async ({ context }) => {
    const files = await Item.byOwner(context.subject.userId);
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
  const { files } = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col gap-2 p-8">
        <div className="flex flex-row items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Drive</h1>
          <UploadDialog />
        </div>
        <DataTable columns={columns} data={files} />
      </div>
    </div>
  );
}
