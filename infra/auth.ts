import { domain } from "./dns";

const AUTH_DOMAIN = "auth." + domain;

export const auth = new sst.aws.Auth("AuthServer", {
  issuer: "./packages/auth/src/issuer.handler",
  domain: {
    name: AUTH_DOMAIN,
    redirects: ["www." + AUTH_DOMAIN],
    dns: sst.cloudflare.dns(),
  },
});

export const outputs = {
  auth: auth.url,
};
