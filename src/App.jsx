import { useState, useEffect } from 'react';
import Navbar from './pages/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Projects from './pages/myproject/Projects';
import Skills from './pages/skills/Skills';
import Certificates from './pages/certificates/Certificates';
import Contact from './pages/contact/Contact';
import Modal from './components/Modal';
import AIBot from './components/AIBot/AIBot';
import Particles from './components/Particles';

function App() {
  const [modalData, setModalData] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for section animations with stagger
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');

            // Stagger animate child cards
            const cards = entry.target.querySelectorAll('.card, .stat-item, .detail-item');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 0.1}s`;
              card.classList.add('card-visible');
            });
          }
        });
      },
      { threshold: 0.06 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Magnetic cursor effect for buttons
  useEffect(() => {
    const btns = document.querySelectorAll('.btn, .social-icon, .nav-links a');
    const handlers = [];

    btns.forEach((btn) => {
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      };
      const handleLeave = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      handlers.push({ btn, handleMove, handleLeave });
    });

    return () => {
      handlers.forEach(({ btn, handleMove, handleLeave }) => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  // 3D Card Tilt Effect for modern interactive depth
  useEffect(() => {
    const cards = document.querySelectorAll('.card, .hero-img-container');
    const cleanups = [];

    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  const openModal = (title, description, iconClass) => {
    setModalData({ title, description, iconClass });
  };

  const closeModal = () => setModalData(null);

  return (
    <>
      {/* Interactive particle background */}
      <Particles />

      {/* Animated background blobs */}
      <div className="bg-animate">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Modal */}
      <Modal data={modalData} onClose={closeModal} />

      {/* AI Chatbot */}
      <AIBot />

      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <main>
        <Home />
        <About />
        <Skills />
        <Projects openModal={openModal} />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>Designed & Built by <strong>Suman Mondal</strong> ✦ {new Date().getFullYear()}</p>
          <p className="footer-sub">Crafted with React, passion, and lots of ☕</p>
        </div>
      </footer>
    </>
  );
}

export default App;
