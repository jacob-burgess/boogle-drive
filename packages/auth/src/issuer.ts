import { issuer } from "@openauthjs/openauth/issuer";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { subjects } from "./subjects";
import { handle } from "hono/aws-lambda";

const app = issuer({
  providers: {
    github: GithubProvider({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scopes: ["user:email"],
    }),
  },
  // storage,
  subjects,
  success: async (ctx, value) => {
    let userId: number;
    if (value.provider === "github") {
      console.log(value.tokenset.access);
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
