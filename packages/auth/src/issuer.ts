import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { issuer } from "@openauthjs/openauth/issuer";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { GoogleProvider } from "@openauthjs/openauth/provider/google";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { subjects } from "./subjects";

const client = new SESv2Client();

const app = issuer({
  providers: {
    github: GithubProvider({
      clientID: Resource.GITHUB_CLIENT_ID.value,
      clientSecret: Resource.GITHUB_CLIENT_SECRET.value,
      scopes: ["user:email"],
    }),
    google: GoogleProvider({
      clientID: Resource.GOOGLE_CLIENT_ID.value,
      clientSecret: Resource.GOOGLE_CLIENT_SECRET.value,
      scopes: ["email", "profile"],
    }),
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
    console.log("ctx", ctx);
    console.log("value", value);
    let userId: number;
    if (value.provider === "github") {
      // lookup user or create user
      userId = 1;
    }

    return ctx.subject("user", {
      userId: 1,
      email: "test@test.com",
    });
  },
});

export const handler = handle(app);
