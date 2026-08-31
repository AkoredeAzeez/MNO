'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);

  // Handle scrolling to hash on page load
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash;
        const element = document.querySelector(hash);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Stories', href: '#stories' },
    { name: 'Events', href: '#events' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      // Check if we're on the homepage
      if (pathname === '/') {
        // We're on homepage, just scroll to section
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      } else {
        // We're on another page, navigate to homepage with hash
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header 
      className={`navbar-header ${isVisible ? 'navbar-visible' : 'navbar-hidden'} ${
        isScrolled ? 'navbar-scrolled' : 'navbar-transparent'
      }`}
    >
      <nav className="navbar-nav">
        <div className="navbar-content">
          
          {/* Logo */}
          <div className="navbar-logo-section">
            <Link 
              href="/"
              className="navbar-logo-link"
            >
              <div className="navbar-logo-image">
                <Image 
                  src="/img/mnologo.jpg"
                  alt="Foundation Logo"
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <span className="navbar-brand-name navbar-brand-desktop">MARGARET NKEM ORAKWUSI FOUNDATION</span>
              <div className="navbar-brand-mobile-logo">
                <Image 
                  src="/img/mnologo.jpg"
                  alt="Foundation Logo"
                  width={100}
                  height={70}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-menu">
            {navLinks.map((link) => (
              link.name === 'Home' ? (
                <Link
                  key={link.name}
                  href="/"
                  className={`navbar-link ${
                    isScrolled ? 'navbar-link-scrolled' : 'navbar-link-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`navbar-link ${
                    isScrolled ? 'navbar-link-scrolled' : 'navbar-link-transparent'
                  }`}
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* Desktop Donate Button */}
          <div className="navbar-donate-desktop">
            <Link
              href="/donate"
              className="navbar-donate-btn"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`navbar-mobile-toggle ${
              isScrolled ? 'navbar-mobile-toggle-scrolled' : 'navbar-mobile-toggle-transparent'
            }`}
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`navbar-hamburger-icon ${isMobileMenuOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`navbar-hamburger-icon ${isMobileMenuOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-menu-content">
              {navLinks.map((link) => (
                link.name === 'Home' ? (
                  <Link
                    key={link.name}
                    href="/"
                    className="navbar-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="navbar-mobile-link"
                  >
                    {link.name}
                  </button>
                )
              ))}
              <Link
                href="/donate"
                className="navbar-mobile-donate"
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}