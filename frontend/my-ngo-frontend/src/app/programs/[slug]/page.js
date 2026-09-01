'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Tag, Users, Heart } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getProgramBySlug } from '../../../api/programs';
import { STRAPI_BASE_URL } from '../../../api/strapi';
import '../../program-detail.css';

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState(new Set());

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        // Fetch the program matching this slug
        const response = await getProgramBySlug(slug);
        console.log('✅ Program fetched:', response);

        const foundProgram = response.data?.[0];

        if (foundProgram) {
          setProgram(foundProgram);
          console.log('✅ Program found:', foundProgram);
          console.log('📝 Program data:', foundProgram);
        } else {
          console.log('❌ No program found with slug:', slug);
          setError('Program not found');
        }
      } catch (err) {
        console.error('❌ Error fetching program:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  // Auto-play slideshow
  useEffect(() => {
    if (!program?.gallery || program.gallery.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === program.gallery.length - 1 ? 0 : prev + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [program?.gallery]);

  const handleImageError = (imageId) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  };

  if (loading) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading program...</h2>
            <p className="text-gray-600">Please wait while we fetch the details</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !program) {
    return (
      <>
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Not Found</h2>
            <p className="text-gray-600 mb-6">The program you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/#programs">
              <button className="program-back-button">
                Back to Programs
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const {
    title,
    summary,
    body,
    heroImage,
    gallery,
    tags,
    partners,
    story_impacts
  } = program;

  const heroImageUrl = heroImage?.url 
    ? (heroImage.url.startsWith('http') 
        ? heroImage.url 
        : `${STRAPI_BASE_URL}${heroImage.url}`)
    : 'https://res.cloudinary.com/demo/image/upload/v1632391898/artwork_sample.jpg';

  const getImageUrl = (image) => {
    if (!image?.url) return null;
    return image.url.startsWith('http') 
      ? image.url 
      : `${STRAPI_BASE_URL}${image.url}`;
  };

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className="program-detail-container">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Link href="/#programs">
            <button className="program-back-button">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Programs</span>
            </button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Image */}
            <div className="program-hero">
              <Image
                src={heroImageUrl}
                alt={title || 'Program'}
                fill
                className="program-hero-image"
                priority
                onError={() => handleImageError('hero')}
              />
              <div className="program-hero-overlay"></div>
              <div className="program-hero-content">
                <h1 className="program-hero-title">{title}</h1>
                {summary && (
                  <p className="program-hero-summary">{summary}</p>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Gallery Slideshow */}
                {gallery && gallery.length > 0 && gallery[currentImageIndex] && (
                  <div className="program-gallery-container">
                    <h2 className="program-gallery-title">
                      <Heart />
                      Program Gallery
                    </h2>
                    <div className="program-gallery-wrapper">
                      {/* Main Slideshow Image */}
                      <div className="program-slideshow">
                        <div className="program-slideshow-inner">
                          <Image
                            src={gallery[currentImageIndex].url?.startsWith('http') 
                              ? gallery[currentImageIndex].url 
                              : `${STRAPI_BASE_URL}${gallery[currentImageIndex].url}`}
                            alt={gallery[currentImageIndex].alternativeText || `Gallery image ${currentImageIndex + 1}`}
                            fill
                            className="program-slideshow-image"
                          />
                          
                          {/* Dark overlay */}
                          <div className="program-slideshow-overlay"></div>
                        </div>
                        
                        {/* Navigation Arrows */}
                        {gallery.length > 1 && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => 
                                prev === 0 ? gallery.length - 1 : prev - 1
                              )}
                              className="program-slideshow-nav prev"
                              aria-label="Previous image"
                            >
                              <ChevronLeft />
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => 
                                prev === gallery.length - 1 ? 0 : prev + 1
                              )}
                              className="program-slideshow-nav next"
                              aria-label="Next image"
                            >
                              <ChevronRight />
                            </button>
                          </>
                        )}
                        
                        {/* Image Counter */}
                        <div className="program-slideshow-counter">
                          {currentImageIndex + 1} / {gallery.length}
                        </div>
                      </div>
                      
                      {/* Thumbnail Strip */}
                      {gallery.length > 1 && (
                        <div className="program-thumbnails">
                          {gallery.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`program-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                            >
                              <Image
                                src={image.url?.startsWith('http') 
                                  ? image.url 
                                  : `${STRAPI_BASE_URL}${image.url}`}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                style={{objectFit: 'cover'}}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Program Description - Moved after gallery */}
                <div className="program-description">
                  <h2 className="program-description-title">
                    About This Program
                  </h2>
                  {body ? (
                    <div 
                      className="program-description-content"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  ) : summary ? (
                    <p className="program-description-content">
                      {summary}
                    </p>
                  ) : (
                    <p className="program-description-content" style={{fontStyle: 'italic', color: '#999'}}>
                      No detailed description available for this program yet.
                    </p>
                  )}
                </div>

                {/* Success Stories */}
                {story_impacts && story_impacts.length > 0 && (
                  <div className="program-stories">
                    <h2 className="program-stories-title">
                      <Heart />
                      Success Stories & Impact
                    </h2>
                    <div>
                      {story_impacts.map((story, index) => (
                        <div 
                          key={story.id || index} 
                          className="program-story"
                        >
                          <h3 className="program-story-title">{story.title}</h3>
                          {story.excerpt && (
                            <p className="program-story-excerpt">{story.excerpt}</p>
                          )}
                          {story.body && (
                            <div 
                              className="program-story-body"
                              dangerouslySetInnerHTML={{ __html: story.body }}
                            />
                          )}
                          {story.beneficiaries && story.beneficiaries.length > 0 && (
                            <p className="program-story-author">
                              - {story.beneficiaries[0].name || 'Anonymous'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="program-sidebar">
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="program-sidebar-card">
                    <h3 className="program-sidebar-title">
                      <Tag />
                      Categories
                    </h3>
                    <div className="program-tags">
                      {tags.map((tag, index) => (
                        <span 
                          key={tag.id || index}
                          className="program-tag"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partners */}
                {partners && partners.length > 0 && (
                  <div className="program-sidebar-card">
                    <h3 className="program-sidebar-title">
                      <Users />
                      Partners
                    </h3>
                    <div className="program-partners">
                      {partners.map((partner, index) => (
                        <div key={partner.id || index} className="program-partner">
                          <span>{partner.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="program-cta">
                  <h3 className="program-cta-title">Get Involved</h3>
                  <p className="program-cta-text">
                    Want to support this program or learn more about how you can help?
                  </p>
                  <div className="program-cta-buttons">
                    <Link href="/donate" className="program-cta-button primary">
                      Donate Now
                    </Link>
                    <Link href="/volunteer" className="program-cta-button secondary">
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}