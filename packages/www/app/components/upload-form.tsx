import { auth } from "@/routes/-functions";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Resource } from "sst";
import { Button } from "@/components/ui/button";
import { Item } from "@boogle/core/item/item";

const getUploadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const subject = await auth();
  if (!subject) {
    throw new Error("Unauthorized");
  }

  const command = new PutObjectCommand({
    Key: `${subject.properties.userId}/${crypto.randomUUID()}`,
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

export function UploadForm() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getUploadUrl().then(setUrl);
  }, []);

  if (!url) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const subject = await auth();
        if (!subject) {
          throw new Error("Unauthorized");
        }

        const file = (e.target as HTMLFormElement).file.files?.[0] ?? null;

        const image = await fetch(url, {
          body: file,
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "Content-Disposition": `attachment; filename="${file.name}"`,
          },
        });

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
      }}
      className="flex gap-2"
    >
      <input name="file" type="file" accept="image/png, image/jpeg" />
      <Button type="submit">Upload</Button>
    </form>
  );
}
