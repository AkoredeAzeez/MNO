"use strict";

/**
 * donation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::donation.donation", ({ strapi }) => ({
  /**
   * POST /api/donations/verify
   * Body: { data: { reference, name?, phone?, email? } }
   * Verifies a Paystack transaction, records the donation, and updates the campaign.
   */
  async verify(ctx) {
    const body = ctx.request.body?.data || ctx.request.body || {};
    const { reference, name, phone, email, campaignId } = body;

    try {
      const donation = await strapi
        .service("api::donation.donation")
        .verifyDonation(reference, { name, phone, email, campaignId });

      return this.transformResponse(donation);
    } catch (error) {
      const message = error.message || "Donation verification failed.";
      if (error.status === 500) {
        return ctx.internalServerError(message);
      }
      return ctx.badRequest(message);
    }
  },
}));
