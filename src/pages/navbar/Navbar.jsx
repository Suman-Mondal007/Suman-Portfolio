import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <a href="#home" className="nav-logo">
        Suman<span>.</span>
      </a>

      {/* Desktop Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Bot Assistant Trigger */}
      <button
        type="button"
        className="nav-robot-btn"
        onClick={() => {
          const trigger = document.getElementById('ai-bot-trigger');
          if (trigger) trigger.click();
        }}
        title="Chat with Cyber-Suman"
      >
        <i className="fas fa-robot" />
        <span>Ask Bot</span>
      </button>

      {/* CTA Button */}
      <a href="#contact" className="btn btn-primary nav-cta">
        Let&apos;s Talk
      </a>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Navbar;
