import client, { STRAPI_BASE_URL } from './strapi';

/**
 * Media URLs come back from Strapi as either absolute (Cloudinary) or
 * relative (/uploads/...) paths. Normalize both to something <Image> accepts.
 */
export const mediaUrl = (media, format) => {
  if (!media) return null;
  const url =
    (format && media.formats?.[format]?.url) || media.url || null;
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`;
};

const ALBUM_POPULATE = {
  coverImage: true,
  photos: true,
};

export const getAllGalleryAlbums = async () => {
  const { data } = await client.collection('gallery-albums').find({
    populate: ALBUM_POPULATE,
    sort: ['order:asc', 'eventDate:desc'],
    pagination: { limit: 50 },
  });
  return data;
};

export const getGalleryAlbumBySlug = async (slug) => {
  const { data } = await client.collection('gallery-albums').find({
    filters: { slug: { $eq: slug } },
    populate: ALBUM_POPULATE,
    pagination: { limit: 1 },
  });
  return data?.[0] || null;
};

/**
 * Flat list of photos across all albums, used by the homepage highlights strip.
 */
export const getGalleryPhotos = async ({ limit = 8 } = {}) => {
  const albums = await getAllGalleryAlbums();
  const photos = [];
  for (const album of albums) {
    for (const photo of album.photos || []) {
      photos.push({ ...photo, albumTitle: album.title, albumSlug: album.slug });
    }
  }
  return photos.slice(0, limit);
};
