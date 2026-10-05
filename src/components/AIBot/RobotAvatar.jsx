import React from 'react';
import './RobotAvatar.css';

/**
 * RobotAvatar Component
 * 
 * Props:
 * - gesture: 'idle' | 'wave' | 'think' | 'point' | 'scan' | 'celebrate' | 'speak'
 * - speaking: boolean (mouth equalizer active)
 * - size: 'sm' | 'md' | 'lg' (default 'md')
 * - interactive: boolean (reacts on hover/click)
 * - onClick: callback
 */
const RobotAvatar = ({
  gesture = 'idle',
  speaking = false,
  size = 'md',
  interactive = false,
  onClick,
}) => {
  const currentGesture = speaking ? 'speak' : gesture;

  return (
    <div
      className={`robot-avatar-container size-${size} gesture-${currentGesture} ${interactive ? 'interactive' : ''}`}
      onClick={onClick}
      role={interactive ? 'button' : 'img'}
      aria-label={`Cyber Robot Assistant in ${currentGesture} gesture`}
    >
      <svg
        viewBox="0 0 160 180"
        className="robot-avatar-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="helmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#00a8ff" />
          </linearGradient>

          <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8a2be2" />
          </linearGradient>

          <linearGradient id="energyBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 245, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 245, 255, 0)" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="headShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(15, 23, 42, 0.25)" />
          </filter>
        </defs>

        {/* ─── SCAN LASER BEAM (Shown during scan gesture) ─── */}
        {currentGesture === 'scan' && (
          <g className="robot-scan-beam">
            <polygon
              points="45,62 115,62 150,175 10,175"
              fill="url(#energyBeam)"
              className="scan-cone"
            />
            <line
              x1="15"
              y1="90"
              x2="145"
              y2="90"
              stroke="#00f5ff"
              strokeWidth="2"
              filter="url(#cyanGlow)"
              className="scan-sweep-line"
            />
          </g>
        )}

        {/* ─── POINTING LASER / TARGET (Shown during point gesture) ─── */}
        {currentGesture === 'point' && (
          <g className="robot-point-laser">
            <line
              x1="22"
              y1="108"
              x2="2"
              y2="108"
              stroke="#00f5ff"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="point-laser-line"
            />
            <circle cx="2" cy="108" r="4" fill="#00f5ff" filter="url(#cyanGlow)" />
          </g>
        )}

        {/* ─── CELEBRATE SPARKLES (Shown during celebrate gesture) ─── */}
        {currentGesture === 'celebrate' && (
          <g className="celebrate-sparkles">
            <circle cx="30" cy="25" r="3" fill="#f093fb" className="sparkle sp-1" />
            <circle cx="130" cy="28" r="3.5" fill="#00f5ff" className="sparkle sp-2" />
            <polygon points="80,5 82,10 87,10 83,13 85,18 80,15 75,18 77,13 73,10 78,10" fill="#facc15" className="sparkle sp-3" />
            <circle cx="20" cy="55" r="2.5" fill="#facc15" className="sparkle sp-4" />
            <circle cx="140" cy="58" r="2.5" fill="#8a2be2" className="sparkle sp-5" />
          </g>
        )}

        {/* ─── THINKING GEARS / BUBBLE (Shown during think gesture) ─── */}
        {currentGesture === 'think' && (
          <g className="think-hologram">
            <circle cx="118" cy="22" r="12" fill="rgba(138, 43, 226, 0.2)" stroke="#a855f7" strokeWidth="1.5" />
            <text x="118" y="27" textAnchor="middle" fill="#00f5ff" fontSize="13" fontWeight="bold">?</text>
            <circle cx="106" cy="34" r="3" fill="#a855f7" opacity="0.7" />
            <circle cx="98" cy="42" r="1.5" fill="#a855f7" opacity="0.5" />
          </g>
        )}

        {/* ─── THRUSTER PARTICLES (Bottom Anti-Gravity) ─── */}
        <g className="robot-thruster">
          <ellipse cx="80" cy="155" rx="14" ry="4" fill="rgba(0, 245, 255, 0.3)" filter="url(#cyanGlow)" />
          <path
            d="M74,152 Q80,172 86,152 Z"
            fill="url(#neonCyan)"
            className="thruster-flame"
          />
          <circle cx="80" cy="162" r="2.5" fill="#ffffff" filter="url(#cyanGlow)" />
        </g>

        {/* ─── ROBOT BODY ─── */}
        <g className="robot-chassis">
          {/* Main Torso */}
          <rect
            x="54"
            y="94"
            width="52"
            height="46"
            rx="16"
            fill="url(#bodyGrad)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.5"
            filter="url(#headShadow)"
          />

          {/* Chest Arc Reactor / Core */}
          <circle cx="80" cy="115" r="10" fill="#0f172a" />
          <circle
            cx="80"
            cy="115"
            r="8"
            fill="none"
            stroke="url(#neonCyan)"
            strokeWidth="2"
            className="core-ring"
          />
          <circle
            cx="80"
            cy="115"
            r="5"
            fill="#00f5ff"
            filter="url(#cyanGlow)"
            className="core-pulse"
          />

          {/* Torso Detail Lines */}
          <line x1="62" y1="130" x2="72" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="88" y1="130" x2="98" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* ─── LEFT ARM (Viewer's Left) ─── */}
        <g className={`robot-arm-left arm-gesture-${currentGesture}`}>
          {/* Shoulder */}
          <circle cx="50" cy="104" r="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Arm segment */}
          <path
            d="M48,107 L36,120"
            stroke="url(#bodyGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            className="arm-left-upper"
          />
          
          {/* Forearm & Hand */}
          <g className="hand-left">
            <circle cx="34" cy="122" r="4.5" fill="#00f5ff" />
            <path
              d="M32,123 Q28,126 31,130 Q36,129 36,124 Z"
              fill="#cbd5e1"
            />
          </g>
        </g>

        {/* ─── RIGHT ARM (Viewer's Right) ─── */}
        <g className={`robot-arm-right arm-gesture-${currentGesture}`}>
          {/* Shoulder */}
          <circle cx="110" cy="104" r="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          
          {/* Arm segment */}
          <path
            d="M112,107 L124,120"
            stroke="url(#bodyGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            className="arm-right-upper"
          />

          {/* Forearm & Hand */}
          <g className="hand-right">
            <circle cx="126" cy="122" r="4.5" fill="#8a2be2" />
            <path
              d="M128,123 Q132,126 129,130 Q124,129 124,124 Z"
              fill="#cbd5e1"
            />
          </g>
        </g>

        {/* ─── ROBOT HEAD & HELMET ─── */}
        <g className={`robot-head head-gesture-${currentGesture}`}>
          {/* Neck joint */}
          <rect x="74" y="86" width="12" height="10" rx="3" fill="#64748b" />

          {/* Antenna */}
          <line
            x1="80"
            y1="40"
            x2="80"
            y2="18"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Antenna pulse wave rings */}
          <circle
            cx="80"
            cy="16"
            r="10"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="1.2"
            opacity="0.4"
            className="antenna-ring"
          />
          {/* Antenna glowing orb */}
          <circle
            cx="80"
            cy="16"
            r="5"
            fill={
              currentGesture === 'think'
                ? '#facc15'
                : currentGesture === 'celebrate'
                ? '#f093fb'
                : currentGesture === 'scan'
                ? '#00f5ff'
                : '#4facfe'
            }
            filter="url(#cyanGlow)"
            className="antenna-orb"
          />

          {/* Ear audio receptors */}
          <rect x="37" y="55" width="6" height="18" rx="3" fill="#8a2be2" />
          <circle cx="40" cy="64" r="2" fill="#00f5ff" />
          <rect x="117" y="55" width="6" height="18" rx="3" fill="#8a2be2" />
          <circle cx="120" cy="64" r="2" fill="#00f5ff" />

          {/* Main Helmet Base */}
          <rect
            x="41"
            y="38"
            width="78"
            height="52"
            rx="20"
            fill="url(#helmGrad)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="2"
            filter="url(#headShadow)"
          />

          {/* Glass Visor Screen */}
          <rect
            x="49"
            y="46"
            width="62"
            height="34"
            rx="12"
            fill="url(#visorGrad)"
            stroke="rgba(0, 245, 255, 0.35)"
            strokeWidth="1.2"
          />

          {/* Visor Glare / Reflection */}
          <path
            d="M54,49 Q80,51 106,49 Q98,54 58,54 Z"
            fill="rgba(255, 255, 255, 0.15)"
          />

          {/* ─── EYES (Changes based on Gesture) ─── */}
          <g className="robot-eyes-group">
            {/* Standard Round / Blinking Eyes */}
            {currentGesture !== 'celebrate' && currentGesture !== 'scan' && (
              <>
                {/* Left Eye */}
                <ellipse
                  cx="65"
                  cy="61"
                  rx="6"
                  ry={currentGesture === 'wave' ? '3' : '6'}
                  fill="#00f5ff"
                  filter="url(#cyanGlow)"
                  className="robot-eye eye-left"
                />
                <circle cx="63.5" cy="59.5" r="2" fill="#ffffff" opacity="0.9" />

                {/* Right Eye */}
                <ellipse
                  cx="95"
                  cy="61"
                  rx="6"
                  ry={currentGesture === 'wave' ? '3' : currentGesture === 'think' ? '4' : '6'}
                  fill="#00f5ff"
                  filter="url(#cyanGlow)"
                  className="robot-eye eye-right"
                />
                <circle cx="93.5" cy="59.5" r="2" fill="#ffffff" opacity="0.9" />
              </>
            )}

            {/* Celebrate Eyes (Star / Heart Glowing) */}
            {currentGesture === 'celebrate' && (
              <g className="celebrate-eyes">
                <text x="65" y="67" textAnchor="middle" fill="#f093fb" fontSize="14" fontWeight="bold">★</text>
                <text x="95" y="67" textAnchor="middle" fill="#00f5ff" fontSize="14" fontWeight="bold">★</text>
              </g>
            )}

            {/* Scan Eyes (Visor Scanner Bar) */}
            {currentGesture === 'scan' && (
              <g className="scan-visor-bar">
                <rect x="53" y="59" width="54" height="4" rx="2" fill="#00f5ff" filter="url(#cyanGlow)" />
                <rect x="72" y="57" width="16" height="8" rx="4" fill="#ffffff" className="scan-runner" />
              </g>
            )}
          </g>

          {/* ─── MOUTH (Equalizer / Speaking) ─── */}
          <g className="robot-mouth">
            {speaking ? (
              <g className="mouth-speaking">
                <rect x="70" y="72" width="2.5" height="5" rx="1" fill="#00f5ff" className="eq-bar bar-1" />
                <rect x="74" y="71" width="2.5" height="7" rx="1" fill="#c084fc" className="eq-bar bar-2" />
                <rect x="78" y="70" width="2.5" height="9" rx="1" fill="#00f5ff" className="eq-bar bar-3" />
                <rect x="82" y="71" width="2.5" height="7" rx="1" fill="#c084fc" className="eq-bar bar-4" />
                <rect x="86" y="72" width="2.5" height="5" rx="1" fill="#00f5ff" className="eq-bar bar-5" />
              </g>
            ) : (
              <path
                d="M72,74 Q80,78 88,74"
                stroke="#00f5ff"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default RobotAvatar;
