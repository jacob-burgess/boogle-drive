import { issuer } from "@openauthjs/openauth/issuer";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { GoogleProvider } from "@openauthjs/openauth/provider/google";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import { subjects } from "./subjects";

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
  },
  // storage,
  subjects,
  success: async (ctx, value) => {
    console.log("success!");
    let userId: number;
    if (value.provider === "github") {
      console.log(value.tokenset.access);
      console.log(value);
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
