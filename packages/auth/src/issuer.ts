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
          console.log(email, code);
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
  // storage,
  subjects,
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
