import { auth } from "./auth";
import { database } from "./database";
import { domain } from "./dns";
import { bucket } from "./storage";

const www = new sst.aws.TanstackStart("WWW", {
  domain: {
    name: domain,
    redirects: ["www." + domain],
    dns: sst.cloudflare.dns(),
  },
  path: "./packages/www",
  link: [auth, bucket, database],
});

export const outputs = {
  www: www.url,
};
