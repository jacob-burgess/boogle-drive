import { domain } from "./dns";

const isProduction = $app.stage === "production";

export const email = new sst.aws.Email("Email", {
  sender: !isProduction ? domain : `mail.${domain}`,
  dns: sst.cloudflare.dns(),
});

export const outputs = {
  email: email.sender,
};
