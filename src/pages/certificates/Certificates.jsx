import { useState } from 'react';
import './Certificates.css';

// ---- Professional Certificate Data ----
const CERTIFICATES = [
  {
    id: 'gdsc',
    title: 'Google Solution Challenge',
    issuer: 'Google Developer Student Club',
    category: 'Cloud & AI',
    date: '2024',
    badge: 'Global Challenge',
    icon: 'fab fa-google',
    brandColor: '#4285F4',
    desc: 'Recognized for developing solutions addressing UN Sustainable Development Goals using Google cloud & web technologies.',
    skills: ['Mobile/Web', 'SDGs', 'Google Tech'],
    link: 'https://drive.google.com/file/d/1SbRgjYIFr2mIplQjVv4s4kL2uWVGMYmV/view?usp=sharing',
  },
  {
    id: 'genai',
    title: 'Generative AI Studio',
    issuer: 'Google Cloud Training',
    category: 'Cloud & AI',
    date: '2024',
    badge: 'Cloud Credential',
    icon: 'fas fa-brain',
    brandColor: '#00f5ff',
    desc: 'Comprehensive training on Vertex AI, Large Language Models (LLMs), prompt engineering & multimodal AI applications.',
    skills: ['Vertex AI', 'Prompt Engineering', 'Generative Models'],
    link: 'https://drive.google.com/file/d/1P4rjaVPheo6dC1QGXAOYAy-QLbJoZNvU/view?usp=sharing',
  },
  {
    id: 'sql',
    title: 'SQL Analytics & BI Platform',
    issuer: 'Databricks Academy',
    category: 'Data & Analytics',
    date: '2024',
    badge: 'Industry Credential',
    icon: 'fas fa-database',
    brandColor: '#FF3621',
    desc: 'Hands-on accreditation in Lakehouse SQL analytics, query performance optimization & enterprise BI dashboards.',
    skills: ['Databricks Lakehouse', 'SQL Analytics', 'BI Reporting'],
    link: 'https://drive.google.com/file/d/1cJyPm-8ngZfWky6OvGc_xZpvQSfRDe8g/view?usp=sharing',
  },
  {
    id: 'copilot',
    title: 'GitHub Copilot: AI Prompting',
    issuer: 'GitHub Education',
    category: 'Cloud & AI',
    date: '2024',
    badge: 'Developer Certificate',
    icon: 'fab fa-github',
    brandColor: '#8a2be2',
    desc: 'Proficiency in AI-driven developer productivity, prompt formulation, code completion & unit testing workflows.',
    skills: ['GitHub Copilot', 'Prompt Engineering', 'Dev Productivity'],
    link: 'https://drive.google.com/file/d/1JNH_8ag46T7KB20wEOutmzEefnKF9GBZ/view?usp=sharing',
  },
  {
    id: 'flutter',
    title: 'Flutter App Architecture',
    issuer: 'Udemy Certification',
    category: 'Mobile Dev',
    date: '2024',
    badge: 'Specialization',
    icon: 'fab fa-flutter',
    brandColor: '#02569B',
    desc: 'Advanced architectural patterns in Flutter/Dart, state management, REST API integration & cross-platform UX.',
    skills: ['Flutter', 'Dart', 'State Management'],
    link: 'https://drive.google.com/file/d/1k82LMvEmYdXc91wtiewqsZQhAmDvDFF9/view?usp=sharing',
  },
  {
    id: 'c-lang',
    title: 'C Programming Masterclass',
    issuer: 'Great Learning Academy',
    category: 'Programming',
    date: '2023',
    badge: 'Core CS Foundations',
    icon: 'fas fa-code',
    brandColor: '#00838F',
    desc: 'Rigorous foundation in pointers, dynamic memory allocation, data structures and algorithm analysis.',
    skills: ['C Language', 'Memory Management', 'Algorithms'],
    link: 'https://drive.google.com/file/d/1ZsydreyT5hxXE-UfT6YeSZRqkNkRjphd/view?usp=sharing',
  },
  {
    id: 'adobe',
    title: 'Adobe GenAI Hackathon',
    issuer: 'Adobe Student Hackathon',
    category: 'Hackathons',
    date: '2024',
    badge: 'Competition Merit',
    icon: 'fas fa-trophy',
    brandColor: '#FF0000',
    desc: 'Competed with national teams to design and code AI-powered creative productivity tools under timed sprint.',
    skills: ['GenAI Hackathon', 'Rapid Prototyping', 'UI/UX'],
    link: 'https://drive.google.com/file/d/1A5-qm4gKBhsVN2IWk1w5vZxCh71XXVWK/view?usp=sharing',
  },
  {
    id: 'robotics',
    title: 'Robotics & Hardware Systems',
    issuer: 'Hands-on Technical Workshop',
    category: 'Hardware & IoT',
    date: '2023',
    badge: 'Workshop Certificate',
    icon: 'fas fa-robot',
    brandColor: '#7C3AED',
    desc: 'Microcontroller interfacing, sensor arrays, actuator control logic & embedded systems debugging.',
    skills: ['Robotics', 'Sensors', 'Embedded Logic'],
    link: 'https://drive.google.com/file/d/10QYJFsE7Fj2otJzNlNevFyF1weGn3Nq5/view?usp=sharing',
  },
];

const CATEGORIES = [
  'All',
  'Cloud & AI',
  'Data & Analytics',
  'Mobile Dev',
  'Programming',
  'Hackathons',
  'Hardware & IoT',
];

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCertificates =
    activeCategory === 'All'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeCategory);

  return (
    <section id="certificates" className="cert-section">
      <h2 className="section-title">
        Official <span>Certificates</span>
      </h2>

      {/* Professional Stats & Authenticity Banner */}
      <div className="cert-executive-banner">
        <div className="cert-stat-badge">
          <i className="fas fa-shield-alt" />
          <span><strong>8 Verified Credentials</strong> from Global Tech Organizations</span>
        </div>
        <div className="cert-partner-avatars">
          <span title="Google"><i className="fab fa-google" /></span>
          <span title="Databricks"><i className="fas fa-database" /></span>
          <span title="GitHub"><i className="fab fa-github" /></span>
          <span title="Udemy"><i className="fab fa-flutter" /></span>
          <span title="Adobe"><i className="fas fa-trophy" /></span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="cert-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cert-filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <span className="cat-count">
              {cat === 'All'
                ? CERTIFICATES.length
                : CERTIFICATES.filter((c) => c.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Professional Credential Cards Grid */}
      <div className="cert-cards-grid">
        {filteredCertificates.map((cert) => (
          <div className="cert-card-pro" key={cert.id}>
            {/* Top Bar with Brand Icon, Category & Verification Beacon */}
            <div className="cert-card-top">
              <div
                className="cert-brand-icon"
                style={{
                  background: `radial-gradient(circle, ${cert.brandColor}22 0%, rgba(255,255,255,0.02) 70%)`,
                  borderColor: `${cert.brandColor}44`,
                  color: cert.brandColor,
                }}
              >
                <i className={cert.icon} />
              </div>

              <div className="cert-status-meta">
                <span className="cert-verified-beacon">
                  <span className="beacon-dot" />
                  Verified
                </span>
                <span className="cert-year-tag">{cert.date}</span>
              </div>
            </div>

            {/* Credential Content */}
            <div className="cert-card-body">
              <span className="cert-category-label">{cert.category}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer-line">
                <i className="fas fa-check-circle" style={{ color: cert.brandColor }} />
                <span>Issued by <strong>{cert.issuer}</strong></span>
              </p>
              <p className="cert-summary">{cert.desc}</p>

              {/* Skills Tags */}
              <div className="cert-skill-tags">
                {cert.skills.map((skill) => (
                  <span key={skill} className="cert-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Footer with Document Link */}
            <div className="cert-card-footer">
              <div className="cert-doc-badge">
                <i className="fas fa-file-pdf" />
                <span>Official PDF</span>
              </div>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-verify-btn"
                title={`View ${cert.title} certificate on Google Drive`}
              >
                <span>View Certificate</span>
                <i className="fas fa-arrow-up-right-from-square" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
