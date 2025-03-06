import { database } from "./database";
import { domain } from "./dns";
import { email } from "./email";

const AUTH_DOMAIN = "auth." + domain;

export const auth = new sst.aws.Auth("AuthServer", {
  issuer: {
    handler: "./packages/auth/src/issuer.handler",
    link: [database, email],
  },
  domain: {
    name: AUTH_DOMAIN,
    redirects: ["www." + AUTH_DOMAIN],
    dns: sst.cloudflare.dns(),
  },
});

export const outputs = {
  auth: auth.url,
};
