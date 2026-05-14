// Attune — couples card deck app
// React app. Renders inside the IOSDevice frame.

const { useState, useEffect, useRef, useMemo, Fragment } = React;

/* ─────────────────────────────────────────────────────────────
   THEME — palette shifts based on tweak
   ───────────────────────────────────────────────────────────── */
const PALETTES = {
  violet: {
    name: 'Violet',
    accent: '#7B4FA6', accentLight: '#9B6EC8', accentGlow: '#C49AE8',
    rose: '#C4708A', roseLight: '#E8A0B8', gold: '#C8A96E',
    bg: '#0D0A12',
    glow1: 'rgba(123,79,166,0.30)', glow2: 'rgba(196,112,138,0.10)',
  },
  ember: {
    name: 'Ember',
    accent: '#A85B7E', accentLight: '#C4708A', accentGlow: '#E8A0B8',
    rose: '#7B4FA6', roseLight: '#C49AE8', gold: '#C8A96E',
    bg: '#0F0A10',
    glow1: 'rgba(196,112,138,0.30)', glow2: 'rgba(123,79,166,0.12)',
  },
  candle: {
    name: 'Candle',
    accent: '#9B6EA8', accentLight: '#B58CC0', accentGlow: '#D6B4DE',
    rose: '#C68A7A', roseLight: '#E8B8A6', gold: '#D8B888',
    bg: '#100B12',
    glow1: 'rgba(216,184,136,0.18)', glow2: 'rgba(155,110,168,0.20)',
  },
};

/* ─────────────────────────────────────────────────────────────
   CATEGORY DATA
   ───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'warmup',     emoji: '🌱', name: 'Warmup',     short: 'I',   total: 30,
    color: '#8BB88A', tint: 'rgba(139,184,138,0.22)',
    type: 'Questions',
    desc: 'Low-stakes openers. Think of these as "how was your day" — but actually interesting.',
    seen: 13 },
  { id: 'connection', emoji: '💬', name: 'Connection', short: 'II',  total: 40,
    color: '#7A9EC4', tint: 'rgba(122,158,196,0.22)',
    type: 'Questions',
    desc: 'A little deeper. Progressive self-disclosure — the ones that make you feel known.',
    seen: 7 },
  { id: 'depth',      emoji: '🌊', name: 'Depth',      short: 'III', total: 40,
    color: '#9B6EC8', tint: 'rgba(155,110,200,0.32)',
    type: 'Questions',
    desc: 'The real stuff. Past, values, futures, and the things left unsaid. Best with time and something to drink.',
    seen: 2 },
  { id: 'physical',   emoji: '🔥', name: 'Physical',   short: 'IV',  total: 30,
    color: '#C4708A', tint: 'rgba(196,112,138,0.28)',
    type: 'Questions',
    desc: 'Honest conversations about closeness and what you need. Not dares — questions that open doors.',
    seen: 18 },
  { id: 'challenges', emoji: '🎯', name: 'Challenges', short: 'V',   total: 30,
    color: '#C8A96E', tint: 'rgba(200,169,110,0.22)',
    type: 'Activities',
    desc: 'Things you actually do together. Put the cards down and be present with each other.',
    seen: 9 },
  { id: 'spicy',      emoji: '💑', name: 'Spicy',      short: 'VI',  total: 30,
    color: '#E8A0B8', tint: 'rgba(232,160,184,0.30)',
    type: 'Dares',
    desc: 'Romantic dares and intimate moments. Ranges from sweet to steamy — follow your mood.',
    seen: 3 },
];

const PROMPTS = {
  warmup: [
    "What's your comfort meal when life feels hard?",
    "What's something you're quietly proud of that you rarely talk about?",
    "What's a habit you've tried to quit but secretly don't want to?",
    "What's something you find beautiful that most people overlook?",
    "What does \u201chome\u201d feel like to you?",
    "What's a small daily ritual that matters a lot to you?",
  ],
  connection: [
    "What's something you need that's hard to ask for?",
    "When do you feel most like yourself?",
    "What does \u201cbeing known\u201d feel like versus \u201cbeing understood\u201d?",
    "What's a moment in our relationship you return to often?",
    "How has the way you love changed since we met?",
    "What's something you've never told anyone, that you could tell me?",
  ],
  depth: [
    "What's something unresolved between us you wish we'd address?",
    "What does emotional safety feel like to you?",
    "What's a fear about our future you rarely voice?",
    "Is there something you've been pretending is okay that isn't?",
    "What's the thing you most want me to understand about you?",
    "What does \u201chome\u201d mean in the context of us — people, not places?",
  ],
  physical: [
    "When do you feel most physically connected to me?",
    "What kind of touch feels most loving — and most arousing? Are they the same?",
    "What makes you feel safe enough to be fully present during intimacy?",
    "What does desire feel like for you — how does it build?",
    "What's the most intimate moment we've had that wasn't sexual?",
    "What makes you feel genuinely wanted — not just needed?",
  ],
  challenges: [
    "Hold eye contact for two minutes without looking away or laughing.",
    "Tell your partner three specific things you find beautiful about them right now.",
    "Sit back to back, lean into each other, and breathe together for two minutes.",
    "Each share a rose, thorn, and bud from your week.",
    "Spend five minutes just holding each other — no goal, no talking.",
    "Write a three-line poem about your partner. Read it aloud.",
  ],
  spicy: [
    "Describe in detail what you find most attractive about your partner right now.",
    "Spend ten minutes exploring touch with no goal of it leading anywhere.",
    "Recreate your first kiss.",
    "Spend five minutes just looking at each other in low light — no phones, no distraction.",
    "Make out for five minutes like you have nowhere else to be.",
    "Take turns saying what you want — no asking, just telling.",
  ],
};

/* ─────────────────────────────────────────────────────────────
   ATOMS
   ───────────────────────────────────────────────────────────── */

function Hairline({ width = '100%', opacity = 1, color = '#3D3255', vertical = false, style }) {
  return (
    <div style={{
      width: vertical ? 1 : width,
      height: vertical ? width : 1,
      background: vertical
        ? `linear-gradient(180deg, transparent, ${color}, transparent)`
        : `linear-gradient(90deg, transparent, ${color}, transparent)`,
      opacity, ...style,
    }} />
  );
}

function Caps({ children, size = 10, color = '#7A6A90', spacing = 0.24, weight = 500, style }) {
  return (
    <span style={{
      fontFamily: 'Jost, sans-serif',
      fontSize: size, fontWeight: weight,
      letterSpacing: `${spacing}em`, textTransform: 'uppercase',
      color, ...style,
    }}>{children}</span>
  );
}

function Italic({ children, size = 21, color = '#F0EAF8', weight = 300, style }) {
  return (
    <span style={{
      fontFamily: '"Cormorant Garamond", serif',
      fontStyle: 'italic', fontWeight: weight,
      fontSize: size, color, lineHeight: 1.45,
      ...style,
    }}>{children}</span>
  );
}

function Pill({ dotColor = '#9B6EC8', children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(36,29,51,0.6)', border: '1px solid #3D3255',
      borderRadius: 100, padding: '7px 14px',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: dotColor,
        boxShadow: `0 0 8px ${dotColor}`,
      }} />
      <span style={{
        fontFamily: 'Jost, sans-serif', fontSize: 11, fontWeight: 400,
        color: '#B8A8D0', letterSpacing: '0.04em',
      }}>{children}</span>
    </div>
  );
}

function ProgressBar({ pct, color, height = 2, gradient = false }) {
  const fill = gradient
    ? 'linear-gradient(90deg, #7B4FA6 0%, #C49AE8 100%)'
    : color;
  return (
    <div style={{
      height, background: '#2E2542', borderRadius: 100, overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: fill, borderRadius: 100,
        transition: 'width .4s ease',
      }} />
    </div>
  );
}

function CornerBracket({ corner = 'tl', size = 18, color = '#524569', thickness = 1 }) {
  // corner: tl, tr, bl, br
  const pos = {
    tl: { top: 14, left: 14, borderTop: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` },
    tr: { top: 14, right: 14, borderTop: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` },
    bl: { bottom: 14, left: 14, borderBottom: `${thickness}px solid ${color}`, borderLeft: `${thickness}px solid ${color}` },
    br: { bottom: 14, right: 14, borderBottom: `${thickness}px solid ${color}`, borderRight: `${thickness}px solid ${color}` },
  };
  return <div style={{ position: 'absolute', width: size, height: size, ...pos[corner] }} />;
}

function GrainOverlay({ amount = 40 }) {
  if (amount <= 0) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      opacity: amount / 200, mixBlendMode: 'overlay',
      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\' seed=\'7\'/><feColorMatrix values=\'0 0 0 0 0.77   0 0 0 0 0.60   0 0 0 0 0.91   0 0 0 0.55 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
      backgroundSize: '180px 180px',
    }} />
  );
}

function GridTexture({ opacity = 0.06, size = 28, color = 'rgba(123,79,166,1)' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px),
                        linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      opacity,
    }} />
  );
}

/* Category icons — thin-stroke line glyphs */
function CategoryIcon({ id, size = 22, color = 'currentColor', strokeWidth = 1, style }) {
  const c = color, sw = strokeWidth;
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', style };
  if (id === 'warmup') return (
    <svg {...props}>
      <path d="M12 21 V10" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <path d="M12 12 C12 9 9.5 7 6.5 7.5" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <path d="M12 14 C12 11.5 14.5 9.5 17.5 10" stroke={c} strokeWidth={sw} strokeLinecap="round" opacity="0.75" />
    </svg>
  );
  if (id === 'connection') return (
    <svg {...props}>
      <circle cx="9.5" cy="12" r="5.5" stroke={c} strokeWidth={sw} />
      <circle cx="14.5" cy="12" r="5.5" stroke={c} strokeWidth={sw} fill={c} fillOpacity="0.22" />
    </svg>
  );
  if (id === 'depth') return (
    <svg {...props}>
      <path d="M2 6 Q7 3 12 6 T22 6" stroke={c} strokeWidth={sw} strokeLinecap="round" />
      <path d="M2 12 Q7 9 12 12 T22 12" stroke={c} strokeWidth={sw * 0.9} strokeLinecap="round" opacity="0.7" />
      <path d="M2 18 Q7 15 12 18 T22 18" stroke={c} strokeWidth={sw * 0.8} strokeLinecap="round" opacity="0.45" />
    </svg>
  );
  if (id === 'physical') return (
    <svg {...props}>
      {/* Breath / pulse — a slow horizontal line with a single rise */}
      <path d="M2 14 H8 Q10 14 11 10 Q12 5 13 10 Q14 14 16 14 H22"
        stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (id === 'challenges') return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth={sw} />
      <circle cx="12" cy="12" r="5" stroke={c} strokeWidth={sw * 0.9} opacity="0.7" />
      <circle cx="12" cy="12" r="1.2" fill={c} stroke="none" />
    </svg>
  );
  if (id === 'spicy') return (
    <svg {...props}>
      <path d="M12 3 C16 8 18 11 18 15 C18 18 15.5 21 12 21 C8.5 21 6 18 6 15 C6 12 8.5 10 10 7 C11 9 10 12 12 12 C13 10 11 7 12 3 Z"
        stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" />
    </svg>
  );
  return null;
}

/* Ornament systems for card front */
function CardOrnament({ style, palette, corner = 'tl', color }) {
  const c = color || '#524569';
  if (style === 'none') return null;
  if (style === 'hairlines') {
    // Thin perpendicular hairlines emanating from corners
    const pos = {
      tl: { top: 22, left: 22 },
      tr: { top: 22, right: 22 },
      bl: { bottom: 22, left: 22 },
      br: { bottom: 22, right: 22 },
    };
    const horizDir = corner.includes('r') ? -1 : 1;
    const vertDir = corner.includes('b') ? -1 : 1;
    return (
      <div style={{ position: 'absolute', ...pos[corner], width: 1, height: 1 }}>
        <div style={{
          position: 'absolute', top: 0, [horizDir > 0 ? 'left' : 'right']: 0,
          width: 26, height: 1, background: c,
        }} />
        <div style={{
          position: 'absolute', left: 0, [vertDir > 0 ? 'top' : 'bottom']: 0,
          width: 1, height: 26, background: c,
        }} />
      </div>
    );
  }
  // brackets (default) — L bracket
  return <CornerBracket corner={corner} size={22} color={c} thickness={1} />;
}

/* ─────────────────────────────────────────────────────────────
   PLAYING CARD
   ───────────────────────────────────────────────────────────── */
function PlayingCard({ category, prompt, flipped, onTap, tweaks, palette }) {
  const ornament = tweaks.ornament;
  const motif = tweaks.cardBackMotif;
  const glow = tweaks.glow / 100;
  const grain = tweaks.grain;

  const accentRgb = '123,79,166';
  const tintGlow = `rgba(${accentRgb}, ${0.35 * glow})`;
  const softGlow = `rgba(${accentRgb}, ${0.15 * glow})`;

  return (
    <div style={{ perspective: 1400, width: '100%', maxWidth: 286, margin: '0 auto' }}>
      <div
        onClick={onTap}
        style={{
          position: 'relative', width: '100%', aspectRatio: '2.8 / 4',
          transformStyle: 'preserve-3d',
          transition: 'transform .75s cubic-bezier(.4,0,.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          filter: `drop-shadow(0 28px 56px rgba(0,0,0,0.65)) drop-shadow(0 0 40px ${tintGlow})`,
        }}>

        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 22,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: '#1C1528', border: '1px solid #524569',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <GridTexture opacity={0.06} size={26} color="rgba(196,154,232,1)" />
          {/* Central glow orb */}
          <div style={{
            position: 'absolute', top: '28%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 180, height: 180,
            background: `radial-gradient(ellipse, ${tintGlow} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          {/* Edge vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          }} />
          <GrainOverlay amount={grain} />

          {/* Corner ornaments */}
          <CardOrnament style={ornament} corner="tl" />
          <CardOrnament style={ornament} corner="tr" />
          <CardOrnament style={ornament} corner="bl" />
          <CardOrnament style={ornament} corner="br" />

          {/* Center motif */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: -12 }}>
            {motif === 'monogram' && (
              <div style={{
                fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
                fontSize: 76, color: '#F0EAF8', lineHeight: 0.9, letterSpacing: '-0.02em',
                marginBottom: 8,
                textShadow: `0 0 24px ${tintGlow}`,
              }}>A</div>
            )}
            {motif === 'ampersand' && (
              <div style={{
                fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 400,
                fontSize: 88, color: '#F0EAF8', lineHeight: 0.85, letterSpacing: '-0.02em',
                marginBottom: 10,
                textShadow: `0 0 28px ${tintGlow}`,
              }}>&amp;</div>
            )}
            {motif === 'vesica' && (
              <svg width="78" height="58" viewBox="0 0 78 58" style={{ marginBottom: 14, filter: `drop-shadow(0 0 12px ${tintGlow})` }}>
                <circle cx="30" cy="29" r="22" fill="none" stroke="#C49AE8" strokeWidth="0.9" opacity="0.85" />
                <circle cx="48" cy="29" r="22" fill="none" stroke="#C49AE8" strokeWidth="0.9" opacity="0.85" />
                <circle cx="39" cy="29" r="1.4" fill="#C49AE8" />
              </svg>
            )}
            {motif === 'moon' && (
              <svg width="64" height="64" viewBox="0 0 60 60" style={{ marginBottom: 14, filter: `drop-shadow(0 0 14px ${tintGlow})` }}>
                <defs>
                  <mask id="moonCut">
                    <rect width="60" height="60" fill="white" />
                    <circle cx="40" cy="26" r="20" fill="black" />
                  </mask>
                </defs>
                <circle cx="30" cy="30" r="22" fill="#F0EAF8" opacity="0.95" mask="url(#moonCut)" />
                <circle cx="12" cy="14" r="1.2" fill="#C49AE8" />
                <circle cx="8" cy="36" r="0.8" fill="#C49AE8" opacity="0.7" />
                <circle cx="17" cy="50" r="0.6" fill="#C49AE8" opacity="0.5" />
              </svg>
            )}
            {motif === 'flame' && (
              <svg width="42" height="66" viewBox="0 0 42 66" style={{ marginBottom: 12, filter: `drop-shadow(0 0 18px ${tintGlow})` }}>
                <defs>
                  <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#E8A0B8" />
                    <stop offset="0.55" stopColor="#C49AE8" />
                    <stop offset="1" stopColor="#7B4FA6" />
                  </linearGradient>
                </defs>
                <path d="M21 4 C 30 18, 36 28, 36 42 C 36 54, 29 62, 21 62 C 13 62, 6 54, 6 42 C 6 32, 12 26, 16 18 C 18 22, 17 28, 21 30 C 22 22, 19 14, 21 4 Z" fill="url(#flameGrad)" opacity="0.92" />
                <path d="M21 18 C 25 24, 28 32, 27 40 C 26 46, 23 50, 21 50 C 19 50, 16 46, 16 40 C 16 32, 19 26, 21 18 Z" fill="#F0EAF8" opacity="0.55" />
              </svg>
            )}
            {motif === 'seal' && (
              <svg width="68" height="68" viewBox="0 0 68 68" style={{ marginBottom: 14, filter: `drop-shadow(0 0 14px ${tintGlow})` }}>
                <circle cx="34" cy="34" r="30" fill="none" stroke="#C49AE8" strokeWidth="0.8" opacity="0.7" />
                <circle cx="34" cy="34" r="26" fill="none" stroke="#C49AE8" strokeWidth="0.4" opacity="0.5" strokeDasharray="1 3" />
                <text x="34" y="45" textAnchor="middle"
                  fontFamily='"Cormorant Garamond", serif' fontStyle="italic" fontWeight="300"
                  fontSize="34" fill="#F0EAF8">A</text>
              </svg>
            )}
            {motif === 'compass' && (
              <svg width="58" height="58" viewBox="0 0 58 58" style={{ marginBottom: 14 }}>
                <circle cx="29" cy="29" r="22" fill="none" stroke="#C49AE8" strokeWidth="0.8" opacity="0.55" />
                <circle cx="29" cy="29" r="14" fill="none" stroke="#C49AE8" strokeWidth="0.8" opacity="0.4" />
                <line x1="29" y1="2" x2="29" y2="56" stroke="#C49AE8" strokeWidth="0.4" opacity="0.3" />
                <line x1="2" y1="29" x2="56" y2="29" stroke="#C49AE8" strokeWidth="0.4" opacity="0.3" />
                <circle cx="29" cy="29" r="2" fill="#C49AE8" />
              </svg>
            )}
            {motif === 'void' && <div style={{ height: 60 }} />}

            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
              fontSize: 26, color: '#F0EAF8', letterSpacing: '0.04em',
            }}>Attune</div>
            <div style={{
              width: 24, height: 1, background: '#524569',
              margin: '12px auto',
            }} />
            <Caps size={9} color="#C49AE8" spacing={0.32}>
              {category.short} · {category.name}
            </Caps>
          </div>

          {/* Reveal hint */}
          <div style={{
            position: 'absolute', bottom: 26, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <div className="pulse-dot" style={{
              width: 4, height: 4, borderRadius: '50%',
              background: '#C49AE8',
              boxShadow: `0 0 8px ${tintGlow}`,
            }} />
            <Caps size={9} color="#7A6A90" spacing={0.28}>Tap to reveal</Caps>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 22,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(160deg, #241D33 0%, #1C1528 100%)',
          border: '1px solid #524569', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          padding: '32px 26px',
        }}>
          {/* Top glow */}
          <div style={{
            position: 'absolute', top: -40, left: '50%',
            transform: 'translateX(-50%)',
            width: 180, height: 130,
            background: `radial-gradient(ellipse, ${softGlow} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <GrainOverlay amount={grain * 0.8} />

          <CardOrnament style={ornament} corner="tl" />
          <CardOrnament style={ornament} corner="tr" />
          <CardOrnament style={ornament} corner="bl" />
          <CardOrnament style={ornament} corner="br" />

          {/* Top label */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: 16 }}>
            <Caps size={9} color="#C49AE8" spacing={0.32}>
              {category.short} · {category.name} · {category.type}
            </Caps>
            <Hairline width={32} style={{ margin: '14px auto 0' }} />
          </div>

          {/* Prompt text — large italic, vertically centered */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <Italic size={20} weight={300} style={{ textAlign: 'center', display: 'block' }}>
              {prompt}
            </Italic>
          </div>

          {/* Bottom hint */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Hairline width={32} style={{ margin: '0 auto 14px' }} />
            <Caps size={9} color="#7A6A90" spacing={0.28}>Discuss freely</Caps>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOTTOM NAV
   ───────────────────────────────────────────────────────────── */
function BottomNav({ active, onGo }) {
  const item = (id, label, icon) => {
    const isOn = active === id;
    return (
      <div onClick={() => onGo(id)} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
        cursor: 'pointer', flex: 1, opacity: isOn ? 1 : 0.4,
        transition: 'opacity .2s',
      }}>
        <div style={{
          width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOn ? '#C49AE8' : '#B8A8D0',
        }}>{icon}</div>
        <span style={{
          fontFamily: 'Jost, sans-serif', fontSize: 9, fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: isOn ? '#F0EAF8' : '#B8A8D0',
        }}>{label}</span>
      </div>
    );
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 24, paddingTop: 14,
      background: 'linear-gradient(to top, #0D0A12 60%, rgba(13,10,18,0))',
      borderTop: '1px solid rgba(61,50,85,0.6)',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 30,
    }}>
      {item('decks', 'Decks',
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )}
      {item('journey', 'Journey',
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="2" fill="currentColor" />
        </svg>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATUS BAR & SHELL
   ───────────────────────────────────────────────────────────── */
function StatusBar() {
  // Android status bar — time on left, signal/wifi/battery on right
  return (
    <div style={{
      height: 36, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px',
      position: 'relative', zIndex: 10,
    }}>
      <span style={{
        fontFamily: 'Jost, sans-serif', fontSize: 13, fontWeight: 500,
        color: '#F0EAF8', letterSpacing: '0.02em',
      }}>9:41</span>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center', color: '#F0EAF8' }}>
        {/* signal */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
          <path d="M0 9.5 L0 8 L2 8 L2 9.5 Z M3 9.5 L3 6 L5 6 L5 9.5 Z M6 9.5 L6 3 L8 3 L8 9.5 Z M9 9.5 L9 0 L11 0 L11 9.5 Z"/>
        </svg>
        {/* wifi */}
        <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
          <path d="M6.5 9.5L4 7c1.4-1.4 3.6-1.4 5 0L6.5 9.5zM1.5 4.5C4.3 1.7 8.7 1.7 11.5 4.5l-1.4 1.4c-2-2-5.2-2-7.2 0L1.5 4.5z"/>
        </svg>
        {/* battery */}
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="19" height="10" rx="3" stroke="currentColor" opacity="0.7"/>
          <rect x="2" y="2" width="15" height="7" rx="1.5" fill="currentColor"/>
          <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator() {
  // Android gesture nav pill
  return (
    <div style={{
      position: 'absolute', bottom: 9, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 40,
      pointerEvents: 'none',
    }}>
      <div style={{ width: 108, height: 4, background: 'rgba(240,234,248,0.85)', borderRadius: 100 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCREENS
   ───────────────────────────────────────────────────────────── */

function AgeGateScreen({ onContinue }) {
  return (
    <div style={{
      position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
      padding: '90px 36px 60px', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Ambient top glow */}
      <div style={{
        position: 'absolute', top: -120, left: '50%',
        transform: 'translateX(-50%)', width: 360, height: 360,
        background: 'radial-gradient(ellipse, rgba(123,79,166,0.45) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Caps size={10} color="#7A6A90" spacing={0.36}>A · couples · card · deck</Caps>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 68, color: '#F0EAF8', letterSpacing: '0.02em', marginTop: 28, lineHeight: 1,
        }}>Attune</div>
        <Hairline width={48} style={{ margin: '24px auto' }} />
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 22, color: '#B8A8D0', lineHeight: 1.5, maxWidth: 260, margin: '0 auto',
        }}>
          A private, intentional<br/>space for two.
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
        <div style={{
          fontFamily: 'Jost, sans-serif', fontSize: 12, fontWeight: 300,
          color: '#7A6A90', lineHeight: 1.7, marginBottom: 24, maxWidth: 280, margin: '0 auto 28px',
        }}>
          Attune contains prompts about intimacy, vulnerability, and physical connection.
          Please confirm you are 18 or older to continue.
        </div>
        <button onClick={onContinue} style={{
          width: '100%', padding: '17px 0',
          background: 'linear-gradient(135deg, #7B4FA6 0%, #9B50C8 100%)',
          border: 'none', borderRadius: 16, color: '#fff',
          fontFamily: 'Jost, sans-serif', fontSize: 14, fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          boxShadow: '0 8px 32px rgba(123,79,166,0.45), 0 2px 8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}>I am 18 or older — Begin</button>
        <div style={{ marginTop: 18 }}>
          <Caps size={9} color="#524569" spacing={0.24}>No accounts · no cloud · no analytics</Caps>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ onCategory, onGo, tweaks }) {
  const visible = CATEGORIES.filter(c => c.id !== 'spicy' || tweaks.showSpicy);
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      {/* Ambient top glow */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 280, height: 280,
        borderRadius: '50%', border: '1px solid rgba(123,79,166,0.18)',
        pointerEvents: 'none',
      }} >
        <div style={{
          position: 'absolute', inset: 24, borderRadius: '50%',
          border: '1px solid rgba(196,112,138,0.10)',
        }} />
      </div>

      {/* Header */}
      <div style={{ padding: '12px 28px 0', position: 'relative' }}>
        <Caps size={10} color="#C49AE8" spacing={0.28}>Good evening</Caps>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 44, color: '#F0EAF8', lineHeight: 1.02, marginTop: 10, letterSpacing: '-0.01em',
        }}>
          Time to{' '}
          <span style={{
            fontWeight: 500, fontStyle: 'normal',
            background: 'linear-gradient(135deg, #C49AE8 0%, #E8A0B8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>attune.</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
          <Pill dotColor="#9B6EC8">7 day streak</Pill>
          <Pill dotColor="#C4708A">12 min tonight</Pill>
        </div>
      </div>

      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '34px 28px 14px' }}>
        <Caps size={10} color="#7A6A90" spacing={0.28}>Choose a deck</Caps>
        <Hairline />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 28px' }}>
        {visible.map(cat => (
          <div key={cat.id} onClick={() => onCategory(cat.id)} className="cat-tile" style={{
            background: '#1C1528', border: `1px solid ${cat.tint}`, borderRadius: 18,
            padding: '18px 16px 16px', position: 'relative', overflow: 'hidden', cursor: 'pointer',
            transition: 'transform .18s, border-color .25s',
          }}>
            {/* Subtle corner accent */}
            <div style={{
              position: 'absolute', top: -20, right: -20, width: 60, height: 60,
              background: `radial-gradient(circle, ${cat.tint} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <CategoryIcon id={cat.id} size={22} color={cat.color} />
              <Caps size={8} color="#524569" spacing={0.28}>{cat.short}</Caps>
            </div>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
              fontSize: 20, color: '#F0EAF8', marginBottom: 4, letterSpacing: '0.01em',
            }}>{cat.name}</div>
            <div style={{
              fontFamily: 'Jost, sans-serif', fontSize: 10, color: '#7A6A90', marginBottom: 12,
            }}>{cat.seen} of {cat.total} · seen</div>
            <ProgressBar pct={cat.seen / cat.total * 100} color={cat.color} height={2} />
          </div>
        ))}
      </div>

      {/* Tonight's invitation */}
      <div style={{ padding: '32px 28px 0' }}>
        <div style={{
          border: '1px solid #3D3255', borderRadius: 18, padding: '18px 20px',
          background: 'rgba(28,21,40,0.5)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
            width: 160, height: 100,
            background: 'radial-gradient(ellipse, rgba(196,154,232,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <Caps size={9} color="#C49AE8" spacing={0.32}>Tonight's invitation</Caps>
          <div style={{ marginTop: 10 }}>
            <Italic size={18}>
              "Put the phones away. Light something. Begin where you are."
            </Italic>
          </div>
        </div>
      </div>

      <BottomNav active="decks" onGo={onGo} />
    </div>
  );
}

function CategoryScreen({ category, onBack, onDraw, onGo }) {
  const cat = CATEGORIES.find(c => c.id === category);
  const remaining = cat.total - cat.seen;
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto', paddingBottom: 110 }}>
      {/* Top crumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 24px 0' }}>
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: '50%',
          border: '1px solid #3D3255', background: 'transparent',
          color: '#B8A8D0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Caps size={10} color="#7A6A90" spacing={0.24}>Decks</Caps>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
        width: 280, height: 200,
        background: `radial-gradient(ellipse, ${cat.tint} 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '30px 28px 0', position: 'relative' }}>
        <div style={{ marginBottom: 18, color: cat.color }}>
          <CategoryIcon id={cat.id} size={44} color={cat.color} strokeWidth={1.1} />
        </div>
        <Caps size={9} color={cat.color} spacing={0.32}>Deck · {cat.short}</Caps>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 42, color: '#F0EAF8', letterSpacing: '-0.01em', marginTop: 6,
        }}>{cat.name}</div>
        <Hairline width={48} style={{ margin: '18px 0' }} />
        <div style={{
          fontFamily: 'Jost, sans-serif', fontSize: 13, fontWeight: 300,
          color: '#B8A8D0', lineHeight: 1.7,
        }}>{cat.desc}</div>

        {/* Progress block */}
        <div style={{
          background: 'rgba(28,21,40,0.5)', border: '1px solid #3D3255', borderRadius: 18,
          padding: '20px 20px 18px', marginTop: 28, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Caps size={9} color="#7A6A90" spacing={0.28}>Progress</Caps>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
              fontSize: 17, color: '#F0EAF8',
            }}>{cat.seen} <span style={{ color: '#524569' }}>of</span> {cat.total}</div>
          </div>
          <ProgressBar pct={cat.seen / cat.total * 100} gradient height={3} />
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
            <Caps size={9} color="#7A6A90" spacing={0.22}>{cat.type}</Caps>
            <Caps size={9} color="#7A6A90" spacing={0.22}>{remaining} remaining</Caps>
          </div>
        </div>

        {/* Draw button */}
        <button onClick={onDraw} style={{
          width: '100%', padding: 18, marginTop: 22,
          background: 'linear-gradient(135deg, #7B4FA6 0%, #9B50C8 100%)',
          border: 'none', borderRadius: 16, color: '#fff',
          fontFamily: 'Jost, sans-serif', fontSize: 14, fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          boxShadow: '0 8px 32px rgba(123,79,166,0.45), 0 2px 8px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}>Draw a card</button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Caps size={9} color="#524569" spacing={0.22}>
            Take a breath · pour something · begin
          </Caps>
        </div>
      </div>

      <BottomNav active="decks" onGo={onGo} />
    </div>
  );
}

function CardScreen({ category, onBack, onGo, tweaks }) {
  const cat = CATEGORIES.find(c => c.id === category);
  const pool = PROMPTS[category];
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showBreathe, setShowBreathe] = useState(false);
  const [counter, setCounter] = useState(cat.seen + 1);

  const onTap = () => {
    setFlipped(f => !f);
    if (!flipped) {
      setShowBreathe(true);
      setTimeout(() => setShowBreathe(false), 4200);
    }
  };

  const next = (markSeen) => {
    setFlipped(false);
    setShowBreathe(false);
    setTimeout(() => {
      setIdx(i => (i + 1) % pool.length);
      if (markSeen) setCounter(c => c + 1);
    }, 280);
  };

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 24px 0', gap: 14 }}>
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: '50%',
          border: '1px solid #3D3255', background: 'transparent',
          color: '#B8A8D0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CategoryIcon id={cat.id} size={14} color={cat.color} />
            <Caps size={9} color={cat.color} spacing={0.32}>{cat.name}</Caps>
          </div>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
            fontSize: 16, color: '#B8A8D0', marginTop: 4,
          }}>Card {counter} <span style={{ color: '#524569' }}>of</span> {cat.total}</div>
        </div>
      </div>

      {/* Card stage */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 28px 0',
      }}>
        <PlayingCard
          category={cat}
          prompt={pool[idx]}
          flipped={flipped}
          onTap={onTap}
          tweaks={tweaks}
        />
      </div>

      {/* Tap hint / breathe moment */}
      <div style={{
        textAlign: 'center', padding: '18px 24px 8px', height: 32,
        opacity: 1, transition: 'opacity .4s',
      }}>
        {showBreathe && (
          <div className="breathe-fade">
            <Italic size={14} color="#B8A8D0">Take a moment with this.</Italic>
          </div>
        )}
        {!showBreathe && (
          <Caps size={9} color="#7A6A90" spacing={0.28}>
            {flipped ? 'Discuss · then draw the next' : 'Tap card to reveal'}
          </Caps>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, padding: '14px 24px 110px' }}>
        <button onClick={() => next(false)} style={{
          flex: 1, padding: 15, borderRadius: 14,
          background: 'transparent', border: '1px solid #3D3255',
          color: '#B8A8D0', cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', fontSize: 12, fontWeight: 400,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>Pass</button>
        <button onClick={() => next(true)} style={{
          flex: 1.4, padding: 15, borderRadius: 14,
          background: 'linear-gradient(135deg, #7B4FA6 0%, #9B50C8 100%)',
          border: 'none', color: '#fff', cursor: 'pointer',
          fontFamily: 'Jost, sans-serif', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          boxShadow: '0 6px 24px rgba(123,79,166,0.4)',
        }}>Next card →</button>
      </div>

      <BottomNav active="decks" onGo={onGo} />
    </div>
  );
}

function JourneyScreen({ onGo, tweaks }) {
  const visible = CATEGORIES.filter(c => c.id !== 'spicy' || tweaks.showSpicy);
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -80, right: -60, width: 240, height: 240,
        background: 'radial-gradient(ellipse, rgba(196,112,138,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '32px 28px 0', position: 'relative' }}>
        <Caps size={10} color="#C49AE8" spacing={0.28}>Together so far</Caps>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 38, color: '#F0EAF8', letterSpacing: '-0.01em', marginTop: 8,
        }}>Your journey</div>
        <Hairline width={36} style={{ margin: '16px 0' }} />
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 15, color: '#B8A8D0', lineHeight: 1.6,
        }}>
          A quiet record of nights you chose<br/>each other over the noise.
        </div>
      </div>

      {/* Hero stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '28px 28px 0' }}>
        {[
          { v: 52, l: 'Cards drawn', sub: 'lifetime' },
          { v: 7,  l: 'Day streak', sub: 'consecutive' },
          { v: 14, l: 'Sessions',    sub: 'evenings together' },
          { v: '4h', l: 'Time spent', sub: 'in the deck' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#1C1528', border: '1px solid #3D3255', borderRadius: 16,
            padding: '18px 16px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 70, height: 70,
              background: 'radial-gradient(ellipse at top right, rgba(123,79,166,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontWeight: 300,
              fontSize: 40, color: '#F0EAF8', letterSpacing: '-0.03em', lineHeight: 1,
              marginBottom: 6,
            }}>{s.v}</div>
            <Caps size={10} color="#B8A8D0" spacing={0.16}>{s.l}</Caps>
            <div style={{ marginTop: 3 }}>
              <Caps size={8} color="#524569" spacing={0.20}>{s.sub}</Caps>
            </div>
          </div>
        ))}
      </div>

      {/* Favourite deck */}
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(196,112,138,0.10) 0%, rgba(28,21,40,0.6) 70%)',
          border: '1px solid rgba(196,112,138,0.25)', borderRadius: 16,
          padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8A0B8' }}>
            <CategoryIcon id="physical" size={26} color="#E8A0B8" strokeWidth={1.1} />
          </div>
          <div style={{ flex: 1 }}>
            <Caps size={9} color="#E8A0B8" spacing={0.30}>Most opened</Caps>
            <div style={{
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
              fontSize: 22, color: '#F0EAF8', marginTop: 2,
            }}>Physical · 18 cards</div>
          </div>
        </div>
      </div>

      {/* Deck breakdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '28px 28px 14px' }}>
        <Caps size={10} color="#7A6A90" spacing={0.28}>Deck progress</Caps>
        <Hairline />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 28px' }}>
        {visible.map(cat => {
          const pct = Math.round(cat.seen / cat.total * 100);
          return (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cat.color }}>
                <CategoryIcon id={cat.id} size={16} color={cat.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
                    fontSize: 15, color: '#F0EAF8',
                  }}>{cat.name}</span>
                  <Caps size={9} color="#7A6A90" spacing={0.22}>{pct}%</Caps>
                </div>
                <ProgressBar pct={pct} color={cat.color} height={2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy footnote */}
      <div style={{ padding: '32px 28px 0', textAlign: 'center' }}>
        <Hairline width={48} style={{ margin: '0 auto 16px' }} />
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: 13, color: '#524569', lineHeight: 1.6,
        }}>
          Everything you see here lives only on this device.<br/>
          Nothing leaves. Nothing watches.
        </div>
      </div>

      <BottomNav active="journey" onGo={onGo} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP SHELL
   ───────────────────────────────────────────────────────────── */

const SCREENS = [
  { id: 'age',      label: 'Open' },
  { id: 'decks',    label: 'Decks' },
  { id: 'category', label: 'Deck' },
  { id: 'card',     label: 'Card' },
  { id: 'journey',  label: 'Journey' },
];

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('age');
  const [category, setCategory] = useState('depth');

  // Expose for outer jumper
  useEffect(() => {
    window.attuneGoto = (id, cat) => {
      if (cat) setCategory(cat);
      setScreen(id);
    };
    renderJumper(screen);
  }, [screen]);

  const goTab = (id) => {
    if (id === 'decks') setScreen('decks');
    if (id === 'journey') setScreen('journey');
  };

  let body;
  if (screen === 'age')      body = <AgeGateScreen onContinue={() => setScreen('decks')} />;
  else if (screen === 'decks')    body = <HomeScreen onCategory={(c) => { setCategory(c); setScreen('category'); }} onGo={goTab} tweaks={t} />;
  else if (screen === 'category') body = <CategoryScreen category={category} onBack={() => setScreen('decks')} onDraw={() => setScreen('card')} onGo={goTab} />;
  else if (screen === 'card')     body = <CardScreen category={category} onBack={() => setScreen('category')} onGo={goTab} tweaks={t} />;
  else if (screen === 'journey')  body = <JourneyScreen onGo={goTab} tweaks={t} />;

  return (
    <div>
      <div style={{
        width: 392, height: 852, borderRadius: 44, overflow: 'hidden',
        position: 'relative',
        background: '#0D0A12',
        boxShadow:
          '0 0 0 2px #1A1326, 0 0 0 9px #050309, 0 0 0 10px rgba(123,79,166,0.18),' +
          ' 0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(123,79,166,0.18),' +
          ' inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Camera punch-hole (Pixel style, centered) */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 14, height: 14, borderRadius: '50%', background: '#000', zIndex: 50,
          boxShadow: '0 0 0 1.5px rgba(40,30,55,0.9), inset 0 0 3px rgba(123,79,166,0.4)',
        }} />
        <StatusBar />
        <div className="attune-screen" key={screen} style={{
          position: 'absolute', top: 36, left: 0, right: 0, bottom: 0,
          animation: 'screenIn .5s cubic-bezier(.4,0,.2,1)',
        }}>
          {body}
        </div>
        <HomeIndicator />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere">
          <TweakSlider label="Ambient glow" value={t.glow} min={0} max={100} unit="%"
            onChange={(v) => setTweak('glow', v)} />
          <TweakSlider label="Film grain" value={t.grain} min={0} max={100} unit="%"
            onChange={(v) => setTweak('grain', v)} />
        </TweakSection>
        <TweakSection label="Card design">
          <TweakRadio label="Corner ornament" value={t.ornament}
            options={['brackets', 'hairlines', 'none']}
            onChange={(v) => setTweak('ornament', v)} />
          <TweakSelect label="Front motif" value={t.cardBackMotif}
            options={['monogram', 'ampersand', 'vesica', 'moon', 'flame', 'seal', 'compass', 'void']}
            onChange={(v) => setTweak('cardBackMotif', v)} />
        </TweakSection>
        <TweakSection label="Content">
          <TweakToggle label="Show Spicy deck" value={t.showSpicy}
            onChange={(v) => setTweak('showSpicy', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function renderJumper(active) {
  const host = document.getElementById('jumper');
  if (!host) return;
  host.innerHTML = '';
  SCREENS.forEach(s => {
    const b = document.createElement('button');
    b.textContent = s.label;
    if (s.id === active) b.classList.add('active');
    b.onclick = () => window.attuneGoto(s.id);
    host.appendChild(b);
  });
}

/* Add keyframes + tile hover */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes screenIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } }
  .pulse-dot { animation: pulse 2.4s ease-in-out infinite; }
  @keyframes breatheFade {
    0% { opacity: 0; transform: translateY(4px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
  .breathe-fade { animation: breatheFade 4.2s ease-out; }
  .cat-tile:hover { transform: scale(0.97); border-color: #524569 !important; }
  .cat-tile:active { transform: scale(0.95); }
`;
document.head.appendChild(styleTag);

ReactDOM.createRoot(document.getElementById('phone-host')).render(<App />);
