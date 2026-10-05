import './About.css';
import profileImg from '../../assets/suman23.jpeg';
import AnimatedCounter from '../../components/AnimatedCounter';

const STATS = [
  { num: '4th',  label: 'Year CSE', icon: 'fas fa-graduation-cap' },
  { num: '5+',   label: 'Projects', icon: 'fas fa-rocket' },
  { num: '8+',   label: 'Certificates', icon: 'fas fa-certificate' },
  { num: '100+', label: 'LeetCode', icon: 'fas fa-code' },
];

const HIGHLIGHTS = [
  { icon: 'fas fa-layer-group', text: 'MERN Stack' },
  { icon: 'fab fa-flutter', text: 'Flutter' },
  { icon: 'fas fa-brain', text: 'AI Integration' },
  { icon: 'fas fa-server', text: 'REST APIs' },
];

const About = () => {
  return (
    <section id="about">
      <h2 className="section-title">
        About <span>Me</span>
      </h2>

      <div className="about-content">
        {/* Profile Image with Dedicated Modern Frame */}
        <div className="about-img-wrapper">
          <div className="about-img-frame">
            <div className="about-img-ambient-glow" />
            <img src={profileImg} alt="Suman Mondal" className="about-profile-img" />
            
            {/* Corner Decorative HUD Crosshairs */}
            <span className="about-hud-corner tl">+</span>
            <span className="about-hud-corner tr">+</span>
            <span className="about-hud-corner bl">+</span>
            <span className="about-hud-corner br">+</span>

            {/* Floating Experience Badge */}
            <div className="about-floating-badge top-right">
              <i className="fas fa-graduation-cap" />
              <div>
                <strong>4th Year CSE</strong>
                <span>Final Year Student</span>
              </div>
            </div>

            {/* Floating Tech Badge */}
            <div className="about-floating-badge bottom-left">
              <span className="badge-pulse-beacon" />
              <div>
                <strong>Full Stack Dev</strong>
                <span>MERN &amp; Flutter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="about-text">
          <h2>
            I&apos;m Suman, a <span>Tech Enthusiast</span>
          </h2>

          <p>
            I specialize in building robust backend systems and intuitive frontend
            experiences. I believe code is a tool for creating meaningful solutions
            — not just making things work, but creating scalable, maintainable, and
            impactful software.
          </p>

          <p>
            Currently in my final year of Computer Science Engineering, I have worked
            on a range of projects from RFID-based attendance systems to healthcare
            monitoring apps. My focus is on the MERN Stack, Flutter, and exploring
            AI integrations.
          </p>

          {/* Skill highlights */}
          <div className="about-highlights">
            {HIGHLIGHTS.map((h) => (
              <div className="highlight-chip" key={h.text}>
                <i className={h.icon} />
                <span>{h.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="about-stats">
            {STATS.map((s) => (
              <div className="stat-item" key={s.label}>
                <i className={s.icon} />
                <span className="stat-num">
                  <AnimatedCounter target={s.num} />
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1Kx01bqfaVUKRRTYCbrhQtWkxcrVjW1Vn/view?usp=sharing"
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-file-pdf" style={{ marginRight: '8px' }}></i>
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
