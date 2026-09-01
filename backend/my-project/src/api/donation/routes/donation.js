"use strict";

/**
 * donation router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::donation.donation", {
  routes: [
    {
      method: "POST",
      path: "/donations/verify",
      handler: "donation.verify",
      config: {
        auth: false,
      },
    },
  ],
});
