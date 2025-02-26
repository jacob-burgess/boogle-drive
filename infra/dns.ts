const ROOT_DOMAIN = "boogle.dev";

const permanent = {
  production: ROOT_DOMAIN,
  dev: "dev." + ROOT_DOMAIN,
} as Record<string, string>;

export const domain = permanent[$app.stage] ?? `${$app.stage}.${ROOT_DOMAIN}`;

export const zone = cloudflare.getZoneOutput({
  name: ROOT_DOMAIN,
});
