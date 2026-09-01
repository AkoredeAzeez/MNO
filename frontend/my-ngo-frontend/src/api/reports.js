import client from "./strapi";

export const reports = client.collection("reports");

export function getAllReports() {
  return reports.find({ populate: ['files'] });
}

export function getReportById(id) {
  return reports.findOne(id, { populate: ['files'] });
}

export function createReport(data) {
  return reports.create({ data });
}

export function updateReport(id, data) {
  return reports.update(id, { data });
}
