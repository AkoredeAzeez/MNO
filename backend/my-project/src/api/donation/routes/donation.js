"use strict";

/**
 * donation router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const coreRouter = createCoreRouter("api::donation.donation");

module.exports = {
  type: "content-api",
  get routes() {
    const coreRoutes = coreRouter.routes || [];
    return [
      ...coreRoutes,
      {
        method: "POST",
        path: "/donations/verify",
        handler: "api::donation.donation.verify",
        config: {
          auth: false,
        },
      },
    ];
  },
};
