import { auth } from "@/server/functions/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Resource } from "sst";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item } from "@boogle/core/item/item";
import { authMiddleware } from "@/server/middleware";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const getUploadUrl = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const command = new PutObjectCommand({
      Key: `${context.subject.userId}/${crypto.randomUUID()}`,
      Bucket: Resource.Storage.name,
    });
    const url = await getSignedUrl(new S3Client({}), command);
    return url;
  });

const saveFile = createServerFn({ method: "POST" })
  .validator(Item.Create)
  .handler(async (input) => {
    const response = await Item.create(input.data);
    return response;
  });

export function UploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [url, setUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getUploadUrl().then(setUrl);
  }, []);

  if (!url) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
          const subject = await auth();
          if (!subject) {
            throw new Error("Unauthorized");
          }

          const file = (e.target as HTMLFormElement).file.files?.[0] ?? null;
          if (!file) {
            throw new Error("No file selected");
          }

          const image = await fetch(url, {
            body: file,
            method: "PUT",
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `attachment; filename="${file.name}"`,
            },
          });

          if (!image.ok) {
            throw new Error("Failed to upload file");
          }

          await saveFile({
            data: {
              name: file.name,
              url: image.url.split("?")[0],
              type: "file" as const,
              ownerId: subject.properties.userId,
              size: file.size ?? 0,
              mimeType: file.type ?? null,
            },
          });

          toast.success("File uploaded successfully");
          onSuccess?.();
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to upload file"
          );
        } finally {
          setIsUploading(false);
        }
      }}
      className="space-y-4"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          name="file"
          type="file"
          accept="image/png, image/jpeg"
          disabled={isUploading}
        />
      </div>
      <Button type="submit" disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </form>
  );
}
