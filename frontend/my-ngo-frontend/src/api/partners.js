import client from "./strapi";

export const partners = client.collection("partners");

export function getAllPartners() {
  return partners.find({ populate: ['logo'] });
}

export function getPartnerById(id) {
  return partners.findOne(id, { populate: ['logo'] });
}

export function createPartner(data) {
  return partners.create({ data });
}

export function updatePartner(id, data) {
  return partners.update(id, { data });
}
