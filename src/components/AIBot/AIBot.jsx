import { useState, useRef, useEffect, useCallback } from 'react';
import RobotAvatar from './RobotAvatar';
import { playRobotSound, speakWithRobotVoice, stopRobotVoice } from './robotAudio';
import './AIBot.css';

// ─── Portfolio Knowledge Base ───────────────────────────────────────
const PORTFOLIO_DATA = {
  name: 'Suman Mondal',
  title: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'MERN Stack Dev', 'Flutter Developer', 'CSE Student'],
  location: 'West Bengal, India',
  email: 'sumansuman207127@gmail.com',
  phone: '+91 8159942709',
  year: '4th Year CSE',
  university: 'Computer Science Engineering',
  github: 'https://github.com/Suman-Mondal007',
  linkedin: 'https://www.linkedin.com/in/suman-mondal-97ab1b28a',
  leetcode: 'https://leetcode.com/u/sumanmondal_007/',
  facebook: 'https://www.facebook.com/profile.php?id=100069775315043',
  resume: 'https://drive.google.com/file/d/1Kx01bqfaVUKRRTYCbrhQtWkxcrVjW1Vn/view?usp=sharing',
  bio: `I specialize in building robust backend systems and intuitive frontend experiences. Currently in my final year of Computer Science Engineering, I have worked on a range of projects from RFID-based attendance systems to healthcare monitoring apps. My focus is on the MERN Stack, Flutter, and exploring AI integrations.`,
  skills: [
    { title: 'C Language', desc: 'Foundational logic & memory management.', level: 85, category: 'Languages' },
    { title: 'C++', desc: 'OOP, Data Structures & competitive programming.', level: 80, category: 'Languages' },
    { title: 'Frontend', desc: 'HTML5, CSS3, JavaScript ES6+, React.js.', level: 90, category: 'Frontend' },
    { title: 'Flutter', desc: 'Cross-platform Mobile App Development.', level: 75, category: 'Mobile' },
    { title: 'Python', desc: 'Automation, scripting & AI basics.', level: 70, category: 'Languages' },
    { title: 'Backend', desc: 'Node.js, Express, MongoDB & REST APIs.', level: 85, category: 'Backend' },
    { title: 'React.js', desc: 'Component-based UI & state management.', level: 88, category: 'Frontend' },
    { title: 'MongoDB', desc: 'NoSQL database design & aggregation.', level: 78, category: 'Backend' },
  ],
  projects: [
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      desc: 'Premium glassmorphism UI built in React with Vite & CSS3.',
      tags: ['React', 'Vite', 'CSS3'],
      link: '#',
      badge: 'Live',
    },
    {
      id: 'attendance',
      title: 'RFID Attendance System',
      desc: 'Smart attendance with teacher & student portals, real-time logging & email notifications.',
      tags: ['RFID', 'Node.js', 'MongoDB'],
      link: '#',
      badge: 'Live',
    },
    {
      id: 'healthcare',
      title: 'Healthcare Routine',
      desc: 'Real-time health monitoring — BMI, Nutrition & personalized routine suggestions.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://healthcareroutine.netlify.app/',
      badge: 'Live',
    },
    {
      id: 'villagefair',
      title: 'Village Fair Collector',
      desc: 'Digital platform allowing villagers to participate in local fairs and register contributions.',
      tags: ['MERN', 'Payments'],
      link: '#',
      badge: 'Live',
    },
  ],
  certificates: [
    { title: 'Solution Challenge', issuer: 'Google', desc: 'Google Developer Student Club.', link: 'https://drive.google.com/file/d/1SbRgjYIFr2mIplQjVv4s4kL2uWVGMYmV/view?usp=sharing' },
    { title: 'C Language', issuer: 'Great Learning', desc: 'C completion certificate.', link: 'https://drive.google.com/file/d/1ZsydreyT5hxXE-UfT6YeSZRqkNkRjphd/view?usp=sharing' },
    { title: 'Flutter App Architecture', issuer: 'Udemy', desc: 'Advanced App Architecture certification.', link: 'https://drive.google.com/file/d/1k82LMvEmYdXc91wtiewqsZQhAmDvDFF9/view?usp=sharing' },
    { title: 'Robotic Sessions', issuer: 'Workshop', desc: 'Hands-on session on robotics.', link: 'https://drive.google.com/file/d/10QYJFsE7Fj2otJzNlNevFyF1weGn3Nq5/view?usp=sharing' },
    { title: 'Adobe Hackathon', issuer: 'Adobe', desc: 'Participation in online hackathon.', link: 'https://drive.google.com/file/d/1A5-qm4gKBhsVN2IWk1w5vZxCh71XXVWK/view?usp=sharing' },
    { title: 'Generative AI Studio', issuer: 'Google Cloud', desc: 'Introduction to Generative AI Studio.', link: 'https://drive.google.com/file/d/1P4rjaVPheo6dC1QGXAOYAy-QLbJoZNvU/view?usp=sharing' },
    { title: 'SQL Analytics & BI', issuer: 'Databricks', desc: 'SQL Analytics and BI on Databricks.', link: 'https://drive.google.com/file/d/1cJyPm-8ngZfWky6OvGc_xZpvQSfRDe8g/view?usp=sharing' },
    { title: 'GitHub Copilot', issuer: 'GitHub', desc: 'Introduction to Prompt Engineering.', link: 'https://drive.google.com/file/d/1JNH_8ag46T7KB20wEOutmzEefnKF9GBZ/view?usp=sharing' },
  ],
  stats: { year: '4th Year CSE', projects: '5+', certificates: '8+', leetcode: '100+' },
};

// ─── Guided Tour Steps ──────────────────────────────────────────────
const TOUR_STEPS = [
  {
    targetId: 'home',
    title: 'Hero / Introduction',
    gesture: 'wave',
    speech: "Welcome to Suman Mondal's portfolio! Suman is a final-year Computer Science Engineering student and passionate Full Stack Developer.",
  },
  {
    targetId: 'about',
    title: 'About Suman',
    gesture: 'think',
    speech: "Here is Suman's background, education, and stats — 4th Year CSE with 5+ projects and 8+ credentials!",
  },
  {
    targetId: 'skills',
    title: 'Technical Skills',
    gesture: 'scan',
    speech: "Scanning tech stack: Strong in MERN Stack, Flutter, Python, and C/C++ with core computer science foundations.",
  },
  {
    targetId: 'projects',
    title: 'Live Projects',
    gesture: 'point',
    speech: "Explore his featured projects! The RFID Smart Attendance System, Healthcare Routine web app, and Village Fair Collector.",
  },
  {
    targetId: 'certificates',
    title: 'Official Certificates',
    gesture: 'celebrate',
    speech: "Certified by Google Developer Student Club, Google Cloud, Databricks, and GitHub Copilot!",
  },
  {
    targetId: 'contact',
    title: 'Connect & Contact',
    gesture: 'wave',
    speech: "Ready to collaborate or hire Suman? Reach out directly via email, phone, or send a message right here!",
  },
];

// Helper to scroll and highlight section
const jumpToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('section-robot-highlight');
    setTimeout(() => {
      el.classList.remove('section-robot-highlight');
    }, 2800);
  }
};

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gesture, setGesture] = useState('wave'); // 'idle' | 'wave' | 'think' | 'point' | 'scan' | 'celebrate' | 'speak'
  const [speaking, setSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      gesture: 'wave',
      text: `Greetings human! 🤖 I am **CYBER-SUMAN**, Suman's robotic AI assistant.\n\nI can retrieve ANY detail from his portfolio, guide you through his work, or showcase robotic gestures!`,
      actions: [
        { label: '🚀 Fetch Projects', query: 'Show me all projects' },
        { label: '⚡ Fetch Skills', query: 'Show all technical skills' },
        { label: '📜 Fetch Certificates', query: 'Show all certificates' },
        { label: '📄 Get Resume', query: 'Fetch resume link' },
        { label: '🧭 Start Guided Tour', action: 'start-tour' },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll inside chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on chat open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
      if (soundEnabled) playRobotSound('click');
    }
  }, [isOpen, soundEnabled]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInputVal(transcript);
        handleSendQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Please type your message.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (soundEnabled) playRobotSound('click');
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Trigger manual robotic gesture
  const triggerGesture = (newGesture, soundType = 'click', speechText = null) => {
    setGesture(newGesture);
    if (soundEnabled) playRobotSound(soundType);

    if (speechText && voiceEnabled) {
      setSpeaking(true);
      speakWithRobotVoice(speechText, () => {
        setSpeaking(false);
        setGesture('idle');
      });
    } else {
      setTimeout(() => {
        setGesture((prev) => (prev === newGesture ? 'idle' : prev));
      }, 3500);
    }
  };

  // Guided Tour Handler
  const handleTourStep = (stepIdx) => {
    if (stepIdx < 0 || stepIdx >= TOUR_STEPS.length) {
      setTourActive(false);
      setGesture('celebrate');
      if (soundEnabled) playRobotSound('celebrate');
      addBotMessage(
        "🎉 **Tour Completed!** You've seen all major highlights of Suman's portfolio. Feel free to explore further or drop him a message!",
        'celebrate'
      );
      return;
    }

    const step = TOUR_STEPS[stepIdx];
    setTourIndex(stepIdx);
    setTourActive(true);
    setGesture(step.gesture);
    jumpToSection(step.targetId);

    if (soundEnabled) playRobotSound('point');

    if (voiceEnabled) {
      setSpeaking(true);
      speakWithRobotVoice(step.speech, () => setSpeaking(false));
    }

    addBotMessage(
      `🧭 **Tour Step ${stepIdx + 1}/${TOUR_STEPS.length}: ${step.title}**\n\n${step.speech}`,
      step.gesture,
      [
        stepIdx < TOUR_STEPS.length - 1
          ? { label: 'Next Stop ▶', action: `tour-${stepIdx + 1}` }
          : { label: 'Finish Tour 🎉', action: 'tour-end' },
        stepIdx > 0 ? { label: '◀ Previous', action: `tour-${stepIdx - 1}` } : null,
        { label: 'Exit Tour ✕', action: 'tour-end' },
      ].filter(Boolean)
    );
  };

  const addBotMessage = (text, robotGesture = 'idle', actions = null, dataPayload = null) => {
    setGesture(robotGesture);
    if (soundEnabled) {
      const sound =
        robotGesture === 'celebrate'
          ? 'celebrate'
          : robotGesture === 'scan'
          ? 'scan'
          : robotGesture === 'think'
          ? 'think'
          : 'message';
      playRobotSound(sound);
    }

    if (voiceEnabled) {
      setSpeaking(true);
      speakWithRobotVoice(text, () => setSpeaking(false));
    }

    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text,
        gesture: robotGesture,
        actions,
        dataPayload,
      },
    ]);
  };

  // ─── Query / Details Fetching Engine ──────────────────────────────
  const handleSendQuery = useCallback(
    (input) => {
      const q = input.toLowerCase().trim();
      if (!q) return;

      // Add user message
      setMessages((prev) => [...prev, { type: 'user', text: input.trim() }]);
      setInputVal('');
      setIsTyping(true);
      setGesture('think');
      if (soundEnabled) playRobotSound('think');

      setTimeout(() => {
        setIsTyping(false);

        // 1. TOUR TRIGGER
        if (/tour|guide|walkthrough|overview|show me around/i.test(q)) {
          handleTourStep(0);
          return;
        }

        // 2. FETCH PROJECTS
        if (/project|built|build|portfolio.*site|work|app|system|rfid|attendance|healthcare/i.test(q)) {
          addBotMessage(
            `🚀 **Retrieved ${PORTFOLIO_DATA.projects.length} Featured Projects:**\n\nDirectly access live demos and source codes below:`,
            'point',
            [
              { label: '📍 Jump to Projects Section', action: 'jump-projects' },
              { label: '⚡ Show Technical Skills', query: 'Show skills' },
            ],
            { type: 'projects', items: PORTFOLIO_DATA.projects }
          );
          return;
        }

        // 3. FETCH SKILLS
        if (/skill|tech|stack|mern|frontend|backend|flutter|python|language|c\+\+|mongo/i.test(q)) {
          addBotMessage(
            `⚡ **Retrieved Technical Skills & Proficiency:**\n\nSuman is strongest in Full Stack MERN development & Flutter cross-platform apps:`,
            'scan',
            [
              { label: '📍 Jump to Skills Section', action: 'jump-skills' },
              { label: '🚀 View Projects Built with These', query: 'Show projects' },
            ],
            { type: 'skills', items: PORTFOLIO_DATA.skills }
          );
          return;
        }

        // 4. FETCH CERTIFICATES
        if (/cert|award|credential|google|udemy|databricks|achievement/i.test(q)) {
          addBotMessage(
            `📜 **Retrieved ${PORTFOLIO_DATA.certificates.length} Verified Certificates:**\n\nClick any credential to view the official Google Drive certificate:`,
            'celebrate',
            [
              { label: '📍 Jump to Certificates Section', action: 'jump-certificates' },
              { label: '📄 View Full Resume', query: 'Get resume' },
            ],
            { type: 'certificates', items: PORTFOLIO_DATA.certificates }
          );
          return;
        }

        // 5. FETCH RESUME
        if (/resume|cv|download|document/i.test(q)) {
          addBotMessage(
            `📄 **Retrieved Suman's Resume (PDF):**\n\nLatest updated copy covering education, full-stack projects, competitive coding, and certifications.`,
            'point',
            [
              { label: '🔗 Open Resume in Google Drive', externalUrl: PORTFOLIO_DATA.resume },
              { label: '📬 Contact Suman for Hiring', query: 'Contact details' },
            ]
          );
          return;
        }

        // 6. FETCH CONTACT
        if (/contact|email|phone|call|hire|reach|message|social|linkedin|github/i.test(q)) {
          addBotMessage(
            `📬 **Direct Contact & Social Coordinates:**\n\n• 📧 Email: **${PORTFOLIO_DATA.email}**\n• 📞 Phone: **${PORTFOLIO_DATA.phone}**\n• 📍 Location: **${PORTFOLIO_DATA.location}**`,
            'wave',
            [
              { label: '✉️ Send Email', externalUrl: `mailto:${PORTFOLIO_DATA.email}` },
              { label: '📞 Call Now', externalUrl: `tel:${PORTFOLIO_DATA.phone}` },
              { label: '💼 LinkedIn Profile', externalUrl: PORTFOLIO_DATA.linkedin },
              { label: '🐱 GitHub Profile', externalUrl: PORTFOLIO_DATA.github },
              { label: '📍 Go to Contact Form', action: 'jump-contact' },
            ]
          );
          return;
        }

        // 7. GREETING
        if (/^(hi|hello|hey|yo|sup|greetings|hola)/i.test(q)) {
          addBotMessage(
            `Hey there! 👋 I am **CYBER-SUMAN**!\n\nI can fetch any detail from Suman's portfolio at light-speed. Try asking for projects, skills, certificates, or take an automated tour!`,
            'wave',
            [
              { label: '🚀 Fetch Projects', query: 'Show projects' },
              { label: '⚡ Fetch Skills', query: 'Show skills' },
              { label: '🧭 Start Guided Tour', action: 'start-tour' },
            ]
          );
          return;
        }

        // 8. ABOUT / BIO
        if (/who (is|are)|about (suman|him)|introduce|background|education|college/i.test(q)) {
          addBotMessage(
            `🧑‍💻 **About Suman Mondal:**\n\n${PORTFOLIO_DATA.bio}\n\n🎓 **Academics:** ${PORTFOLIO_DATA.year} in Computer Science Engineering.\n📍 **Location:** ${PORTFOLIO_DATA.location}`,
            'think',
            [
              { label: '⚡ Check Technical Skills', query: 'Show skills' },
              { label: '🚀 View Live Projects', query: 'Show projects' },
            ]
          );
          return;
        }

        // 9. JOKES / FUN
        if (/joke|robot|funny|dance/i.test(q)) {
          addBotMessage(
            `🤖 *Beep Boop!* Why did the robot go on vacation?\n\nTo recharge its batteries! ⚡🔋\n\nWatch my celebratory victory dance!`,
            'celebrate'
          );
          return;
        }

        // 10. FALLBACK SMART RESPONSE
        addBotMessage(
          `🔍 I searched Suman's database for "${input}". Here are direct links to explore:`,
          'scan',
          [
            { label: '⚡ Skills & Tech', query: 'Show skills' },
            { label: '🚀 Live Projects', query: 'Show projects' },
            { label: '📜 Official Certificates', query: 'Show certificates' },
            { label: '📄 Resume', query: 'Get resume' },
            { label: '🧭 Start Guided Tour', action: 'start-tour' },
          ]
        );
      }, 550);
    },
    [soundEnabled, voiceEnabled]
  );

  const handleActionClick = (act) => {
    if (soundEnabled) playRobotSound('click');

    if (act.action) {
      if (act.action === 'start-tour') {
        handleTourStep(0);
      } else if (act.action.startsWith('tour-')) {
        const nextIdx = act.action.replace('tour-', '');
        if (nextIdx === 'end') {
          setTourActive(false);
          setGesture('wave');
        } else {
          handleTourStep(parseInt(nextIdx, 10));
        }
      } else if (act.action === 'jump-projects') {
        jumpToSection('projects');
      } else if (act.action === 'jump-skills') {
        jumpToSection('skills');
      } else if (act.action === 'jump-certificates') {
        jumpToSection('certificates');
      } else if (act.action === 'jump-contact') {
        jumpToSection('contact');
      }
      return;
    }

    if (act.externalUrl) {
      window.open(act.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (act.query) {
      handleSendQuery(act.query);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendQuery(inputVal);
  };

  // Text formatter for bold & clean links
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return (
        <span key={i}>
          {parts}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* ─── FLOATING ROBOT COMPANION CAPSULE (When Chat is Closed) ─── */}
      {!isOpen && (
        <div className="robot-capsule-wrap">
          {/* Smart Tooltip Speech Bubble */}
          <div
            className="robot-speech-pill"
            onClick={() => {
              setIsOpen(true);
              triggerGesture('wave', 'wave');
            }}
          >
            <span className="speech-pulse-dot" />
            <span className="speech-text">
              👋 <strong>Hi! I&apos;m Suman-Bot.</strong> Click to fetch info &amp; take a tour!
            </span>
          </div>

          {/* Floating Robot Trigger */}
          <button
            className={`ai-bot-trigger gesture-mode-${gesture}`}
            onClick={() => {
              setIsOpen(true);
              triggerGesture('wave', 'wave');
            }}
            aria-label="Open Cyber Robot Assistant"
            id="ai-bot-trigger"
          >
            <div className="bot-avatar-embed">
              <RobotAvatar gesture={gesture} speaking={speaking} size="sm" />
            </div>

            {/* Orbiting cyber rings */}
            <span className="orbit-particle p1" />
            <span className="orbit-particle p2" />
            <span className="orbit-particle p3" />
            <div className="bot-hud-ring" />
          </button>
        </div>
      )}

      {/* ─── EXPANDED CYBER-ROBOT ASSISTANT TERMINAL ─── */}
      {isOpen && (
        <div className="ai-chat-window modern-terminal" id="ai-chat-window">
          {/* Terminal Top Bar */}
          <div className="chat-header cyber-header">
            <div className="header-robot-panel">
              <div
                className="header-avatar-wrap"
                title="Click me to trigger a robotic gesture!"
                onClick={() => triggerGesture('celebrate', 'celebrate', "Woohoo! Let's build something awesome!")}
              >
                <RobotAvatar gesture={gesture} speaking={speaking} size="md" interactive />
              </div>
              <div className="header-details">
                <div className="title-row">
                  <h4>CYBER-SUMAN <span>v2.5</span></h4>
                  <span className="badge-online">● ONLINE</span>
                </div>
                <p className="status-text">
                  {speaking
                    ? '🗣️ Speaking with user...'
                    : gesture === 'scan'
                    ? '🔍 Scanning portfolio database...'
                    : gesture === 'think'
                    ? '🤔 Processing request...'
                    : gesture === 'celebrate'
                    ? '🎉 Celebrating achievements!'
                    : gesture === 'point'
                    ? '👉 Highlighting portfolio section'
                    : '⚡ Suman’s Interactive Robotic Companion'}
                </p>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="header-controls">
              {/* Voice Speech Toggle */}
              <button
                className={`ctrl-btn ${voiceEnabled ? 'active' : ''}`}
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled) stopRobotVoice();
                  if (soundEnabled) playRobotSound('click');
                }}
                title={voiceEnabled ? 'Voice Assistant ON' : 'Voice Assistant OFF (Click to enable audio reading)'}
              >
                <i className={`fas ${voiceEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`} />
              </button>

              {/* Sound FX Toggle */}
              <button
                className={`ctrl-btn ${soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
              >
                <i className={`fas ${soundEnabled ? 'fa-bell' : 'fa-bell-slash'}`} />
              </button>

              {/* Close Button */}
              <button
                className="chat-close-btn"
                onClick={() => {
                  setIsOpen(false);
                  stopRobotVoice();
                }}
                aria-label="Close terminal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* ─── ROBOTIC GESTURES CONTROLLER BAR ─── */}
          <div className="robot-gestures-bar">
            <span className="gesture-bar-label">Robotic Gestures:</span>
            <div className="gesture-chips">
              <button
                className={`gesture-btn ${gesture === 'wave' ? 'active' : ''}`}
                onClick={() => triggerGesture('wave', 'wave', 'Hello there! Happy to meet you!')}
              >
                👋 Wave
              </button>
              <button
                className={`gesture-btn ${gesture === 'think' ? 'active' : ''}`}
                onClick={() => triggerGesture('think', 'think', 'Analyzing logic and algorithms...')}
              >
                🤔 Think
              </button>
              <button
                className={`gesture-btn ${gesture === 'scan' ? 'active' : ''}`}
                onClick={() => triggerGesture('scan', 'scan', 'Scanning Suman’s engineering repositories!')}
              >
                🔍 Scan
              </button>
              <button
                className={`gesture-btn ${gesture === 'point' ? 'active' : ''}`}
                onClick={() => {
                  triggerGesture('point', 'point', 'Notice this section right here!');
                  jumpToSection('projects');
                }}
              >
                👉 Point
              </button>
              <button
                className={`gesture-btn ${gesture === 'celebrate' ? 'active' : ''}`}
                onClick={() => triggerGesture('celebrate', 'celebrate', 'Hurray! Full stack magic!')}
              >
                🎉 Celebrate
              </button>
            </div>
          </div>

          {/* ─── TOUR PROGRESS BANNER (When tour is active) ─── */}
          {tourActive && (
            <div className="tour-status-banner">
              <div className="tour-badge">
                <i className="fas fa-compass fa-spin" /> Step {tourIndex + 1} of {TOUR_STEPS.length}: {TOUR_STEPS[tourIndex].title}
              </div>
              <div className="tour-actions-inline">
                {tourIndex < TOUR_STEPS.length - 1 && (
                  <button onClick={() => handleTourStep(tourIndex + 1)} className="tour-inline-btn">
                    Next ▶
                  </button>
                )}
                <button onClick={() => setTourActive(false)} className="tour-inline-btn exit">
                  Exit Tour ✕
                </button>
              </div>
            </div>
          )}

          {/* ─── MESSAGES CONTAINER ─── */}
          <div className="chat-messages cyber-messages">
            {messages.map((msg, i) => (
              <div className={`msg ${msg.type}`} key={i}>
                <div className="msg-avatar-robot">
                  {msg.type === 'bot' ? (
                    <RobotAvatar gesture={msg.gesture || 'idle'} size="sm" />
                  ) : (
                    <span className="user-icon">👤</span>
                  )}
                </div>

                <div className="msg-bubble-wrap">
                  <div className="msg-bubble">{formatText(msg.text)}</div>

                  {/* ─── DATA PAYLOAD: PROJECTS DIRECT CARDS ─── */}
                  {msg.dataPayload?.type === 'projects' && (
                    <div className="payload-projects-grid">
                      {msg.dataPayload.items.map((proj) => (
                        <div className="robot-mini-card" key={proj.id}>
                          <div className="mini-card-header">
                            <h5>{proj.title}</h5>
                            <span className="mini-badge">{proj.badge}</span>
                          </div>
                          <p>{proj.desc}</p>
                          <div className="mini-tags">
                            {proj.tags.map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                          </div>
                          <div className="mini-card-actions">
                            {proj.link && proj.link !== '#' && (
                              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="mini-btn live">
                                <i className="fas fa-external-link-alt" /> Live Demo
                              </a>
                            )}
                            <button
                              className="mini-btn view"
                              onClick={() => jumpToSection('projects')}
                            >
                              <i className="fas fa-arrow-down" /> View in Portfolio
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ─── DATA PAYLOAD: SKILLS DIRECT PROGRESS CARDS ─── */}
                  {msg.dataPayload?.type === 'skills' && (
                    <div className="payload-skills-list">
                      {msg.dataPayload.items.map((skill) => (
                        <div className="robot-skill-item" key={skill.title}>
                          <div className="skill-item-header">
                            <span className="skill-name">{skill.title}</span>
                            <span className="skill-pct">{skill.level}%</span>
                          </div>
                          <div className="robot-progress-track">
                            <div
                              className="robot-progress-bar"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="skill-desc-sub">{skill.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ─── DATA PAYLOAD: CERTIFICATES DIRECT LIST ─── */}
                  {msg.dataPayload?.type === 'certificates' && (
                    <div className="payload-certs-list">
                      {msg.dataPayload.items.map((cert) => (
                        <a
                          key={cert.title}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="robot-cert-item"
                        >
                          <i className="fas fa-certificate cert-icon" />
                          <div className="cert-meta">
                            <h6>{cert.title}</h6>
                            <span>{cert.issuer} • Official Google Drive</span>
                          </div>
                          <i className="fas fa-external-link-alt open-icon" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="msg-actions-cluster">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          className="bot-action-pill"
                          onClick={() => handleActionClick(act)}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="msg bot">
                <div className="msg-avatar-robot">
                  <RobotAvatar gesture="think" size="sm" />
                </div>
                <div className="typing-indicator cyber-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-label">Fetching details...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Bar */}
          <div className="chat-suggestions cyber-suggestions">
            <button className="suggestion-chip" onClick={() => handleTourStep(0)}>
              🧭 Take a Tour
            </button>
            <button className="suggestion-chip" onClick={() => handleSendQuery('Show all projects')}>
              🚀 Projects
            </button>
            <button className="suggestion-chip" onClick={() => handleSendQuery('Show technical skills')}>
              ⚡ Skills
            </button>
            <button className="suggestion-chip" onClick={() => handleSendQuery('List certificates')}>
              📜 Certificates
            </button>
            <button className="suggestion-chip" onClick={() => handleSendQuery('Fetch resume link')}>
              📄 Resume
            </button>
            <button className="suggestion-chip" onClick={() => handleSendQuery('How to contact Suman?')}>
              📬 Contact
            </button>
          </div>

          {/* Chat Input Row */}
          <form className="chat-input-row cyber-input-row" onSubmit={handleSubmit}>
            {/* Mic Speech Button */}
            <button
              type="button"
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleMic}
              title={isListening ? 'Listening... Speak now!' : 'Click to speak question'}
            >
              <i className={`fas ${isListening ? 'fa-microphone-slash fa-pulse' : 'fa-microphone'}`} />
            </button>

            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder={isListening ? 'Listening to voice...' : 'Ask Cyber-Suman anything...'}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
              id="chat-input"
            />

            <button
              className="chat-send-btn"
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              aria-label="Send message"
              id="chat-send-btn"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIBot;
