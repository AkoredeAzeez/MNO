'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Lightbox from '../../components/Lightbox';
import { getAllGalleryAlbums, mediaUrl } from '../../api/gallery';

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlug, setActiveSlug] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllGalleryAlbums();
        setAlbums(data || []);
      } catch (err) {
        console.error('Error fetching gallery albums:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const visibleAlbums = useMemo(
    () =>
      activeSlug === 'all'
        ? albums
        : albums.filter((album) => album.slug === activeSlug),
    [albums, activeSlug]
  );

  // Flatten visible photos so the lightbox can move between albums seamlessly.
  const photos = useMemo(() => {
    const list = [];
    for (const album of visibleAlbums) {
      for (const photo of album.photos || []) {
        list.push({
          src: mediaUrl(photo, 'large') || mediaUrl(photo),
          alt: photo.alternativeText || `${album.title} photo`,
          albumTitle: album.title,
        });
      }
    }
    return list;
  }, [visibleAlbums]);

  const totalPhotos = useMemo(
    () => albums.reduce((sum, album) => sum + (album.photos?.length || 0), 0),
    [albums]
  );

  const startIndexFor = useCallback(
    (albumSlug, photoIndex) => {
      if (activeSlug !== 'all') return photoIndex;
      let offset = 0;
      for (const album of visibleAlbums) {
        if (album.slug === albumSlug) return offset + photoIndex;
        offset += album.photos?.length || 0;
      }
      return photoIndex;
    },
    [activeSlug, visibleAlbums]
  );

  const activeAlbum = albums.find((a) => a.slug === activeSlug);

  return (
    <div className="gl-page">
      <Navbar />

      <header className="gl-header">
        <div className="gl-header-inner">
          <p className="gl-eyebrow">Photo Gallery</p>
          <h1 className="gl-title">Maritime Forum</h1>
          <p className="gl-subtitle">
            Photographs from The Maritime Forum — students, mentors and industry
            leaders exploring careers across the maritime sector.
          </p>
          {!loading && !error && (
            <p className="gl-meta">
              {totalPhotos} photo{totalPhotos === 1 ? '' : 's'} ·{' '}
              {albums.length} album{albums.length === 1 ? '' : 's'}
            </p>
          )}
        </div>
      </header>

      <main className="gl-main">
        {loading && <p className="gl-status">Loading gallery…</p>}

        {!loading && error && (
          <p className="gl-status">
            Unable to load the gallery right now. Please try again later.
          </p>
        )}

        {!loading && !error && albums.length === 0 && (
          <p className="gl-status">
            Photos from our recent events will appear here soon.
          </p>
        )}

        {!loading && !error && albums.length > 0 && (
          <>
            <nav className="gl-tabs" aria-label="Gallery albums">
              <button
                className={`gl-tab ${activeSlug === 'all' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveSlug('all');
                  setLightboxIndex(null);
                }}
              >
                All Photos
                <span className="gl-tab-count">{totalPhotos}</span>
              </button>
              {albums.map((album) => (
                <button
                  key={album.id}
                  className={`gl-tab ${activeSlug === album.slug ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveSlug(album.slug);
                    setLightboxIndex(null);
                  }}
                >
                  {album.title}
                  <span className="gl-tab-count">{album.photos?.length || 0}</span>
                </button>
              ))}
            </nav>

            {activeAlbum?.description && (
              <p className="gl-album-description">{activeAlbum.description}</p>
            )}

            {visibleAlbums.map((album) => (
              <section key={album.id} className="gl-album">
                {activeSlug === 'all' && (
                  <h2 className="gl-album-title">
                    {album.title}
                    {album.eventDate && (
                      <span className="gl-album-date">
                        {new Date(album.eventDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </h2>
                )}

                <div className="gl-grid">
                  {(album.photos || []).map((photo, photoIndex) => {
                    const src = mediaUrl(photo, 'medium') || mediaUrl(photo);
                    return (
                      <button
                        key={photo.id}
                        className="gl-cell"
                        onClick={() =>
                          setLightboxIndex(startIndexFor(album.slug, photoIndex))
                        }
                        aria-label={`Open photo ${photoIndex + 1} of ${album.title}`}
                      >
                        <Image
                          src={src}
                          alt={photo.alternativeText || `${album.title} photo ${photoIndex + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="gl-image"
                        />
                        <span className="gl-cell-zoom">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )}

        <div className="gl-cta">
          <p className="gl-cta-text">
            Want to be part of the next Maritime Forum?
          </p>
          <div className="gl-cta-buttons">
            <Link href="/#contact" className="gl-cta-primary">
              Get in Touch
            </Link>
            <Link href="/#events" className="gl-cta-secondary">
              See Upcoming Events
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
