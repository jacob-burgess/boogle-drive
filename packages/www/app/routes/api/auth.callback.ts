import { client, setTokens } from "@/lib/auth";
import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getHeader } from "@tanstack/react-start/server";

export const APIRoute = createAPIFileRoute("/api/auth/callback")({
  GET: async ({ request, params }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    const host = getHeader("host");
    const redirectUri = host?.includes("localhost")
      ? "http://localhost:3000"
      : "https://boogle.dev";

    const exchanged = await client.exchange(
      code!,
      `${redirectUri}/api/auth/callback`
    );

    if (exchanged.err) {
      return json({ error: exchanged.err }, { status: 400 });
    }

    setTokens(exchanged.tokens.access, exchanged.tokens.refresh);

    return Response.redirect(`${redirectUri}/drive`);
  },
});
