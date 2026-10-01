'use client';
import { useEffect } from 'react';

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const isOpen = index !== null && index >= 0 && photos[index];

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, index, photos.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const photo = photos[index];
  const src = photo.src || photo.url;

  return (
    <div
      className="glb-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt || 'Photo viewer'}
      onClick={onClose}
    >
      <button className="glb-close" onClick={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <button
        className="glb-nav glb-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + photos.length) % photos.length);
        }}
        aria-label="Previous photo"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <figure className="glb-figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="glb-image" src={src} alt={photo.alt || ''} />
        <figcaption className="glb-caption">
          <span className="glb-caption-album">{photo.albumTitle}</span>
          <span className="glb-caption-count">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      <button
        className="glb-nav glb-next"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % photos.length);
        }}
        aria-label="Next photo"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
