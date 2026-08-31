'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Palette, Award, Heart, Users, Zap } from 'lucide-react';
import { getAllPrograms } from '../api/programs';
import { STRAPI_BASE_URL } from '../api/strapi';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await getAllPrograms();
        console.log('✅ Programs fetched successfully:', response);
        console.log('📚 Number of programs:', response.data?.length || 0);
        
        // Log detailed program data
        if (response.data && response.data.length > 0) {
          response.data.forEach((prog, idx) => {
            console.log(`📋 Program ${idx} raw data:`, prog);
            console.log(`📋 Program ${idx} attributes:`, prog.attributes);
          });
        }
        
        setPrograms(response.data || []);
      } catch (err) {
        console.error('❌ Error fetching programs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getProgramIcon = (index) => {
    const icons = [
      <Palette className="w-6 h-6" key="palette" />,
      <Award className="w-6 h-6" key="award" />,
      <Heart className="w-6 h-6" key="heart" />,
      <Users className="w-6 h-6" key="users" />,
      <Zap className="w-6 h-6" key="zap" />
    ];
    return icons[index % icons.length];
  };

  // Map programs from Strapi to display format
  const programsToDisplay = programs.map((program, index) => {
    const slug = program.slug || '';
    const title = program.title || 'Program';
    const summary = program.summary || 'Learn more about this program';
    const heroImage = program.heroImage?.url || 'https://res.cloudinary.com/demo/image/upload/v1632391898/artwork_sample.jpg';
    
    console.log(`Program ${index}:`, {
      title,
      slug,
      hasImage: !!program.heroImage,
      hasSummary: !!program.summary
    });
    
    return {
      title,
      summary,
      slug,
      heroImage,
      icon: getProgramIcon(index)
    };
  });

  const focusAreas = [
    {
      title: 'Empowerment',
      description: 'Programs that build confidence, exposure, and practical support for women and youth to thrive in the maritime sector.'
    },
    {
      title: 'Education',
      description: 'Scholarships, bursaries, workshops, and training opportunities that strengthen knowledge and capacity.'
    },
    {
      title: 'Maritime Awareness',
      description: 'Campaigns and outreach activities that increase understanding of the maritime industry and its opportunities.'
    },
    {
      title: 'Mentorship',
      description: 'Structured guidance from professionals to support learning, growth, leadership, and informed career decisions.'
    },
    {
      title: 'Skills Development',
      description: 'Practical training and capacity-building activities that prepare beneficiaries for real-world opportunities.'
    },
    {
      title: 'Women & Youth Inclusion',
      description: 'Intentional efforts to ensure women and youth are actively engaged, supported, and represented in growth opportunities.'
    },
    {
      title: 'Opportunity Creation',
      description: 'Linkages to internships, networks, partnerships, and platforms that improve access to economic and professional opportunity.'
    }
  ];

  return (
    <section id="programs" className="programs-section-container">
      <div className="container">
        <div className="programs-section-header">
          <h2 className="programs-section-title">Our Programmatic Focus Areas</h2>
          <div className="programs-section-gradient-line"></div>
          <p className="programs-section-subtitle">
            We work through empowerment, education, maritime awareness, mentorship, skills development, and opportunity creation to support women and youth in building brighter futures.
          </p>
        </div>

        {loading && (
          <p className="text-center9 text-lg9 mt-6-9">Loading programs...</p>
        )}

        <div className="programs-grid-3 programs-stagger-children" style={{ marginBottom: '2rem' }}>
          {focusAreas.map((area, index) => (
            <div key={area.title} className="programs-card-base programs-card-hover">
              <div className="programs-image-container">
                <div className="programs-image-overlay"></div>
                <div className="programs-icon-badge">
                  {getProgramIcon(index)}
                </div>
              </div>

              <div className="programs-card-content">
                <h3 className="programs-card-title">{area.title}</h3>
                <p className="programs-card-description">{area.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="programs-cta-wrapper" style={{ marginTop: '1rem' }}>
          <div className="programs-cta-card programs-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="programs-cta-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="programs-cta-title">Our Promise</h3>
            <p className="programs-cta-description">
              We are committed to building a pipeline of empowered women and youth who are better equipped to take advantage of education, employment, entrepreneurship, and leadership opportunities in the maritime industry.
            </p>
          </div>
        </div>

        {!loading && programsToDisplay.length === 0 && (
          <div className="text-center9 mt-12-9">
            <div className="card-base9 max-w-2xl9" style={{margin: '0 auto'}}>
              <div className="card-icon9 mx-auto">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl9 mb-2-9">Programs Under Development</h3>
              <p className="text-lg9">
                We are building practical, impact-driven programs to expand maritime awareness, mentorship, and opportunity for women and youth.
              </p>
            </div>
          </div>
        )}

        <div className="programs-grid-3 programs-stagger-children">
          {programsToDisplay.map((program, index) => (
            <div key={index} className="programs-card-base programs-card-hover">
              {/* Program Image with Enhanced Overlay */}
              <div className="programs-image-container">
                <Image 
                  src={program.heroImage.startsWith('http') ? program.heroImage : `${STRAPI_BASE_URL}${program.heroImage}`}
                  alt={`${program.title} illustration`}
                  width={400}
                  height={200}
                  className="programs-image"
                />
                
                {/* Enhanced overlay with gradient */}
                <div className="programs-image-overlay"></div>
                
                {/* Floating icon */}
                <div className="programs-icon-badge">
                  {program.icon}
                </div>
              </div>

              {/* Program Content */}
              <div className="programs-card-content">
                <h3 className="programs-card-title">{program.title}</h3>
                <p className="programs-card-description">{program.summary}</p>
              </div>

              {/* Action Button */}
              <div className="programs-card-footer">
                {program.slug ? (
                  <Link href={`/programs/${program.slug}`}>
                    <button className="programs-learn-more-btn">
                      Learn More
                    </button>
                  </Link>
                ) : (
                  <button className="programs-learn-more-btn" disabled style={{opacity: 0.5, cursor: 'not-allowed'}}>
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Programs Stats Section */}
        {programsToDisplay.length > 0 && (
          <div className="programs-stats-grid programs-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="programs-stats-card">
              <div className="programs-stats-number">{programsToDisplay.length}</div>
              <div className="programs-stats-card-label">Active Programs</div>
            </div>
            <div className="programs-stats-card">
              <div className="programs-stats-number">Women</div>
              <div className="programs-stats-card-label">& Youth Empowered</div>
            </div>
            <div className="programs-stats-card">
              <div className="programs-stats-number">Maritime</div>
              <div className="programs-stats-card-label">Opportunity Pathways</div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="programs-cta-wrapper">
          <div className="programs-cta-card programs-fade-in-up" style={{animationDelay: '1s'}}>
            <div className="programs-cta-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="programs-cta-title">Expanding Our Impact</h3>
            <p className="programs-cta-description">
              We are constantly evolving and adding new programs to better serve our community. More innovative programs may be added in the coming months as we continue to grow and respond to the needs of the children we serve.
            </p>
            <div className="programs-cta-buttons">
              <Link href="/volunteer" className="programs-cta-btn-primary">
                Get Involved
              </Link>
              <Link href="/#stories" className="programs-cta-btn-secondary">
                View Success Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}