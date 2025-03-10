import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { issuer } from "@openauthjs/openauth/issuer";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { subjects } from "./subjects";
import { User } from "@boogle/core/user/user";

const client = new SESv2Client();

const app = issuer({
  providers: {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          const command = new SendEmailCommand({
            FromEmailAddress: "mail@" + Resource.Email.sender,
            Destination: {
              ToAddresses: [email],
            },
            Content: {
              Simple: {
                Subject: { Data: "Boogle Auth Code" },
                Body: { Text: { Data: `Your code is ${code}.` } },
              },
            },
          });
          await client.send(command);
        },
      })
    ),
  },
  subjects,
  allow: async (input, req) => {
    console.log("REDIRECT_URI", input.redirectURI);
    // Allow localhost for development
    if (input.redirectURI.includes("localhost")) {
      return true;
    }

    // Allow specific production domains
    const allowedDomains = ["https://www.boogle.com", "https://boogle.com"];

    return allowedDomains.some((domain) => input.redirectURI === domain);
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      // lookup user or create user
      let user = await User.byEmail(value.email);
      if (!user) {
        await User.create({ email: value.email, name: value.email });
        user = await User.byEmail(value.email);
      }
      return ctx.subject("user", {
        userId: user!.id,
        email: user!.email,
      });
    }

    return ctx.subject("user", {
      userId: 1,
      email: "test@test.com",
    });
  },
});

export const handler = handle(app);
