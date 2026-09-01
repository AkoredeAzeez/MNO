'use strict';

/**
 * List of content-api actions to enable for the "Public" role.
 * Public read: the collections rendered on the frontend.
 * Public create: the forms that POST submissions (contact, volunteer, newsletter).
 */
const PUBLIC_ACTIONS = [
  // Read (find + findOne)
  'api::beneficiary.beneficiary.find',
  'api::beneficiary.beneficiary.findOne',
  'api::donation-campaign.donation-campaign.find',
  'api::donation-campaign.donation-campaign.findOne',
  'api::donation.donation.find',
  'api::donation.donation.findOne',
  'api::event.event.find',
  'api::event.event.findOne',
  'api::location.location.find',
  'api::location.location.findOne',
  'api::partner.partner.find',
  'api::partner.partner.findOne',
  'api::program.program.find',
  'api::program.program.findOne',
  'api::report.report.find',
  'api::report.report.findOne',
  'api::story-impact.story-impact.find',
  'api::story-impact.story-impact.findOne',
  'api::tag.tag.find',
  'api::tag.tag.findOne',
  // Write (public forms)
  'api::contact.contact.create',
  'api::newsletter.newsletter.create',
  'api::volunteer.volunteer.create',
];

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: async ({ strapi }) => {
    try {
      const publicRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        strapi.log.warn(
          '[permissions] Public role not found; skipping public permission sync.'
        );
        return;
      }

      let created = 0;
      for (const action of PUBLIC_ACTIONS) {
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: publicRole.id } });

        if (!existing) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
          created += 1;
        }
      }

      if (created > 0) {
        strapi.log.info(`[permissions] Enabled ${created} public action(s).`);
      }
    } catch (err) {
      strapi.log.error('[permissions] Failed to sync public permissions:', err);
    }
  },
};
