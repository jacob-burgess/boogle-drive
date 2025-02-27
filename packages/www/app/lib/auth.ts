import { createClient } from "@openauthjs/openauth/client";
import { setCookie } from "@tanstack/react-start/server";
import { Resource } from "sst";

export const client = createClient({
  clientID: "boogle-web",
  issuer: Resource.AuthServer.url, // url to the OpenAuth server
});

export const setTokens = (access: string, refresh: string) => {
  setCookie("access_token", access, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  setCookie("refresh_token", refresh, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};
