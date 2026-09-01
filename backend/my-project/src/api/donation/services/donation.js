"use strict";

/**
 * donation service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::donation.donation", ({ strapi }) => ({
  /**
   * Verify a Paystack transaction reference and record the donation.
   * When successful, increments the linked campaign's raised amount.
   *
   * @param {string} reference - Paystack transaction reference
   * @param {object} [meta] - fallback donor info (name, phone, email, campaignId)
   * @returns {Promise<object>} the created donation
   * @throws {Error} with `.status` (400 or 500) when verification fails
   */
  async verifyDonation(reference, meta = {}) {
    const secretKey = strapi.config.get("server.paystackSecretKey");

    if (!reference) {
      const err = new Error("Missing transaction reference.");
      err.status = 400;
      throw err;
    }
    if (!secretKey) {
      const err = new Error(
        "Paystack secret key is not configured (PAYSTACK_SECRET_KEY)."
      );
      err.status = 500;
      throw err;
    }

    // 1. Call Paystack verify API
    const paystackUrl = `https://api.paystack.co/transaction/verify/${encodeURIComponent(
      reference
    )}`;
    const response = await fetch(paystackUrl, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok || !body.status) {
      const err = new Error(
        `Paystack verification failed: ${body.message || "Unknown error"}`
      );
      err.status = 400;
      throw err;
    }

    const data = body.data || {};
    if (data.status !== "success") {
      const err = new Error(
        `Transaction not successful (status: ${data.status}).`
      );
      err.status = 400;
      throw err;
    }

    const amount = Number(data.amount); // Paystack returns amount in kobo
    if (!amount || amount <= 0) {
      const err = new Error("Transaction amount is invalid.");
      err.status = 400;
      throw err;
    }

    // 2. Check for an existing donation with this reference (idempotency)
    const existing = await strapi.documents("api::donation.donation").findMany({
      filters: { reference },
      limit: 1,
    });
    if (existing.length > 0) {
      return existing[0];
    }

    // 3. Resolve campaign from metadata, if provided
    // Paystack returns custom fields as metadata.custom_fields[] (variable_name/campaign_id).
    const customFields = data.metadata?.custom_fields || [];
    const metadataCampaign = Array.isArray(customFields)
      ? customFields.find((f) => f.variable_name === "campaign_id")?.value
      : undefined;
    const campaignId = metadataCampaign || meta.campaignId;
    let campaign = null;
    if (campaignId) {
      // campaignId may be a string documentId or a numeric id; try both.
      const byDocId = await strapi
        .documents("api::donation-campaign.donation-campaign")
        .findOne({ documentId: String(campaignId) })
        .catch(() => null);
      if (byDocId) {
        campaign = byDocId;
      } else {
        const byId = await strapi
          .documents("api::donation-campaign.donation-campaign")
          .findMany({ filters: { id: Number(campaignId) }, limit: 1 });
        if (byId.length > 0) campaign = byId[0];
      }
    }

    // Amount stored in naira (integer) for consistency with campaign.raised
    const amountInNaira = Math.round(amount / 100);

    // 4. Create the donation record
    const donation = await strapi.documents("api::donation.donation").create({
      data: {
        amount: amountInNaira,
        currency: data.currency || "NGN",
        email: data.customer?.email || meta.email || "",
        name: meta.name || data.metadata?.full_name || "",
        phone: meta.phone || data.metadata?.phone_number || "",
        reference,
        status: "Success",
        campaign: campaign?.documentId ? campaign.documentId : undefined,
      },
    });

    // 5. Increment campaign raised amount
    if (campaign) {
      const currentRaised = Number(campaign.raised || 0);
      await strapi
        .documents("api::donation-campaign.donation-campaign")
        .update({
          documentId: campaign.documentId,
          data: { raised: currentRaised + amountInNaira },
        });
    }

    return donation;
  },
}));
