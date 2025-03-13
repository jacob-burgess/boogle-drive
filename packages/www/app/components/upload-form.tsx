import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Resource } from "sst";

const getUploadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.Storage.name,
  });
  const url = await getSignedUrl(new S3Client({}), command);
  return url;
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

        const file = (e.target as HTMLFormElement).file.files?.[0] ?? null;

        const image = await fetch(url, {
          body: file,
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "Content-Disposition": `attachment; filename="${file.name}"`,
          },
        });

        window.location.href = image.url.split("?")[0];
      }}
    >
      <input name="file" type="file" accept="image/png, image/jpeg" />
      <button type="submit">Upload</button>
    </form>
  );
}
