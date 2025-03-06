import { domain } from "./dns";
import { email } from "./email";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./secrets";

const AUTH_DOMAIN = "auth." + domain;

export const auth = new sst.aws.Auth("AuthServer", {
  issuer: {
    handler: "./packages/auth/src/issuer.handler",
    link: [
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET,
      email,
    ],
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
