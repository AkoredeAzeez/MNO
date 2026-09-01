"use strict";

/**
 * donation router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const coreRouter = createCoreRouter("api::donation.donation");

const verifyRoute = {
  method: "POST",
  path: "/donations/verify",
  handler: "api::donation.donation.verify",
  config: {
    auth: false,
  },
};

module.exports = {
  type: "content-api",
  get routes() {
    return [...coreRouter.routes, verifyRoute];
  },
};
