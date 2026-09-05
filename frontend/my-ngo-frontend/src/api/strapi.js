import { strapi } from "@strapi/client";

export const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337";

const client = strapi({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

export default client;
