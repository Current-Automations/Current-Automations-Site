// Scene 6 — CTA card (80.0–87.0s)
// Dark navy with logo + book a free audit.

function CTAScene() {
  return (
    <Sprite start={80.0} end={87.0}>
      <div style={{position:'absolute', inset:0, background:BRAND.deep}}>
        <StageBG/>
      </div>

      {/* Ambient wave echo, brand banner style */}
      <Sprite start={80.0} end={87.0}>
        <CTAWaves/>
      </Sprite>

      <Sprite start={80.2} end={86.8}>
        <CTAContent/>
      </Sprite>
    </Sprite>
  );
}

function CTAWaves() {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1));
  return (
    <>
      <div style={{
        position:'absolute', left:-180, top:'50%',
        transform:`translateY(-50%) translateX(${(1-t) * -60}px)`,
        opacity: t * 0.6,
      }}>
        <WaveEcho width={780} height={360} opacity={1}/>
      </div>
      <div style={{
        position:'absolute', right:-180, top:'50%',
        transform:`translateY(-50%) scaleX(-1) translateX(${(1-t) * -60}px)`,
        opacity: t * 0.6,
      }}>
        <WaveEcho width={780} height={360} opacity={1}/>
      </div>
    </>
  );
}

function CTAContent() {
  const { localTime } = useSprite();
  return (
    <div style={{
      position:'absolute', left:'50%', top:'50%',
      transform:'translate(-50%, -50%)',
      width:1280, textAlign:'center',
      display:'flex', flexDirection:'column', alignItems:'center', gap:0,
    }}>
      <FadeIn duration={0.6}>
        <Wordmark markSize={96} wordSize={56}/>
      </FadeIn>

      <FadeIn duration={0.5} delay={0.35}>
        <div style={{
          marginTop:46,
          fontFamily:FONT_DISPLAY, fontSize:72, color:BRAND.ink,
          fontWeight:500, letterSpacing:'-0.02em', lineHeight:1.05,
        }}>
          Book a free <span style={{
            background:BRAND.wave, WebkitBackgroundClip:'text', backgroundClip:'text',
            color:'transparent',
          }}>30-minute audit.</span>
        </div>
      </FadeIn>

      <FadeIn duration={0.5} delay={0.55}>
        <div style={{
          marginTop:14, fontFamily:FONT_UI, fontSize:22, color:BRAND.ink50,
          letterSpacing:'-0.005em',
        }}>
          No pitch, no obligation. Just a look at where the leaks are.
        </div>
      </FadeIn>

      <FadeIn duration={0.6} delay={0.85}>
        <div style={{marginTop:44, display:'flex', alignItems:'center', gap:18}}>
          <CTAButton/>
          <div style={{
            fontFamily:FONT_MONO, fontSize:13, color:BRAND.ink50,
            letterSpacing:'0.12em',
          }}>
            or call directly
          </div>
        </div>
      </FadeIn>

      <FadeIn duration={0.5} delay={1.4}>
        <div style={{
          marginTop:42, paddingTop:24,
          borderTop:`1px solid ${BRAND.ruleSoft}`,
          display:'flex', alignItems:'center', justifyContent:'center', gap:30,
          fontFamily:FONT_MONO, fontSize:13, color:BRAND.ink50,
          letterSpacing:'0.14em', textTransform:'uppercase',
          width:'100%',
        }}>
          <span>Live in &lt; 48h</span>
          <span style={{color:'rgba(140,240,224,0.4)'}}>/</span>
          <span>Month-to-month</span>
          <span style={{color:'rgba(140,240,224,0.4)'}}>/</span>
          <a href="mailto:admin@currentautomations.ca"
             style={{color:BRAND.crest, textDecoration:'none'}}>admin@currentautomations.ca</a>
          <span style={{color:'rgba(140,240,224,0.4)'}}>/</span>
          <a href="tel:+13655137474"
             style={{color:BRAND.crest, textDecoration:'none'}}>365 · 513 · 7474</a>
        </div>
      </FadeIn>
    </div>
  );
}

function CTAButton() {
  const t = useTime();
  // Subtle shimmer
  const shimmerX = ((t * 0.4) % 1) * 100;
  return (
    <a
      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb"
      target="_blank"
      rel="noopener noreferrer"
      style={{
      position:'relative',
      padding:'20px 38px',
      borderRadius:999,
      background:BRAND.wave,
      color:BRAND.deep,
      fontFamily:FONT_DISPLAY, fontSize:22, fontWeight:600,
      letterSpacing:'-0.01em',
      boxShadow:'0 14px 44px -6px rgba(46,143,214,0.55)',
      display:'flex', alignItems:'center', gap:14,
      overflow:'hidden',
      textDecoration:'none',
      outline:'none',
      cursor:'pointer',
      isolation:'isolate',
      willChange:'transform',
    }}>
      <span>Book Free Audit</span>
      <span style={{display:'flex', alignItems:'center'}}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke={BRAND.deep} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {/* Shimmer — full-width div, gradient center moves instead of element position.
          Avoids GPU compositing layer boundary artifact from left-position animation. */}
      <div style={{
        position:'absolute', top:0, bottom:0, left:0, right:0,
        background:`linear-gradient(90deg, transparent ${Math.max(0, shimmerX - 15)}%, rgba(255,255,255,0.28) ${shimmerX}%, transparent ${Math.min(100, shimmerX + 15)}%)`,
        pointerEvents:'none',
        zIndex:-1,
      }}/>
    </a>
  );
}

Object.assign(window, { CTAScene });
