'use client';
import { useState } from 'react';
import { Heart, Globe, Zap, User } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const [activeValue, setActiveValue] = useState(null);

  const values = [
    { 
      name: 'Integrity', 
      message: 'We uphold honesty, accountability, and transparency in all our actions and relationships.' 
    },
    { 
      name: 'Empowerment', 
      message: 'We help women and youth gain the confidence, knowledge, and support needed to thrive in life and career.' 
    },
    { 
      name: 'Inclusion', 
      message: 'We create space for women, youth, and underserved communities to participate, grow, and lead.' 
    },
    { 
      name: 'Mentorship', 
      message: 'We believe in the power of guidance, peer support, and shared experience to unlock opportunity.' 
    },
    { 
      name: 'Excellence', 
      message: 'We pursue high standards in programs, partnerships, and service delivery to create real impact.' 
    },
    { 
      name: 'Service', 
      message: 'We are driven by a genuine desire to contribute to people, communities, and national development.' 
    },
    { 
      name: 'Innovation', 
      message: 'We embrace creative and practical solutions that expand access to learning and opportunity.' 
    },
    { 
      name: 'Collaboration', 
      message: 'We build partnerships that strengthen reach, relevance, and long-term sustainability.' 
    }
  ];

  const handleValueClick = (index) => {
    setActiveValue(activeValue === index ? null : index);
  };

  return (
    <section id="about" className="about-redesign">
      <div className="container">
        <div className="about-header">
          <h2 className="about-main-title">
            About{' '}
            <span className="gradient-text1">
              Margaret Nkem Orakwusi Foundation
            </span>
          </h2>
          <div className="about-title-line"></div>
        </div>

        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-header-section">
              <div className="icon-container mission-icon">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Our Mission</h3>
            </div>
            <p className="card-description-text">
              To empower women and youth through education, mentorship, awareness, and access to opportunities in the maritime industry and related sectors.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-header-section">
              <div className="icon-container vision-icon">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Our Vision</h3>
            </div>
            <p className="card-description-text">
              To build a vibrant and inclusive maritime future where women and youth are empowered, informed, and equipped to lead and succeed.
            </p>
          </div>
        </div>

        <div className="mission-card" style={{ marginTop: '2rem', width: '100%' }}>
          <div className="card-header-section">
            <div className="icon-container vision-icon">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="card-title-text">What the Foundation Stands For</h3>
          </div>
          <p className="card-description-text">
            The Margaret Nkem Orakwusi Foundation stands for leadership, access, empowerment, and purposeful service. It exists to help women and young people discover their potential and connect it to real opportunities in the maritime industry, while creating practical pathways that are inclusive, sustainable, and rooted in dignity.
          </p>
        </div>

        <div className="mission-vision-grid" style={{ marginTop: '2rem' }}>
          <div className="mission-card">
            <div className="card-header-section">
              <div className="icon-container mission-icon">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Goal</h3>
            </div>
            <p className="card-description-text">
              To contribute to the development of an informed, skilled, and inclusive generation of women and youth who can participate meaningfully in the maritime economy.
            </p>
          </div>

          <div className="vision-card">
            <div className="card-header-section">
              <div className="icon-container vision-icon">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Key Objectives</h3>
            </div>
            <ul className="card-description-text" style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li>Empower women and youth through maritime awareness, education, and skills development.</li>
              <li>Increase understanding of maritime careers, opportunities, and enterprise possibilities.</li>
              <li>Provide mentorship and guidance for informed career and life decisions.</li>
              <li>Promote women’s inclusion and participation in the maritime industry.</li>
              <li>Build partnerships with institutions, organizations, and stakeholders for sustainable impact.</li>
            </ul>
          </div>
        </div>

        <div className="mission-vision-grid" style={{ marginTop: '2rem' }}>
          <div className="mission-card">
            <div className="card-header-section">
              <div className="icon-container mission-icon">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Target Beneficiaries</h3>
            </div>
            <ul className="card-description-text" style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li>Women and girls seeking growth, exposure, and opportunity.</li>
              <li>Youth and young adults interested in education, leadership, and career development.</li>
              <li>Students and graduates seeking pathways into maritime-related fields.</li>
              <li>Maritime trainees and aspiring professionals.</li>
              <li>Underserved individuals and communities with limited access to industry knowledge and opportunity.</li>
            </ul>
          </div>

          <div className="vision-card">
            <div className="card-header-section">
              <div className="icon-container vision-icon">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="card-title-text">Expected Impact</h3>
            </div>
            <p className="card-description-text">
              The Foundation aims to increase awareness, confidence, and access for women and youth interested in the maritime industry. Over time, this will contribute to stronger participation, better career outcomes, greater inclusion, and more informed engagement with the blue economy.
            </p>
          </div>
        </div>

        <div className="mission-card" style={{ marginTop: '2rem', width: '100%' }}>
          <div className="card-header-section">
            <div className="icon-container vision-icon">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="card-title-text">Sustainability Approach</h3>
          </div>
          <p className="card-description-text">
            The Foundation will pursue sustainability through strategic partnerships, donor engagement, volunteerism, institutional collaboration, and phased program growth. By working with maritime agencies, private sector partners, educational institutions, and development organizations, we will ensure that our impact remains relevant, broad, and lasting.
          </p>
        </div>

        <div className="founder-section">
          <div className="founder-hero-container">
            <div className="founder-decorative-bg">
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
              <div className="paint-splash splash-1"></div>
              <div className="paint-splash splash-2"></div>
            </div>

            <div className="founder-content-grid">
              <div className="founder-visual-section">
                <div className="founder-image-frame">
                  <div className="image-border-decoration"></div>
                  <Image 
                    src="/img/headshot.jpg"
                    alt="Barr. Margaret Nkem Orakwusi"
                    width={320}
                    height={320}
                    className="founder-actual-image"
                    priority
                  />
                  <div className="image-overlay-pattern"></div>
                </div>
                
                <div className="founder-quote-bubble">
                  <div className="quote-content">
                    <p className="quote-text">&quot;We create pathways for women and youth to thrive in the maritime sector and beyond.&quot;</p>
                  </div>
                </div>
              </div>

              <div className="founder-story-section">
                <div className="story-header">
                  <div className="header-decoration">
                    <Zap className="story-icon-enhanced" />
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="story-title-container">
                    <h3 className="story-main-title">A Legacy of Leadership</h3>
                    <p className="story-subtitle">In honour of Barr. Margaret Nkem Orakwusi</p>
                  </div>
                </div>

                <div className="story-timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot dot-2018"></div>
                    <div className="timeline-content">
                      <span className="timeline-year">Legacy</span>
                      <p className="timeline-text">
                        Named in honour of Barr. Margaret Nkem Orakwusi, whose life reflects leadership, professionalism, service, and mentorship.
                      </p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot dot-inspiration"></div>
                    <div className="timeline-content">
                      <span className="timeline-year">Purpose</span>
                      <p className="timeline-text">
                        The Foundation was created to preserve and extend that legacy through practical support, opportunity, and inclusion.
                      </p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot dot-birth"></div>
                    <div className="timeline-content">
                      <span className="timeline-year">Focus</span>
                      <p className="timeline-text">
                        We work to increase awareness, expand access to education, and help women and youth discover pathways in the maritime economy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-dot dot-today"></div>
                    <div className="timeline-content">
                      <span className="timeline-year">Today</span>
                      <p className="timeline-text">
                        The Foundation is building a generation of informed, skilled, and confident leaders ready to participate in the future of maritime development.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="founder-impact-stats">
                  <div className="stat-item">
                    <span className="stat-number">Women</span>
                    <span className="stat-label">& Youth</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">Maritime</span>
                    <span className="stat-label">Access</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">Impact</span>
                    <span className="stat-label">Driven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h3 className="values-title">Our Core Values</h3>
          <p className="values-subtitle">Click to learn more about each value</p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div
                key={value.name}
                className="value-item"
                style={{animationDelay: `${index * 100}ms`}}
                onClick={() => handleValueClick(index)}
              >
                <div className="value-dot"></div>
                <h4 className="value-text">{value.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {activeValue !== null && (
          <div className="value-modal-overlay" onClick={() => setActiveValue(null)}>
            <div className="value-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="value-modal-close" onClick={() => setActiveValue(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="value-modal-header">
                <div className="value-modal-icon">
                  <div className="value-dot large"></div>
                </div>
                <h3 className="value-modal-title">{values[activeValue].name}</h3>
              </div>
              <div className="value-modal-body">
                <p className="value-modal-message">{values[activeValue].message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}