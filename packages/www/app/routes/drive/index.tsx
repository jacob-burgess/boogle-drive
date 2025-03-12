import { createFileRoute } from "@tanstack/react-router";
import { UploadForm } from "@/components/upload-form";
import { createServerFn } from "@tanstack/react-start";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resource } from "sst";
import { useState } from "react";
import { useEffect } from "react";

const getUploadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.Storage.name,
  });
  const url = await getSignedUrl(new S3Client({}), command);
  return url;
});

export const Route = createFileRoute("/drive/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    getUploadUrl().then(setUrl);
  }, []);

  if (!url) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1">
      <UploadForm url={url!} />
    </div>
  );
}
