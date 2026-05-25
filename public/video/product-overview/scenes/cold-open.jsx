// Cold open (0–8s): Phone ringing on truck dash, unanswered → hard cut → stat
// reveal "21× more likely". Establishes stakes fast.
// Also: title card with logo (0–2s) layered.

function TitleCard() {
  // 0–2s
  return (
    <Sprite start={0} end={2.4}>
      <div style={{position:'absolute', inset:0, background:BRAND.base}}>
        <StageBG/>
      </div>
      <div style={{
        position:'absolute', left:'50%', top:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:28,
      }}>
        <FadeIn duration={0.6}>
          <Wordmark markSize={88} wordSize={48}/>
        </FadeIn>
        <FadeIn duration={0.6} delay={0.35}>
          <div style={{
            fontFamily:FONT_MONO, fontSize:13, color:BRAND.crest,
            letterSpacing:'0.28em', textTransform:'uppercase',
            display:'flex', alignItems:'center', gap:14,
            padding:'8px 16px', borderRadius:999,
            border:'1px solid rgba(140,240,224,0.25)',
            background:'rgba(140,240,224,0.04)',
          }}>
            <span style={{width:6, height:6, borderRadius:'50%', background:BRAND.crest, boxShadow:`0 0 8px ${BRAND.crest}`}}/>
            AI Operations · For Canadian Trades
          </div>
        </FadeIn>
      </div>
    </Sprite>
  );
}

// Small helper for fade-in within a Sprite
// When the animation is complete (t===1) we explicitly set transform:'none'
// so the element leaves the GPU compositing layer — this eliminates the faint
// hairline boundary that adjacent compositing layers create.
function FadeIn({ children, duration = 0.5, delay = 0 }) {
  const { localTime } = useSprite();
  const lt = localTime - delay;
  const t = Easing.easeOutCubic(clamp(lt / duration, 0, 1));
  const done = t >= 1;
  return (
    <div style={{
      opacity: t,
      transform: done ? 'none' : `translateY(${(1 - t) * 12}px)`,
    }}>
      {children}
    </div>
  );
}

// Truck-dash phone scene (2.4–6.8s)
function TruckDashScene() {
  return (
    <Sprite start={2.4} end={6.8}>
      <div style={{position:'absolute', inset:0, background:'#0a0e14'}}/>
      {/* Cinematic letterbox feel */}
      <div style={{position:'absolute', left:0, right:0, top:0, height:80, background:'linear-gradient(180deg, #000 0%, transparent 100%)', opacity:0.6}}/>
      <div style={{position:'absolute', left:0, right:0, bottom:0, height:120, background:'linear-gradient(0deg, #000 0%, transparent 100%)', opacity:0.6}}/>

      <TruckDashIllustration/>
      <RingingPhone x={960} y={620}/>

      {/* Tactile context: hands busy chip */}
      <Sprite start={3.2} end={6.8}>
        <FadeIn duration={0.4}>
          <div style={{
            position:'absolute', left:120, top:160,
            fontFamily:FONT_MONO, fontSize:14, color:BRAND.slateLt,
            letterSpacing:'0.2em', textTransform:'uppercase',
          }}>
            18:42 — On-site · Hands full
          </div>
        </FadeIn>
      </Sprite>

      {/* Missed call indicator after 5.5s */}
      <Sprite start={5.5} end={6.8}>
        <FadeIn duration={0.3}>
          <div style={{
            position:'absolute', left:840, top:540,
            padding:'8px 14px', borderRadius:6,
            background:'rgba(220, 60, 60, 0.95)',
            color:'#fff', fontFamily:FONT_UI, fontWeight:700, fontSize:14,
            letterSpacing:'0.08em', textTransform:'uppercase',
            boxShadow:'0 8px 24px rgba(220,60,60,0.4)',
          }}>
            ✕ Missed call
          </div>
        </FadeIn>
      </Sprite>
    </Sprite>
  );
}

// Illustrated truck dash: steering wheel arc, dash bevel, windshield gradient.
// All vector — no SVG portraits.
function TruckDashIllustration() {
  return (
    <svg viewBox="0 0 1920 1080" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <defs>
        <linearGradient id="windshield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2638" stopOpacity="0.7"/>
          <stop offset="1" stopColor="#0a1320" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="dashTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1d20"/>
          <stop offset="1" stopColor="#0a0b0d"/>
        </linearGradient>
        <radialGradient id="headlights" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd89a" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#ffd89a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Windshield + distant road */}
      <rect x="0" y="0" width="1920" height="640" fill="url(#windshield)"/>
      {/* Distant headlight glow */}
      <ellipse cx="600" cy="500" rx="280" ry="80" fill="url(#headlights)"/>
      <ellipse cx="1340" cy="510" rx="240" ry="70" fill="url(#headlights)"/>
      {/* Snowy road suggestion */}
      <path d="M0 700 L820 540 L1100 540 L1920 700 Z" fill="#0b1422" opacity="0.6"/>
      <path d="M860 540 L920 700 L1000 700 L1060 540 Z" fill="#1a2638" opacity="0.7"/>

      {/* Dash bevel */}
      <path d="M0 640 L0 1080 L1920 1080 L1920 640 Q1700 720 960 720 Q220 720 0 640 Z" fill="url(#dashTop)"/>
      {/* Dash seam */}
      <path d="M0 680 Q960 760 1920 680" stroke="#2a2d33" strokeWidth="1" fill="none" opacity="0.6"/>

      {/* Steering wheel arc (bottom left) */}
      <g transform="translate(420 1080)">
        <circle r="280" fill="none" stroke="#15171b" strokeWidth="38"/>
        <circle r="260" fill="none" stroke="#26282d" strokeWidth="2"/>
        <path d="M-260 0 L-90 0 M90 0 L260 0 M0 -260 L0 -90" stroke="#15171b" strokeWidth="22"/>
        <circle r="70" fill="#1a1c20"/>
        <circle r="14" cx="0" cy="0" fill="#3a3d44"/>
      </g>

      {/* Phone tray + cable */}
      <rect x="1280" y="950" width="380" height="14" rx="4" fill="#15171b"/>
      <path d="M1340 950 Q1320 880 1280 870" stroke="#1d1f23" strokeWidth="6" fill="none"/>
    </svg>
  );
}

function RingingPhone({ x, y }) {
  const { localTime, duration } = useSprite();
  // Phone enters quickly, rings (small shake), missed call lights up
  const enter = Easing.easeOutBack(clamp((localTime - 0.2) / 0.6, 0, 1));
  // Subtle ring shake for the first ~3s
  const ringStart = 0.8;
  const ringEnd = 3.0;
  let shakeX = 0, shakeY = 0;
  if (localTime > ringStart && localTime < ringEnd) {
    const r = (localTime - ringStart) * 14;
    shakeX = Math.sin(r) * 3;
    shakeY = Math.cos(r * 1.3) * 1.5;
  }
  return (
    <div style={{
      position:'absolute', left:x, top:y,
      transform:`translate(-50%, -50%) translate(${shakeX}px, ${shakeY}px) scale(${0.85 + enter * 0.15})`,
      opacity: enter,
    }}>
      <PhoneFrame width={340} height={680}>
        <PhoneRingingUI ringing={localTime < ringEnd}/>
      </PhoneFrame>
      {/* Glow */}
      <div style={{
        position:'absolute', inset:-40,
        borderRadius:'50%',
        background:`radial-gradient(circle, ${BRAND.teal}22 0%, transparent 70%)`,
        zIndex:-1,
      }}/>
    </div>
  );
}

function PhoneFrame({ children, width = 340, height = 680 }) {
  return (
    <div style={{
      width, height,
      background:'#000',
      borderRadius:42,
      padding:7,
      boxShadow:'0 30px 80px rgba(0,0,0,0.6)',
      position:'relative',
    }}>
      <div style={{
        position:'absolute', left:'50%', top:14, transform:'translateX(-50%)',
        width:90, height:24, background:'#000', borderRadius:14, zIndex:10,
      }}/>
      <div style={{
        width:'100%', height:'100%', borderRadius:36, overflow:'hidden',
        background:BRAND.base, position:'relative',
      }}>
        {children}
      </div>
    </div>
  );
}

function PhoneRingingUI({ ringing }) {
  return (
    <div style={{
      position:'absolute', inset:0,
      background:`linear-gradient(180deg, ${BRAND.navy1} 0%, ${BRAND.base} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'70px 28px 32px',
      color:BRAND.ink, fontFamily:FONT_UI,
    }}>
      <div style={{fontSize:13, color:BRAND.slateLt, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12}}>
        Incoming call
      </div>
      <div style={{
        width:110, height:110, borderRadius:'50%',
        background:`linear-gradient(135deg, ${BRAND.navy3}, ${BRAND.navy2})`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:42, fontWeight:600, color:BRAND.ink,
        marginBottom:18,
        boxShadow: ringing ? `0 0 22px 4px rgba(220,60,60,0.32)` : 'none',
      }}>
        DM
      </div>
      <div style={{fontSize:24, fontWeight:700, marginBottom:4}}>Unknown caller</div>
      <div style={{fontSize:14, color:BRAND.slateLt, marginBottom:50}}>+1 (905) 555-0148 · mobile</div>
      <div style={{
        flex:1, width:'100%',
        display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        padding:'0 18px 14px',
      }}>
        <div style={{
          width:62, height:62, borderRadius:'50%',
          background:'#d63c3c',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: ringing ? '0 0 30px rgba(220,60,60,0.5)' : 'none',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" style={{transform:'rotate(135deg)'}}>
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/>
          </svg>
        </div>
        <div style={{
          width:62, height:62, borderRadius:'50%',
          background:BRAND.tealDk,
          display:'flex', alignItems:'center', justifyContent:'center',
          opacity:0.5,
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// Stakes card (6.8–10s): hard cut to dark with teal text
function StakesCard() {
  return (
    <Sprite start={6.8} end={11.4}>
      <div style={{position:'absolute', inset:0, background:BRAND.base}}>
        <StageBG/>
      </div>
      {/* Headline */}
      <Sprite start={6.85} end={9.4}>
        <div style={{
          position:'absolute', left:'50%', top:'42%', transform:'translate(-50%,-50%)',
          maxWidth:1400, textAlign:'center',
        }}>
          <FadeIn duration={0.5}>
            <div style={{
              fontFamily:FONT_DISPLAY, fontSize:88, lineHeight:1.08,
              color:BRAND.ink, letterSpacing:'-0.02em', fontWeight:500,
            }}>
              Every missed call is a job
              <br/>
              <span style={{
                background:BRAND.wave, WebkitBackgroundClip:'text', backgroundClip:'text',
                color:'transparent',
              }}>going to your competitor.</span>
            </div>
          </FadeIn>
        </div>
      </Sprite>
      {/* Stat reveal */}
      <Sprite start={9.4} end={11.4}>
        <div style={{
          position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)',
          textAlign:'center',
        }}>
          <FadeIn duration={0.4}>
            <div style={{marginBottom:24}}>
              <Eyebrow color={BRAND.slateLt}>The data</Eyebrow>
            </div>
          </FadeIn>
          <FadeIn duration={0.6} delay={0.2}>
            <div style={{
              fontFamily:FONT_DISPLAY, fontSize:220, lineHeight:1, fontWeight:500,
              background:BRAND.wave, WebkitBackgroundClip:'text', backgroundClip:'text',
              color:'transparent', letterSpacing:'-0.04em',
            }}>
              21<span style={{fontWeight:300, fontSize:140}}>×</span>
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.5}>
            <div style={{
              fontFamily:FONT_UI, fontSize:26, color:BRAND.ink,
              marginTop:18, maxWidth:900, marginLeft:'auto', marginRight:'auto',
              lineHeight:1.4,
            }}>
              more likely to qualify a lead when you respond in the first five minutes.
            </div>
          </FadeIn>
        </div>
      </Sprite>
    </Sprite>
  );
}

Object.assign(window, { TitleCard, TruckDashScene, StakesCard, PhoneFrame, FadeIn });
