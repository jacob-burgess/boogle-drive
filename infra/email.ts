import { domain } from "./dns";

export const email = new sst.aws.Email("Email", {
  sender: domain,
  dns: sst.cloudflare.dns(),
});

export const outputs = {
  email: email.sender,
};
