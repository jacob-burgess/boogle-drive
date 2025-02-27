import { client, setTokens } from "@/lib/auth";
import { subjects } from "@boogle/auth/subjects";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  getHeader,
} from "@tanstack/react-start/server";

export const auth = createServerFn({ method: "GET" }).handler(async () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  if (!accessToken) {
    return null;
  }

  const verified = await client.verify(subjects, accessToken, {
    refresh: refreshToken ?? undefined,
  });

  if (verified.err) {
    return null;
  }

  if (verified.tokens) {
    setTokens(verified.tokens.access, verified.tokens.refresh);
  }

  return verified.subject;
});

export const loginFn = createServerFn({ method: "GET" }).handler(async () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  if (accessToken) {
    const verified = await client.verify(subjects, accessToken, {
      refresh: refreshToken ?? undefined,
    });
    if (!verified.err && verified.tokens) {
      setTokens(verified.tokens.access, verified.tokens.refresh);
      throw redirect({ to: "/drive" });
    }
  }

  const host = getHeader("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const { url } = await client.authorize(
    `${protocol}://${host}/api/auth/callback`,
    "code"
  );

  throw redirect({ href: url });
});

export const logoutFn = createServerFn({ method: "GET" }).handler(async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");

  throw redirect({ to: "/" });
});
