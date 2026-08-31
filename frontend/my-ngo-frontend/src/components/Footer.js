"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createNewsletter } from "../api/newsletters";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Email is required.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
      return;
    }

    try {
      await createNewsletter({ email });
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error) {
      setStatus("error");
      if (error.response?.data?.error?.message.includes("Duplicate entry")) {
        setMessage("This email is already subscribed.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      console.error(error);
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="footer-container-21">
      <div className="container-21">
        <div className="footer-grid-21 stagger-children-21">
          {/* Brand Section */}
          <div className="footer-section-21">
            <div className="navbar-logo-21 mb-4">
              <div className="navbar-logo-icon-21">
                <Image
                  src="/img/mnologo.jpg"
                  alt="Margaret Nkem Orakwusi Foundation Logo"
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">
                Margaret Nkem Orakwusi Foundation
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              A legacy-driven nonprofit empowering women and youth through education,
              mentorship, awareness, and access to opportunity in the maritime sector.
            </p>

            {/* Social Media Icons */}
            <div className="social-links-21">
              <a href="https://twitter.com/MNO_Foundation" target="_blank" rel="noopener noreferrer" className="social-icon-21">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://instagram.com/MNO_Foundation" target="_blank" rel="noopener noreferrer" className="social-icon-21">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section-21">
            <h3 className="footer-title-21">Quick Links</h3>
            <a href="#about" className="footer-link-21">
              About Us
            </a>
            <a href="#programs" className="footer-link-21">
              Programs
            </a>
            <a href="/donate" className="footer-link-21">
              Donate
            </a>
            <a href="#stories" className="footer-link-21">
              Impact Stories
            </a>
            <a href="#events" className="footer-link-21">
              Events
            </a>
            <Link href="/volunteer" className="footer-link-21">
              Volunteer
            </Link>
          </div>

          {/* Contact Section */}
          <div className="footer-section-21">
            <h3 className="footer-title-21">Contact Info</h3>
            <div className="contact-info-21">
              <div className="contact-item-21">
                <div className="contact-icon-21">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="footer-link-21">mnofoundation@gmail.com</span>
              </div>
              <div className="contact-item-21">
                <div className="contact-icon-21">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.95 21c-1.05 0-2.08-.4-3-1.18-.88-.73-1.84-1.78-2.75-2.9-.9-1.12-1.66-2.29-2.2-3.53-.5-1.08-.81-2.05-.81-2.97 0-2.13 1.09-4.28 3.05-4.28 1.84 0 2.84 1.12 2.84 2.97 0 .21-2.65 2.44-2.65 4.09 0 .83.67 1.78 1.53 3.02.88 1.27 2 2.4 3.12 3.22.92.65 1.78 1.03 2.4 1.03 1.13 0 1.97-.55 1.97-2.3 0-1.87-2.63-2.44-2.63-4.09 0-.5.22-.97.65-1.38 1.44-1.44 2.64-2.04 2.64-4.09 0-2.13 1.09-4.28 3.05-4.28 1.84 0 2.84 1.12 2.84 2.97 0 .21-2.65 2.44-2.65 4.09 0 .83.67 1.78 1.53 3.02.88 1.27 2 2.4 3.12 3.22.92.65 1.78 1.03 2.4 1.03 1.13 0 1.97-.55 1.97-2.3 0-1.87-2.63-2.44-2.63-4.09 0-.5.22-.97.65-1.38 1.44-1.44 2.64-2.04 2.64-4.09 0-3.87-3.13-7-7-7-3.87 0-7 3.13-7 7 0 1.75.65 3.4 1.81 4.75z" />
                  </svg>
                </div>
                <span className="footer-link-21"><a href="tel:07012611567" style={{color: 'inherit', textDecoration: 'none'}}>07012611567</a></span>
              </div>
              <div className="contact-item-21">
                <div className="contact-icon-21">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <span className="footer-link-21">Nigeria</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section-21">
            <h3 className="footer-title-21">Stay Updated</h3>
            <p className="newsletter-text-21">
              Subscribe to our newsletter for the latest updates on our programs
              and impact stories.
            </p>
            <form className="newsletter-form-21" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input-21"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="newsletter-button-21"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                style={{
                  color: status === "success" ? "white" : "red",
                  marginTop: "10px",
                }}
              >
                {message}
              </p>
            )}

            {/* Newsletter Features */}
            <div className="newsletter-features-21">
              <div className="newsletter-feature-item-21">
                <div className="feature-dot-21"></div>
                <span className="feature-text-21">Monthly impact updates</span>
              </div>
              <div className="newsletter-feature-item-21">
                <div className="feature-dot-21"></div>
                <span className="feature-text-21">Event notifications</span>
              </div>
              <div className="newsletter-feature-item-21">
                <div className="feature-dot-21"></div>
                <span className="feature-text-21">Success stories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-21">
          <div className="footer-bottom-content-21">
            <div className="footer-links-21">
              <a href="#" className="footer-link-21 footer-link-small-21">
                Privacy Policy
              </a>
              <a href="#" className="footer-link-21 footer-link-small-21">
                Terms of Service
              </a>
              <a href="#" className="footer-link-21 footer-link-small-21">
                Cookie Policy
              </a>
              <a href="#" className="footer-link-21 footer-link-small-21">
                Accessibility
              </a>
            </div>
            <p className="footer-copyright-21">
              © 2024 Margaret Nkem Orakwusi Foundation. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
