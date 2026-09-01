'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Shield, Users, Eye, Award, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { getAllReports } from '../api/reports';
import { getAllPartners } from '../api/partners';
import { STRAPI_BASE_URL } from '../api/strapi';

export default function Transparency() {
  const [reports, setReports] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch reports
        const reportsResponse = await getAllReports();
        console.log('✅ Reports fetched successfully:', reportsResponse);
        console.log('📊 Number of reports:', reportsResponse.data?.length || 0);
        setReports(reportsResponse.data || []);
        
        // Fetch partners
        const partnersResponse = await getAllPartners();
        console.log('✅ Partners fetched successfully:', partnersResponse);
        console.log('🤝 Number of partners:', partnersResponse.data?.length || 0);
        setPartners(partnersResponse.data || []);
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async (fileUrl, fileName) => {
    try {
      console.log('📥 Starting download:', fileName);
      // Fetch the file (fileUrl is absolute for Cloudinary, relative otherwise)
      const url = fileUrl.startsWith('http') ? fileUrl : `${STRAPI_BASE_URL}${fileUrl}`;
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'report';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log('✅ Download completed:', fileName);
    } catch (err) {
      console.error('❌ Error downloading file:', err);
      alert('Failed to download file. Please try again.');
    }
  };

  const transparencyPillars = [
    {
      title: "Financial Accountability",
      icon: <FileText className="w-6 h-6" />,
      description: "Complete transparency in how we manage and allocate every donation received.",
      features: [
        "Annual financial reports",
        "Monthly budget summaries", 
        "Grant allocation tracking",
        "Donor impact statements"
      ]
    },
    {
      title: "Governance Structure",
      icon: <Shield className="w-6 h-6" />,
      description: "Clear organizational structure with proper oversight and decision-making processes.",
      features: [
        "Board of trustees",
        "Advisory committee",
        "Operational guidelines",
        "Ethical standards"
      ]
    },
    {
      title: "Community Engagement",
      icon: <Users className="w-6 h-6" />,
      description: "Open communication with stakeholders and regular community feedback sessions.",
      features: [
        "Quarterly community meetings",
        "Stakeholder feedback loops",
        "Public program evaluations",
        "Beneficiary testimonials"
      ]
    }
  ];

  // Map report types to icons
  const getReportIcon = (type) => {
    switch(type) {
      case 'Annual Report':
        return <FileText className="w-5 h-5" />;
      case 'Budget':
        return <TrendingUp className="w-5 h-5" />;
      case 'Auditor Report':
        return <Shield className="w-5 h-5" />;
      case 'Financial Statement':
        return <Award className="w-5 h-5" />;
      case 'Grants/Donors':
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  // Use only Strapi data, map to display format
  const reportsToDisplay = reports.map((report) => {
    const files = report.files || [];
    return {
      title: `${report.year || ''} ${report.type || 'Report'}`,
      status: files.length > 0 ? "Available" : "Coming Soon",
      type: report.type || "Report",
      icon: getReportIcon(report.type),
      description: report.summary || "View detailed report information",
      files
    };
  });

  // Map partner types to display info
  const getPartnerTypeInfo = (type) => {
    switch(type) {
      case 'Government':
        return { label: 'Government Partner', verified: true };
      case 'NGO':
        return { label: 'NGO Partner', verified: true };
      case 'Corporate':
        return { label: 'Corporate Partner', verified: true };
      case 'Foundation':
        return { label: 'Foundation Partner', verified: true };
      default:
        return { label: 'Partner', verified: false };
    }
  };

  // Use only Strapi data for partnerships
  const partnershipsToDisplay = partners.map((partner) => {
    const typeInfo = getPartnerTypeInfo(partner.type);
    return {
      name: partner.name || 'Partner',
      type: typeInfo.label,
      role: partner.url || 'Strategic partnership',
      verified: typeInfo.verified,
      logo: partner.logo?.url || null
    };
  });

  const commitments = [
    "100% transparency in fund allocation",
    "Regular independent financial audits",
    "Open communication with all stakeholders", 
    "Ethical standards in all operations",
    "Community-driven decision making",
    "Continuous improvement processes"
  ];

  return (
    <section className="section-container9">
      <div className="container9">
        <div className="section-header9">
          <h2 className="section-title9">Transparency & Governance</h2>
          <div className="section-gradient-line9"></div>
          <p className="section-subtitle9">
            We believe in complete transparency and accountability in all our operations, ensuring every contribution makes the maximum impact for the children we serve.
          </p>
        </div>

        {/* Transparency Pillars */}
        <div className="grid-39 stagger-children9">
          {transparencyPillars.map((pillar, index) => (
            <div key={index} className="card-base9 card-hover9 interactive-glow9">
              <div className="card-icon9">
                {pillar.icon}
              </div>
              <h3 className="card-title9">{pillar.title}</h3>
              <p className="card-description9 mb-6-9">{pillar.description}</p>
              
              <div className="feature-list9">
                {pillar.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-item9">
                    <div className="feature-dot9"></div>
                    <span className="feature-text9">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reports & Documentation */}
        <div className="mt-16-9">
          <div className="text-center9 mb-12-9">
            <h3 className="text-2xl9 mb-4-9">Reports & Documentation</h3>
            <p className="text-lg9 max-w-2xl9">
              Access our comprehensive reports and documentation for complete transparency
            </p>
            
            {loading && (
              <p className="text-lg9 mt-6-9">Loading reports...</p>
            )}
          </div>

          <div className="grid-29 stagger-children9">
            {reportsToDisplay.length > 0 ? (
              reportsToDisplay.map((report, index) => (
                <div key={index} className="card-base9 card-hover9">
                  <div className="report-card9">
                    <div className="report-icon9">
                      {report.icon}
                    </div>
                    <div className="report-content9">
                      <div className="report-header9">
                        <h4 className="report-title9">{report.title}</h4>
                        <span className={report.status === 'Available' ? 'status-badge9 status-available9' : 'status-badge9 status-pending9'}>
                          {report.status}
                        </span>
                      </div>
                      <p className="report-type9">{report.type}</p>
                      <p className="report-description9 mb-4-9">{report.description}</p>
                      
                      {report.status === 'Available' ? (
                        <button 
                          onClick={() => handleDownload(
                            report.files[0].url,
                            report.files[0].name || `${report.title}.pdf`
                          )}
                          className="btn-download9"
                        >
                          <span>Download</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="btn-disabled9" disabled>
                          <span>Coming Soon</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && (
                <div className="text-center9" style={{gridColumn: '1 / -1'}}>
                  <div className="card-base9 max-w-2xl9" style={{margin: '0 auto'}}>
                    <div className="card-icon9 mx-auto">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl9 mb-2-9">Reports Coming Soon</h3>
                    <p className="text-lg9">
                      We are currently preparing our transparency reports. Please check back soon for updates.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="mt-16-9">
          <div className="text-center9 mb-12-9">
            <h3 className="text-2xl9 mb-4-9">Our Partnerships</h3>
            <p className="text-lg9 max-w-2xl9">
              Working with trusted partners to maximize our impact and ensure accountability
            </p>
          </div>

          <div className="grid-29 stagger-children9">
            {partnershipsToDisplay.length > 0 ? (
              partnershipsToDisplay.map((partnership, index) => (
                <div key={index} className="card-base9">
                  <div className="partnership-header9">
                    <div>
                      <h4 className="partnership-title9">
                        {partnership.name}
                        {partnership.verified && (
                          <CheckCircle className="verified-icon9" />
                        )}
                      </h4>
                      <p className="partnership-type9">{partnership.type}</p>
                    </div>
                  </div>
                  <p className="partnership-role9">{partnership.role}</p>
                </div>
              ))
            ) : (
              !loading && (
                <div className="text-center9" style={{gridColumn: '1 / -1'}}>
                  <div className="card-base9 max-w-2xl9" style={{margin: '0 auto'}}>
                    <div className="card-icon9 mx-auto">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl9 mb-2-9">Partnerships Coming Soon</h3>
                    <p className="text-lg9">
                      We are building strategic partnerships to maximize our impact. Check back soon for updates.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Commitments Section */}
        <div className="mt-16-9">
          <div className="card-base9 max-w-4xl9 fade-in-up9" style={{animationDelay: '0.4s'}}>
            <div className="text-center9 mb-8-9">
              <div className="card-icon9 mx-auto">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="card-title9">Our Transparency Commitments</h3>
              <p className="card-description9">
                These are the standards we hold ourselves to in every aspect of our work
              </p>
            </div>

            <div className="grid-29 gap-4-9">
              {commitments.map((commitment, index) => (
                <div key={index} className="feature-item9">
                  <div className="feature-dot9"></div>
                  <span className="feature-text9">{commitment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center9 mt-16-9">
          <div className="max-w-2xl9">
            <h3 className="text-xl9 mb-4-9">Questions About Our Operations?</h3>
            <p className="text-lg9 mb-6-9">
              We&apos;re always happy to provide additional information or clarification about our work and impact.
            </p>
            <div className="grid-29 gap-4-9">
              <Link href="/contact" className="btn-primary9">
                Contact Us
              </Link>
              <Link href="/contact" className="btn-secondary9">
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}