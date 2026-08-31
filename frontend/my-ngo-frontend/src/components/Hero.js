import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-container-solid-bg">
      <div className="background-image"></div>

      <div className="hero-content">
        <h1 className="hero-title gradient-text">
          Navigate. Learn. Lead.
        </h1>
        <p className="hero-subtitle">
          Empowering women and youth through education, mentorship, awareness,
          and access to opportunities in the maritime industry.
        </p>
        <div className="hero-buttons">
          <Link href="/donate" className="btn-futuristic">
            Support the Mission
          </Link>
          <Link href="/volunteer" className="btn-ghost">
            Become a Mentor
          </Link>
        </div>
      </div>

      <a href="#about" className="hero-scroll-indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </a>
    </section>
  );
}
