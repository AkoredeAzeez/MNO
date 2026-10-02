import { strapi } from "@strapi/client";

/**
 * Strapi base URL.
 *
 * Must be prefixed NEXT_PUBLIC_ so Next.js inlines it into the CLIENT bundle.
 * A plain `STRAPI_BASE_URL` is only readable on the server — in client
 * components it evaluates to undefined and silently falls back to
 * localhost:1337, breaking every browser-side fetch.
 *
 * The non-public name is kept as a fallback for server-side rendering and for
 * deployments that already set it.
 */
export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL ||
  process.env.STRAPI_BASE_URL ||
  "http://localhost:1337";

const client = strapi({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

export default client;
