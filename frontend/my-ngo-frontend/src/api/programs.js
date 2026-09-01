import client from "./strapi";

export const programs = client.collection("programs");

export function getAllPrograms() {
  return programs.find({
    populate: {
      heroImage: true,
      gallery: true,
      tags: true,
      partners: true,
      story_impacts: { populate: ['beneficiaries'] },
    },
  });
}

export function getProgramById(id) {
  return programs.findOne(id, {
    populate: {
      heroImage: true,
      gallery: true,
      tags: true,
      partners: true,
      story_impacts: { populate: ['beneficiaries'] },
    },
  });
}

export function getProgramBySlug(slug) {
  return programs.find({
    filters: { slug },
    populate: {
      heroImage: true,
      gallery: true,
      tags: true,
      partners: true,
      story_impacts: { populate: ['beneficiaries'] },
    },
  });
}

export function createProgram(data) {
  return programs.create({ data });
}

export function updateProgram(id, data) {
  return programs.update(id, { data });
}
