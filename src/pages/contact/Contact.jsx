import { useState } from 'react';
import './Contact.css';

const CONTACT_CHANNELS = [
  {
    id: 'email',
    label: 'Official Email',
    value: 'sumansuman207127@gmail.com',
    icon: 'fas fa-envelope-open-text',
    color: '#8a2be2',
    actionText: 'Compose',
    actionHref: 'mailto:sumansuman207127@gmail.com',
    copyValue: 'sumansuman207127@gmail.com',
    badge: 'Primary Channel',
  },
  {
    id: 'phone',
    label: 'Phone & WhatsApp',
    value: '+91 8159942709',
    icon: 'fas fa-phone-volume',
    color: '#10b981',
    actionText: 'WhatsApp',
    actionHref: 'https://wa.me/918159942709?text=Hi%20Suman,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!',
    copyValue: '+918159942709',
    badge: 'Instant Reach',
  },
  {
    id: 'location',
    label: 'Base Location',
    value: 'West Bengal, India',
    icon: 'fas fa-map-marked-alt',
    color: '#4facfe',
    actionText: 'Timezone',
    actionHref: null,
    subtext: 'IST (UTC +5:30) • Remote & Relocation Ready',
    badge: 'Available Globally',
  },
];

const SOCIAL_PROFILES = [
  {
    name: 'GitHub',
    handle: '@Suman-Mondal007',
    href: 'https://github.com/Suman-Mondal007',
    icon: 'fab fa-github',
    color: '#24292e',
    badge: 'Source Code',
  },
  {
    name: 'LinkedIn',
    handle: 'Suman Mondal',
    href: 'https://www.linkedin.com/in/suman-mondal-97ab1b28a',
    icon: 'fab fa-linkedin-in',
    color: '#0077b5',
    badge: 'Network',
  },
  {
    name: 'Facebook',
    handle: 'Suman Mondal',
    href: 'https://www.facebook.com/profile.php?id=100069775315043',
    icon: 'fab fa-facebook-f',
    color: '#1877f2',
    badge: 'Social',
  },
];

const QUICK_TOPICS = [
  'Full Stack Project',
  'Frontend Engineering',
  'IoT & Hardware Solution',
  'Job Opportunity',
  'Consulting & Chat',
];

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ msg: '', color: '', success: false });
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopy = (text, id) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleSelectTopic = (topic) => {
    setFormData((prev) => ({
      ...prev,
      subject: topic,
      message: prev.message
        ? prev.message
        : `Hi Suman, I'd like to discuss a ${topic} with you...`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ msg: 'Encrypting and sending your message...', color: 'var(--primary)', success: false });

    try {
      const data = new FormData(e.target);
      const res = await fetch('https://formspree.io/f/mojjagqw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus({
          msg: '✓ Message received! Suman will get back to you within 2-4 hours.',
          color: '#10b981',
          success: true,
        });
        setFormData({ first_name: '', last_name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          msg: '✗ Transmission failed. Please try again or email directly.',
          color: '#ef4444',
          success: false,
        });
      }
    } catch {
      setStatus({
        msg: '✗ Network connection error. Please email directly or try WhatsApp.',
        color: '#ef4444',
        success: false,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        Let&apos;s <span>Connect</span>
      </h2>

      {/* Executive Availability Banner */}
      <div className="contact-executive-banner">
        <div className="contact-stat-badge">
          <span className="contact-status-beacon">
            <span className="beacon-dot" />
            Available for Opportunities
          </span>
          <span className="contact-banner-desc">
            Full Stack, Frontend & IoT Solutions
          </span>
        </div>
        <div className="contact-meta-pills">
          <span className="contact-pill-item">
            <i className="fas fa-bolt" /> Fast Response (&lt; 2h)
          </span>
          <span className="contact-pill-item">
            <i className="fas fa-globe-asia" /> IST (UTC+5:30)
          </span>
        </div>
      </div>

      <div className="contact-grid-container">
        {/* ─── Left Side: Executive Contact Dossier ─── */}
        <div className="contact-dossier">
          <div className="dossier-header">
            <span className="dossier-tag">GET IN TOUCH</span>
            <h3 className="dossier-title">
              Let&apos;s Build Something <span>Exceptional</span>
            </h3>
            <p className="dossier-intro">
              Have an innovative project in mind, an engineering role opening, or want to discuss technology? Reach out directly via these verified channels.
            </p>
          </div>

          {/* Interactive Channel Cards */}
          <div className="channel-cards-stack">
            {CONTACT_CHANNELS.map((ch) => (
              <div className="channel-card-pro" key={ch.id}>
                <div
                  className="channel-icon-box"
                  style={{
                    background: `radial-gradient(circle, ${ch.color}20 0%, rgba(255,255,255,0.02) 70%)`,
                    borderColor: `${ch.color}40`,
                    color: ch.color,
                  }}
                >
                  <i className={ch.icon} />
                </div>

                <div className="channel-details">
                  <div className="channel-meta-row">
                    <span className="channel-label">{ch.label}</span>
                    <span className="channel-badge">{ch.badge}</span>
                  </div>
                  <div className="channel-value">{ch.value}</div>
                  {ch.subtext && <div className="channel-subtext">{ch.subtext}</div>}
                </div>

                <div className="channel-actions">
                  {ch.copyValue && (
                    <button
                      type="button"
                      className={`channel-copy-btn ${copiedId === ch.id ? 'copied' : ''}`}
                      onClick={() => handleCopy(ch.copyValue, ch.id)}
                      title={`Copy ${ch.label} to clipboard`}
                    >
                      <i className={copiedId === ch.id ? 'fas fa-check' : 'far fa-copy'} />
                      <span>{copiedId === ch.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}

                  {ch.actionHref && (
                    <a
                      href={ch.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-action-btn"
                    >
                      <span>{ch.actionText}</span>
                      <i className="fas fa-arrow-up-right-from-square" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Profiles Grid */}
          <div className="social-profiles-tray">
            <span className="social-tray-title">Verified Profiles & Networks</span>
            <div className="social-cards-row">
              {SOCIAL_PROFILES.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-profile-card"
                  title={`Open Suman's ${soc.name} profile`}
                >
                  <div className="soc-icon-wrap" style={{ color: soc.color }}>
                    <i className={soc.icon} />
                  </div>
                  <div className="soc-info">
                    <span className="soc-name">{soc.name}</span>
                    <span className="soc-handle">{soc.handle}</span>
                  </div>
                  <i className="fas fa-chevron-right soc-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right Side: Direct Message Portal ─── */}
        <div className="contact-portal-card">
          <div className="portal-top-stripe" />
          
          <div className="portal-header">
            <div className="portal-badge-row">
              <span className="portal-beacon-pill">
                <i className="fas fa-shield-alt" /> End-to-End Delivery
              </span>
              <span className="portal-powered-by">Formspree Verified</span>
            </div>
            <h3 className="portal-title">Send a Direct Message</h3>
            <p className="portal-desc">
              Your inquiry will be delivered straight to Suman&apos;s primary device.
            </p>
          </div>

          {/* Quick Topics Pill Bar */}
          <div className="quick-topics-tray">
            <span className="tray-label">Quick Topic:</span>
            <div className="topic-chips">
              {QUICK_TOPICS.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  className={`topic-chip ${formData.subject === topic ? 'selected' : ''}`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="portal-form">
            <div className="portal-fields-grid">
              <div className="field-group">
                <label htmlFor="first_name" className="field-label">
                  First Name <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <i className="fas fa-user input-icon" />
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="Suman"
                    className="portal-input"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="last_name" className="field-label">
                  Last Name
                </label>
                <div className="input-wrap">
                  <i className="far fa-user input-icon" />
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Mondal"
                    className="portal-input"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-group full-span">
                <label htmlFor="email" className="field-label">
                  Email Address <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <i className="fas fa-at input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@organization.com"
                    className="portal-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group full-span">
                <label htmlFor="subject" className="field-label">
                  Subject / Project Scope
                </label>
                <div className="input-wrap">
                  <i className="fas fa-pen-nib input-icon" />
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="e.g., Full Stack Role / Web Application Build"
                    className="portal-input"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-group full-span">
                <label htmlFor="message" className="field-label">
                  Message Details <span className="req">*</span>
                </label>
                <div className="input-wrap textarea-wrap">
                  <i className="fas fa-comment-alt input-icon textarea-icon" />
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your project, timeline, scope, or inquiry..."
                    rows="4"
                    className="portal-input portal-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              id="submit-btn"
              className="portal-submit-btn"
              disabled={sending}
            >
              {sending ? (
                <>
                  <i className="fas fa-circle-notch fa-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message Directly</span>
                  <i className="fas fa-paper-plane" />
                </>
              )}
            </button>

            {status.msg && (
              <div
                className={`portal-status-alert ${status.success ? 'success' : 'error'}`}
                style={{ borderColor: status.color }}
              >
                <i className={status.success ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} />
                <span>{status.msg}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
