import client from "./strapi";

export const newsletters = client.collection("newsletters");

export function createNewsletter(data) {
  return newsletters.create({ data });
}
