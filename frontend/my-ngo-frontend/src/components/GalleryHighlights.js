'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from './Lightbox';
import { getAllGalleryAlbums, mediaUrl } from '../api/gallery';

const HIGHLIGHT_LIMIT = 8;

export default function GalleryHighlights() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllGalleryAlbums();
        setAlbums(data || []);
      } catch (err) {
        console.error('Error fetching gallery highlights:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const photos = useMemo(() => {
    const list = [];
    for (const album of albums) {
      for (const photo of album.photos || []) {
        list.push({
          src: mediaUrl(photo, 'large') || mediaUrl(photo),
          alt: photo.alternativeText || `${album.title} photo`,
          albumTitle: album.title,
          thumb: mediaUrl(photo, 'small') || mediaUrl(photo, 'medium') || mediaUrl(photo),
        });
      }
    }
    return list;
  }, [albums]);

  const highlights = photos.slice(0, HIGHLIGHT_LIMIT);

  if (loading || highlights.length === 0) return null;

  return (
    <section id="gallery" className="gh-section">
      <div className="gh-inner">
        <div className="gh-header">
          <p className="gh-eyebrow">From the Field</p>
          <h2 className="gh-title">Gallery Highlights</h2>
          <div className="gh-rule" />
          <p className="gh-subtitle">
            Moments from The Maritime Forum — students discovering the careers,
            people and possibilities across the maritime sector.
          </p>
        </div>

        <div className="gh-grid">
          {highlights.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              className={`gh-cell ${index === 0 ? 'gh-cell-feature' : ''}`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Open photo ${index + 1}`}
            >
              <Image
                src={photo.thumb || photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? '(max-width: 900px) 100vw, 50vw' : '(max-width: 900px) 50vw, 25vw'}
                className="gh-image"
              />
            </button>
          ))}
          <Link href="/gallery" className="gh-cell gh-cell-more">
            <span className="gh-more-count">{photos.length}</span>
            <span className="gh-more-label">View Full Gallery</span>
            <span className="gh-more-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
