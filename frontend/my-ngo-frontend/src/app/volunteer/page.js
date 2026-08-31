'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { submitVolunteerApplication } from '../../api/volunteers';
import { Palette, Heart, Mic, BookOpen, Users, ChevronDown } from 'lucide-react';
import './volunteer.css';

const roles = [
  {
    icon: <BookOpen />,
    title: 'Mentorship Support',
    description: 'Guide young people and women through career awareness and informed decision-making.',
    tasks: [
      'Support mentorship sessions and networking events',
      'Share guidance on maritime pathways and professional growth',
      'Encourage confidence and leadership development',
    ],
  },
  {
    icon: <Users />,
    title: 'Community Outreach Volunteer',
    description: 'Help us connect with schools, communities, and partner institutions.',
    tasks: [
      'Represent the Foundation at engagements and events',
      'Support outreach and awareness activities',
      'Build meaningful relationships with stakeholders',
    ],
  },
  {
    icon: <Mic />,
    title: 'Program and Event Support',
    description: 'Assist in workshops, seminars, campaigns, and logistics that expand access and awareness.',
    tasks: [
      'Help with setup, registration, and guest support',
      'Support maritime awareness campaigns and facilitations',
      'Create welcoming experiences for participants and partners',
    ],
  },
];

const faqs = [
    {
        question: 'What does the Foundation focus on?',
        answer: 'We focus on women and youth empowerment through education, maritime awareness, mentorship, skills development, and access to opportunities in the maritime industry.'
    },
    {
        question: 'Who can volunteer?',
        answer: 'We welcome individuals who are passionate about youth development, women’s empowerment, mentorship, and sector inclusion. You do not need to be from the maritime industry to contribute meaningfully.'
    },
    {
        question: 'What is the time commitment?',
        answer: 'The time commitment varies depending on the role. Some activities are one-off events, while others may involve recurring support for workshops, mentorship, or outreach initiatives.'
    },
    {
        question: 'How do I apply?',
        answer: 'Simply complete the form on this page and tell us about your interests, experience, and availability. Our team will review your application and follow up with the next steps.'
    }
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="volunteer-faq-item">
            <button className="volunteer-faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{faq.question}</span>
                <ChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
            </button>
            {isOpen && <div className="volunteer-faq-answer">{faq.answer}</div>}
        </div>
    );
};

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitVolunteerApplication(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
    } catch (error) {
      console.error('Failed to submit volunteer application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="volunteer-page">
        <section className="volunteer-hero">
          <h1 className="volunteer-hero-title">Become a Volunteer</h1>
          <p className="volunteer-hero-subtitle">
            Your time, skills, and network can help women and youth access mentorship, awareness, and opportunity in the maritime sector.
          </p>
        </section>

        <div className="volunteer-container">
          <section className="volunteer-section">
            <h2 className="volunteer-section-title">Volunteer Opportunities</h2>
            <div className="volunteer-roles-grid">
              {roles.map((role) => (
                <div key={role.title} className="volunteer-role-card">
                  <div className="volunteer-role-icon">{role.icon}</div>
                  <h3 className="volunteer-role-title">{role.title}</h3>
                  <p className="volunteer-role-description">{role.description}</p>
                  <ul className="volunteer-role-tasks">
                    {role.tasks.map((task) => (
                      <li key={task} className="volunteer-role-task">{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="volunteer-section">
            <h2 className="volunteer-section-title">Sign Up to Volunteer</h2>
            <div className="volunteer-form-container">
              <form onSubmit={handleSubmit}>
                <div className="volunteer-form-group">
                  <label htmlFor="name" className="volunteer-form-label">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="volunteer-form-input" required />
                </div>
                <div className="volunteer-form-group">
                  <label htmlFor="email" className="volunteer-form-label">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="volunteer-form-input" required />
                </div>
                <div className="volunteer-form-group">
                  <label htmlFor="phone" className="volunteer-form-label">Phone Number (Optional)</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="volunteer-form-input" />
                </div>
                <div className="volunteer-form-group">
                  <label htmlFor="interest" className="volunteer-form-label">Area of Interest</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className="volunteer-form-select" required>
                    <option value="" disabled>Select a role</option>
                    {roles.map(role => <option key={role.title} value={role.title}>{role.title}</option>)}
                    <option value="General">General Support</option>
                  </select>
                </div>
                <div className="volunteer-form-group">
                  <label htmlFor="message" className="volunteer-form-label">Tell us why you want to volunteer (Optional)</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="volunteer-form-textarea"></textarea>
                </div>
                <button type="submit" className="volunteer-form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                {submitStatus === 'success' && (
                  <p className="submit-message success" style={{marginTop: '1rem'}}>
                    Thank you for your application! We&apos;ll be in touch soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="submit-message error" style={{marginTop: '1rem'}}>
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </section>

          <section className="volunteer-section">
            <h2 className="volunteer-section-title">Frequently Asked Questions</h2>
            <div className="volunteer-faq-container">
                {faqs.map((faq, index) => <FAQItem key={index} faq={faq} />)}
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
