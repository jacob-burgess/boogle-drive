export const bucket = new sst.aws.Bucket("Storage", {
  access: "public",
});

export const outputs = {
  bucket: bucket.domain,
};
