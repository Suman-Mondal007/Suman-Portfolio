import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const SKILLS = [
  { icon: 'fas fa-file-code',  title: 'C Language',   desc: 'Foundational logic & memory management.', level: 85 },
  { icon: 'fas fa-copyright',  title: 'C++',           desc: 'OOP, Data Structures & competitive programming.', level: 80 },
  { icon: 'fas fa-layer-group',title: 'Frontend',      desc: 'HTML5, CSS3, JavaScript ES6+, React.js.', level: 90 },
  { icon: 'fas fa-mobile-alt', title: 'Flutter',       desc: 'Cross-platform Mobile App Development.', level: 75 },
  { icon: 'fab fa-python',     title: 'Python',        desc: 'Automation, scripting & AI basics.', level: 70 },
  { icon: 'fas fa-server',     title: 'Backend',       desc: 'Node.js, Express, MongoDB & REST APIs.', level: 85 },
  { icon: 'fab fa-react',      title: 'React.js',      desc: 'Component-based UI & state management.', level: 88 },
  { icon: 'fas fa-database',   title: 'MongoDB',       desc: 'NoSQL database design & aggregation.', level: 78 },
];

const Skills = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <h2 className="section-title">
        Technical <span>Expertise</span>
      </h2>

      <div className="cards-grid">
        {SKILLS.map((skill, index) => (
          <div
            className="card skill-card"
            key={skill.title}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <div className="skill-icon-wrap">
              <i className={skill.icon}></i>
            </div>
            <h3>{skill.title}</h3>
            <p>{skill.desc}</p>
            <div className="skill-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: animated ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 0.1 + 0.3}s`,
                  }}
                />
              </div>
              <span className="skill-level">{animated ? skill.level : 0}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
