import { useEffect, useState } from 'react';
import './Home.css';
import profileImg from '../../assets/suman23.jpeg';

const ROLES = ['Full Stack Developer', 'MERN Stack Dev', 'Flutter Developer', 'CSE Student'];

const SOCIAL_LINKS = [
  { href: 'https://github.com/Suman-Mondal007',          icon: 'fab fa-github',     label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/suman-mondal-97ab1b28a',
    icon: 'fab fa-linkedin-in', label: 'LinkedIn'
  },
  { href: 'https://leetcode.com/u/sumanmondal_007/',     icon: 'fas fa-code',       label: 'LeetCode' },
  { href: 'https://www.facebook.com/profile.php?id=100069775315043', icon: 'fab fa-facebook-f', label: 'Facebook' },
];

// Floating tech icons around hero
const FLOATING_ICONS = [
  { icon: 'fab fa-react', x: '85%', y: '20%', delay: '0s', size: '2rem', color: '#61dafb' },
  { icon: 'fab fa-node-js', x: '90%', y: '55%', delay: '1s', size: '1.8rem', color: '#68a063' },
  { icon: 'fab fa-python', x: '80%', y: '80%', delay: '2s', size: '1.6rem', color: '#ffd43b' },
  { icon: 'fas fa-database', x: '5%', y: '75%', delay: '0.5s', size: '1.4rem', color: '#47a248' },
  { icon: 'fab fa-flutter', x: '3%', y: '30%', delay: '1.5s', size: '1.6rem', color: '#02569b' },
  { icon: 'fab fa-js-square', x: '8%', y: '55%', delay: '2.5s', size: '1.5rem', color: '#f7df1e' },
  { icon: 'fab fa-html5', x: '88%', y: '40%', delay: '0.8s', size: '1.4rem', color: '#e34f26' },
  { icon: 'fab fa-css3-alt', x: '92%', y: '70%', delay: '1.8s', size: '1.3rem', color: '#264de4' },
];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Entrance animation
  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section show">
      {/* Floating tech icons */}
      <div className="floating-icons">
        {FLOATING_ICONS.map((fi, i) => (
          <i
            key={i}
            className={`floating-icon ${fi.icon}`}
            style={{
              left: fi.x,
              top: fi.y,
              animationDelay: fi.delay,
              fontSize: fi.size,
              color: fi.color,
            }}
          />
        ))}
      </div>

      <div className={`hero-text ${showContent ? 'hero-text-visible' : ''}`}>
        <span className="hero-tag">
          <span className="tag-pulse" />
          CSE Student & Developer
        </span>

        <h1>
          Hi, I&apos;m <br />
          <span className="name-gradient">Suman Mondal</span>
        </h1>

        <p className="hero-bio">
          I&apos;m a passionate Computer Science student focused on building
          intelligent software and beautiful user interfaces. I specialize in{' '}
          <span className="typed-text">{displayText}</span>
          <span className="cursor-blink">|</span>
          {' '}and thrive on solving complex technical challenges with clean, efficient code.
        </p>

        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">
            <i className="fas fa-rocket" style={{ marginRight: '8px' }} />
            Hire Me!
          </a>
          <a href="#projects" className="btn btn-secondary">
            <i className="fas fa-briefcase" style={{ marginRight: '8px' }} />
            My Work
          </a>
          <button
            type="button"
            className="btn btn-robot-cta"
            onClick={() => {
              const trigger = document.getElementById('ai-bot-trigger');
              if (trigger) trigger.click();
            }}
          >
            <i className="fas fa-robot" style={{ marginRight: '8px', color: '#00f5ff' }} />
            AI Companion &amp; Tour
          </button>
        </div>

        <div className="social-links">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className="social-icon" target="_blank" rel="noreferrer" title={s.label}>
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Profile Image */}
      <div className={`hero-img-container ${showContent ? 'hero-img-visible' : ''}`}>
        <img src={profileImg} alt="Suman Mondal" className="main-img" />
        {/* Status indicator */}
        <div className="availability-badge">
          <span className="avail-dot" />
          Available for work
        </div>
      </div>
    </section>
  );
};

export default Home;
