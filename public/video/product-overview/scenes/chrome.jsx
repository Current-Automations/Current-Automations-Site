// Shared chrome — uses official Current Automations brand tokens.
// Colors and fonts pulled from the brand canvas, not the pasted brief.

const BRAND = {
  // Backgrounds
  deep:    '#04091a',   // deep ink
  base:    '#06101f',   // bg deep
  navy:    '#0b1828',   // brand navy
  navy2:   '#11293f',   // navy hover
  card:    '#0f1f33',   // card bg
  cardHi:  '#142a44',
  // Ink
  ink:     '#ffffff',
  ink80:   '#cfe1f0',
  ink50:   '#7f95ad',
  // Accents (wave palette)
  crest:   '#8cf0e0',   // teal-100
  teal:    '#5dd6cb',   // teal-200  (primary accent / win color)
  tealMid: '#3bb6c7',   // teal-300
  blue:    '#2e8fd6',   // current blue
  blueDk:  '#1652a8',   // deep blue
  // Helpers
  rule:    'rgba(140,240,224,0.22)',
  ruleSoft:'rgba(140,240,224,0.10)',
  ruleDim: 'rgba(255,255,255,0.06)',
  // Gradient
  wave:    'linear-gradient(90deg, #8cf0e0 0%, #3bb6c7 38%, #2e8fd6 75%, #1652a8 100%)',
  waveV:   'linear-gradient(180deg, #8cf0e0 0%, #3bb6c7 50%, #2e8fd6 100%)',
};
// Back-compat aliases used by older scene files — map onto the brand tokens.
BRAND.navy1   = BRAND.navy;
BRAND.navy3   = '#1c3a5a';
BRAND.tealHi  = BRAND.crest;
BRAND.tealDk  = BRAND.tealMid;
BRAND.slate   = '#536581';
BRAND.slateLt = BRAND.ink50;

const FONT_UI      = "'Inter', system-ui, -apple-system, sans-serif";
const FONT_DISPLAY = "'Space Grotesk', system-ui, sans-serif";
const FONT_MONO    = "'JetBrains Mono', ui-monospace, monospace";

// ── Logo mark (regenerated from brand/assets/logo/mark-disc.svg) ──────────────────────────────────────────
const ICON_DATA_URI = "assets/icon.png";
function LogoMark({ size = 56 }) {
  return (
    <img src={ICON_DATA_URI} alt=""
         style={{width:size, height:size, display:'block'}}/>
  );
}

function Wordmark({ markSize = 60, wordSize = 32, gap = 18, light = false }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap, fontFamily:FONT_DISPLAY}}>
      <LogoMark size={markSize}/>
      <div style={{
        fontWeight:600, fontSize:wordSize, letterSpacing:'-0.02em',
        lineHeight:0.95, whiteSpace:'nowrap',
      }}>
        <span style={{color: light ? BRAND.navy : BRAND.ink}}>Current</span>{' '}
        <span style={{color: BRAND.teal, fontWeight:500}}>Automations</span>
      </div>
    </div>
  );
}

// ── Backgrounds ─────────────────────────────────────────────────────────────
function StageBG() {
  return (
    <div style={{
      position:'absolute', inset:0, overflow:'hidden',
      background:`radial-gradient(120% 100% at 10% 0%, ${BRAND.navy2} 0%, ${BRAND.base} 65%)`,
    }}>
      {/* faint grid */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:
          'linear-gradient(rgba(140,240,224,0.045) 1px, transparent 1px),'+
          'linear-gradient(90deg, rgba(140,240,224,0.045) 1px, transparent 1px)',
        backgroundSize:'56px 56px',
        maskImage:'radial-gradient(85% 70% at 50% 40%, #000 0%, transparent 90%)',
      }}/>
      {/* angled stripes — subtle, from brand banner system */}
      <div style={{
        position:'absolute', right:-80, top:'50%',
        width:'62%', height:'220%',
        transform:'translateY(-50%) rotate(-12deg)',
        background:
          'repeating-linear-gradient(90deg,'+
          ' transparent 0 24px,'+
          ' rgba(59,182,199,0.06) 24px 25px,'+
          ' transparent 25px 64px,'+
          ' rgba(46,143,214,0.08) 64px 65px)',
        maskImage:'linear-gradient(90deg, transparent 0%, #000 30%, #000 80%, transparent 100%)',
      }}/>
      {/* soft halo */}
      <div style={{
        position:'absolute', left:'70%', top:'55%',
        width:900, height:900, marginLeft:-450, marginTop:-450,
        background:`radial-gradient(circle, rgba(93,214,203,0.16) 0%, rgba(46,143,214,0.08) 40%, transparent 70%)`,
        filter:'blur(2px)',
      }}/>
    </div>
  );
}

// ── Eyebrow ─────────────────────────────────────────────────────────────────
function Eyebrow({ children, color = BRAND.crest, size = 12 }) {
  return (
    <div style={{
      fontFamily:FONT_MONO, fontWeight:500, fontSize:size,
      letterSpacing:'0.22em', textTransform:'uppercase',
      color,
      display:'inline-flex', alignItems:'center', gap:10,
      padding:'6px 14px',
      borderRadius:999,
      border:'1px solid rgba(140,240,224,0.25)',
      background:'rgba(140,240,224,0.04)',
    }}>
      <span style={{
        width:6, height:6, borderRadius:'50%',
        background:color, boxShadow:`0 0 8px ${color}`,
      }}/>
      {children}
    </div>
  );
}

// ── Teal pill badge ─────────────────────────────────────────────────────────
function PillBadge({ children, tone = 'teal', size = 12 }) {
  const isTeal = tone === 'teal';
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:8,
      padding:'5px 11px',
      borderRadius:999,
      fontFamily:FONT_MONO, fontWeight:500, fontSize:size,
      letterSpacing:'0.14em', textTransform:'uppercase',
      background: isTeal ? 'rgba(140,240,224,0.10)' : 'rgba(255,255,255,0.05)',
      color: isTeal ? BRAND.crest : BRAND.ink50,
      border:`1px solid ${isTeal ? 'rgba(140,240,224,0.30)' : 'rgba(255,255,255,0.08)'}`,
    }}>
      {children}
    </span>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, glow = false }) {
  return (
    <div style={{
      background:`linear-gradient(180deg, ${BRAND.cardHi} 0%, ${BRAND.card} 100%)`,
      border:'1px solid rgba(140,240,224,0.10)',
      borderRadius:16,
      overflow:'hidden',
      boxShadow: glow
        ? '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(93,214,203,0.10)'
        : '0 30px 80px rgba(0,0,0,0.45)',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Lower-third caption ─────────────────────────────────────────────────────
function LowerThird({ scene, label, tag, x = 120, y = 940 }) {
  const { localTime, duration } = useSprite();
  const t = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
  const exitT = Easing.easeInCubic(clamp((localTime - (duration - 0.45)) / 0.45, 0, 1));
  const opacity = (1 - exitT) * t;
  const tx = (1 - t) * -16;
  const atRest = t >= 1 && exitT === 0;
  return (
    <div style={{
      position:'absolute', left:x, top:y, zIndex:5,
      display:'flex', alignItems:'center', gap:18,
      opacity: atRest ? 1 : opacity,
      transform: atRest ? 'none' : `translateX(${tx}px)`,
      fontFamily:FONT_UI,
    }}>
      <div style={{
        fontFamily:FONT_MONO, fontSize:12, color:BRAND.crest,
        letterSpacing:'0.22em',
      }}>
        {scene}
      </div>
      <div style={{width:1, height:22, background:'rgba(255,255,255,0.18)'}}/>
      <div style={{color:BRAND.ink, fontFamily:FONT_DISPLAY, fontSize:22, fontWeight:600, letterSpacing:'-0.01em'}}>
        {label}
      </div>
      {tag && (
        <>
          <div style={{width:1, height:18, background:'rgba(255,255,255,0.10)'}}/>
          <div style={{color:BRAND.ink50, fontSize:14, letterSpacing:'0.06em'}}>
            {tag}
          </div>
        </>
      )}
    </div>
  );
}

// ── Win confirmation chip ───────────────────────────────────────────────────
function WinChip({ x, y, label, sub, delay = 0, size = 1 }) {
  const { localTime } = useSprite();
  const lt = localTime - delay;
  if (lt < 0) return null;
  const t = Easing.easeOutBack(clamp(lt / 0.55, 0, 1));
  const opacity = clamp(lt / 0.35, 0, 1);
  const scale = 0.7 + 0.3 * t;
  const pulse = 1 + Math.max(0, 0.05 * Math.sin(Math.max(0, lt - 0.55) * 6) * Math.exp(-(lt - 0.55) * 2));
  return (
    <div style={{
      position:'absolute', left:x, top:y, zIndex:10,
      transform:`translate(-50%, -50%) scale(${scale * size * pulse})`,
      opacity,
      display:'flex', alignItems:'center', gap:14,
      padding:'18px 26px',
      borderRadius:999,
      background:BRAND.wave,
      color:BRAND.deep,
      fontFamily:FONT_UI, fontWeight:700,
      boxShadow:`0 20px 50px rgba(93,214,203,0.40)`,
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="10" fill={BRAND.deep} opacity="0.20"/>
        <path d="M6 11.5l3.5 3.5L17 7.5" stroke={BRAND.deep} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{lineHeight:1.15}}>
        <div style={{fontFamily:FONT_DISPLAY, fontSize:19, letterSpacing:'-0.005em'}}>{label}</div>
        {sub && <div style={{fontSize:12, fontWeight:500, opacity:0.75, letterSpacing:'0.04em', marginTop:3}}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Pulse dot ───────────────────────────────────────────────────────────────
function PulseDot({ x, y, color = BRAND.crest, size = 12 }) {
  const t = useTime();
  const pulse = 0.5 + 0.5 * Math.sin(t * 3);
  return (
    <div style={{position:'absolute', left:x, top:y, width:size, height:size, transform:'translate(-50%,-50%)'}}>
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%', background:color,
        boxShadow:`0 0 ${10 + pulse * 14}px ${color}`,
      }}/>
      <div style={{
        position:'absolute', inset:-8,
        borderRadius:'50%', border:`1.5px solid ${color}`,
        opacity:0.3 + pulse * 0.3,
        transform:`scale(${0.9 + pulse * 0.25})`,
      }}/>
    </div>
  );
}

// ── Decorative wave echo (matches brand banner) ─────────────────────────────
function WaveEcho({ width = 520, height = 220, opacity = 0.45 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 520 220" fill="none" style={{opacity, display:'block'}}>
      <defs>
        <linearGradient id="weG" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8cf0e0"/>
          <stop offset="0.45" stopColor="#3bb6c7"/>
          <stop offset="1" stopColor="#1652a8"/>
        </linearGradient>
      </defs>
      {[0,1,2,3,4].map(i => (
        <path key={i}
          d={`M0 ${60 + i*22} C 110 ${30 + i*22}, 220 ${100 + i*22}, 330 ${60 + i*22} S 520 ${30 + i*22}, 520 ${60 + i*22}`}
          stroke="url(#weG)" strokeWidth={2 - i*0.25}
          strokeOpacity={0.85 - i*0.15} fill="none" strokeLinecap="round"/>
      ))}
    </svg>
  );
}

Object.assign(window, {
  BRAND, FONT_UI, FONT_DISPLAY, FONT_MONO,
  LogoMark, Wordmark, StageBG, Eyebrow, PillBadge, GlassCard,
  LowerThird, WinChip, PulseDot, WaveEcho,
});
