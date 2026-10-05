import { useState } from 'react';
import './Projects.css';

// ─── Professional Projects Data ──────────────────────────────────────
const PROJECTS = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    category: 'Frontend & AI',
    status: 'live',
    statusLabel: 'Production Live',
    year: '2024',
    icon: 'fas fa-laptop-code',
    brandColor: '#8a2be2',
    architecture: 'React.js • Vite • Glassmorphic UI',
    summary:
      'Engineered a cutting-edge developer portfolio featuring 3D card tilt dynamics, responsive glassmorphism, and a conversational AI assistant with voice output and interactive robotic gestures.',
    skills: ['React.js', 'Vite', 'CSS3 Glassmorphism', 'AI Chatbot', 'TTS Voice'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Suman-Mondal007',
    modal: {
      description:
        'A comprehensive personal portfolio platform built with React and Vite. Incorporates modern glassmorphism aesthetics, an interactive conversational AI robot assistant with speech synthesis and cybernetic gestures, particle canvas, dynamic project filtering, and verified credential credentials.',
    },
  },
  {
    id: 'attendance',
    title: 'Smart RFID Attendance System',
    category: 'Full Stack & IoT',
    status: 'live',
    statusLabel: 'Hardware Live',
    year: '2024',
    icon: 'fas fa-id-card-alt',
    brandColor: '#10b981',
    architecture: 'Node.js • Express • MongoDB • RFID',
    summary:
      'An enterprise IoT attendance automation system featuring contactless RFID card logging, role-segregated teacher and student dashboards, automated anomaly alerts, and PDF report exports.',
    skills: ['RFID Hardware', 'Node.js', 'MongoDB', 'Express.js', 'RESTful API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Suman-Mondal007',
    modal: {
      description:
        'Hardware-software integrated smart attendance system. Features instant contactless RFID card tapping, live cloud logging into MongoDB, role-based access for students and educators, automated absence email dispatches, and exportable monthly attendance metrics.',
    },
  },
  {
    id: 'healthcare',
    title: 'Healthcare Routine Tracker',
    category: 'Frontend & HealthTech',
    status: 'live',
    statusLabel: 'Production Live',
    year: '2024',
    icon: 'fas fa-heartbeat',
    brandColor: '#ef4444',
    architecture: 'Vanilla JS • HTML5 • CSS3 • Netlify',
    summary:
      'A real-time wellness and health tracking web application delivering instant BMI computation, nutritional calorie estimates, and personalized daily exercise regimens with a mobile-first interface.',
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'BMI Engine', 'Netlify CI/CD'],
    liveUrl: 'https://healthcareroutine.netlify.app/',
    githubUrl: 'https://github.com/Suman-Mondal007',
    modal: {
      description:
        'A health and wellness web application hosted on Netlify. Includes real-time BMI calculator with visual gauge, calorie and macronutrient estimation engines, adaptive workout suggestions based on target goals, and responsive mobile-first UI.',
    },
  },
  {
    id: 'villagefair',
    title: 'Village Fair Contribution Platform',
    category: 'Full Stack & FinTech',
    status: 'live',
    statusLabel: 'Production Live',
    year: '2024',
    icon: 'fas fa-store-alt',
    brandColor: '#f59e0b',
    architecture: 'React.js • Node.js • Express • MongoDB',
    summary:
      'A civic community web platform enabling rural event organizers and villagers to manage digital stalls, register exhibitions, process public contributions, and maintain transparent financial ledgers.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express', 'FinTech Gateway'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Suman-Mondal007',
    modal: {
      description:
        'Civic digital platform bridging traditional village fairs with modern e-commerce and donation tracking. Facilitates online stall bookings, secure payment gateway integrations, real-time public contribution leaderboards, and administrative revenue analytics.',
    },
  },
  {
    id: 'upcoming',
    title: 'AI Nexus: Agentic Pipeline',
    category: 'AI & Cloud Pipeline',
    status: 'soon',
    statusLabel: 'In Development',
    year: '2025',
    icon: 'fas fa-brain',
    brandColor: '#00f5ff',
    architecture: 'Python • Vertex AI • Next.js • Docker',
    summary:
      'An experimental agentic AI laboratory researching autonomous multi-agent reasoning, retrieval-augmented generation (RAG), and streaming generative interfaces for complex workflow automation.',
    skills: ['Generative AI', 'Vertex AI', 'Python LLMs', 'Docker', 'Next.js'],
    liveUrl: null,
    githubUrl: 'https://github.com/Suman-Mondal007',
    modal: {
      description:
        'An ongoing research initiative exploring multi-agent coordination, autonomous tool calling, and RAG architectures powered by Gemini and Vertex AI models. Designed to automate complex enterprise workflows with high observability and low latency.',
    },
  },
];

const CATEGORIES = [
  'All',
  'Full Stack & IoT',
  'Frontend & AI',
  'Frontend & HealthTech',
  'Full Stack & FinTech',
  'AI & Cloud Pipeline',
];

const Projects = ({ openModal }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="proj-section">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>

      {/* Professional Stats & Showcase Banner */}
      <div className="proj-executive-banner">
        <div className="proj-stat-badge">
          <i className="fas fa-layer-group" />
          <span>
            <strong>4 Production Systems</strong> + 1 Next-Gen AI Pipeline
          </span>
        </div>
        <div className="proj-partner-avatars">
          <span title="React.js"><i className="fab fa-react" /></span>
          <span title="Node.js"><i className="fab fa-node-js" /></span>
          <span title="MongoDB"><i className="fas fa-database" /></span>
          <span title="IoT & RFID"><i className="fas fa-microchip" /></span>
          <span title="AI Lab"><i className="fas fa-brain" /></span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="proj-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`proj-filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <span className="cat-count">
              {cat === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Professional Project Cards Grid */}
      <div className="proj-cards-grid">
        {filteredProjects.map((project) => (
          <div className="proj-card-pro" key={project.id}>
            {/* Top Bar with Brand Icon, Category & Verification/Live Beacon */}
            <div className="proj-card-top">
              <div
                className="proj-brand-icon"
                style={{
                  background: `radial-gradient(circle, ${project.brandColor}22 0%, rgba(255,255,255,0.02) 70%)`,
                  borderColor: `${project.brandColor}44`,
                  color: project.brandColor,
                }}
              >
                <i className={project.icon} />
              </div>

              <div className="proj-status-meta">
                {project.status === 'live' ? (
                  <span className="proj-verified-beacon">
                    <span className="beacon-dot" />
                    {project.statusLabel}
                  </span>
                ) : (
                  <span className="proj-soon-beacon">
                    <span className="beacon-dot beacon-cyan" />
                    {project.statusLabel}
                  </span>
                )}
                <span className="proj-year-tag">{project.year}</span>
              </div>
            </div>

            {/* Project Content Body */}
            <div className="proj-card-body">
              <span className="proj-category-label">{project.category}</span>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-architecture-line">
                <i className="fas fa-check-circle" style={{ color: project.brandColor }} />
                <span>Tech: <strong>{project.architecture}</strong></span>
              </p>
              <p className="proj-summary">{project.summary}</p>

              {/* Skills / Tech Stack Tags */}
              <div className="proj-skill-tags">
                {project.skills.map((skill) => (
                  <span key={skill} className="proj-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Footer with Direct Action Buttons */}
            <div className="proj-card-footer">
              <div className="proj-doc-badge">
                <i
                  className={
                    project.status === 'live'
                      ? 'fas fa-check-double'
                      : 'fas fa-flask'
                  }
                  style={{ color: project.status === 'live' ? '#10b981' : '#00f5ff' }}
                />
                <span>{project.status === 'live' ? 'Tested & Deployed' : 'Active Prototype'}</span>
              </div>

              <div className="proj-action-buttons">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn-code"
                    title={`View ${project.title} on GitHub`}
                  >
                    <i className="fab fa-github" />
                    <span>Code</span>
                  </a>
                )}

                {project.liveUrl && project.liveUrl !== '#' ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-verify-btn"
                    title={`Launch ${project.title} in new tab`}
                  >
                    <span>Live Demo</span>
                    <i className="fas fa-arrow-up-right-from-square" />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="proj-verify-btn"
                    onClick={() =>
                      openModal(
                        project.title,
                        project.modal?.description || project.summary,
                        project.icon
                      )
                    }
                    title={`Explore architecture of ${project.title}`}
                  >
                    <span>Overview</span>
                    <i className="fas fa-info-circle" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
