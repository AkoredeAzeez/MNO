'use client';

import Link from 'next/link';

export default function VolunteerCTA() {
  return (
    <section id="volunteercta" className="volunteer-cta7">
      <div className="volunteer-container7">
        <h2 className="volunteer-title7">Get Involved</h2>
        <p className="volunteer-description7">
          Join us in building pathways for women and youth to learn, lead, and thrive in the maritime industry.
          Whether you are a professional, mentor, educator, or supporter, your time and expertise can create real impact.
        </p>
        <Link href="/volunteer" className="volunteer-btn7">
          Sign Up to Volunteer
        </Link>
      </div>
    </section>
  );
}