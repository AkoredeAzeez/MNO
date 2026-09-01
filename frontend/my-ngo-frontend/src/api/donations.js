import { STRAPI_BASE_URL } from './strapi';

export async function verifyDonation({ reference, name, phone, email, campaignId }) {
  const response = await fetch(`${STRAPI_BASE_URL}/api/donations/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: { reference, name, phone, email, campaignId },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Failed to verify donation');
  }

  return response.json();
}
