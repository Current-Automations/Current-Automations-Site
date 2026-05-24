// Scenario 4 — Post-job review request + cancellation recovery (52.4–65.4s)
// Beats: job done → review request → 5★ review lands → no-show recovery preview

function Scenario4() {
  return (
    <Sprite start={52.4} end={65.4}>
      <div style={{position:'absolute', inset:0}}>
        <StageBG/>
      </div>

      <Sprite start={52.4} end={55.0}>
        <div style={{position:'absolute', left:120, top:120}}>
          <FadeIn duration={0.4}><Eyebrow>Scenario 04 · Post-Job</Eyebrow></FadeIn>
          <FadeIn duration={0.5} delay={0.15}>
            <div style={{
              marginTop:20, fontFamily:FONT_DISPLAY, fontSize:72, color:BRAND.ink,
              letterSpacing:'-0.02em', fontWeight:400, lineHeight:1.05, maxWidth:1300,
            }}>
              Job's done. <span style={{color:BRAND.teal, fontStyle:'italic'}}>The reputation work happens on its own.</span>
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.35}>
            <div style={{
              marginTop:18, fontFamily:FONT_UI, fontSize:22, color:BRAND.slateLt,
              maxWidth:820, lineHeight:1.45,
            }}>
              A review request goes out. A canceled slot gets refilled. You're already on the next call.
            </div>
          </FadeIn>
        </div>
      </Sprite>

      <Sprite start={54.6} end={65.0}>
        <Scenario4Center/>
      </Sprite>

      <Sprite start={54.8} end={64.4}>
        <LowerThird scene="T10 + T09" label="Review Request + No-Show Recovery" tag="Reputation & recovery"/>
      </Sprite>
    </Sprite>
  );
}

function Scenario4Center() {
  return (
    <div style={{position:'absolute', inset:0}}>
      {/* Review request phone */}
      <FadeIn duration={0.5}>
        <div style={{position:'absolute', left:160, top:200}}>
          <PhoneFrame width={360} height={720}>
            <ReviewRequestUI/>
          </PhoneFrame>
        </div>
      </FadeIn>

      {/* Review profile filling up — middle */}
      <FadeIn duration={0.5} delay={0.15}>
        <div style={{position:'absolute', left:620, top:240}}>
          <ReviewProfileCard/>
        </div>
      </FadeIn>

      {/* Recovery panel — right */}
      <FadeIn duration={0.5} delay={0.3}>
        <div style={{position:'absolute', left:1260, top:240}}>
          <RecoveryPanel/>
        </div>
      </FadeIn>
    </div>
  );
}

function ReviewRequestUI() {
  const { localTime } = useSprite();
  const absT = localTime + 54.6;
  const showAuto = absT > 55.4;
  const showCustomer = absT > 57.8;
  const showThanks = absT > 59.2;
  return (
    <div style={{
      position:'absolute', inset:0, background:'#000',
      display:'flex', flexDirection:'column',
    }}>
      <div style={{
        height:46, padding:'14px 26px 0',
        display:'flex', justifyContent:'space-between',
        fontFamily:FONT_UI, fontSize:14, fontWeight:600, color:'#fff',
      }}>
        <span>4:32</span>
        <span style={{fontSize:11}}>● ● ● ● ●</span>
      </div>
      <div style={{
        padding:'8px 20px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column', alignItems:'center',
        fontFamily:FONT_UI, color:'#fff',
      }}>
        <div style={{
          width:40, height:40, borderRadius:'50%',
          background:`linear-gradient(135deg, ${BRAND.tealDk}, ${BRAND.teal})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:700, fontSize:14, color:'#062014', marginBottom:4,
        }}>
          NS
        </div>
        <div style={{fontSize:13, fontWeight:600}}>Northstar Mechanical</div>
        <div style={{fontSize:10, color:'rgba(255,255,255,0.45)'}}>Business · verified</div>
      </div>

      <div style={{flex:1, padding:'14px 14px', display:'flex', flexDirection:'column', gap:8}}>
        {showAuto && (
          <div style={{alignSelf:'flex-end', maxWidth:'85%', position:'relative'}}>
            <div style={{
              padding:'10px 13px', borderRadius:18,
              background:`linear-gradient(180deg, ${BRAND.teal} 0%, ${BRAND.tealDk} 100%)`,
              color:'#062014', fontFamily:FONT_UI, fontSize:13, lineHeight:1.4,
              fontWeight:600, borderBottomRightRadius:6,
            }}>
              Hi Tom — thanks for choosing Northstar Mechanical today. If we did right by you, a quick Google review would mean the world. Takes about 20 seconds: <u>g.page/r/northstar</u>
            </div>
            <div style={{
              position:'absolute', top:-7, right:8,
              padding:'2px 6px', borderRadius:4,
              background:'#062014', color:BRAND.teal,
              fontFamily:FONT_MONO, fontSize:8, fontWeight:700, letterSpacing:'0.2em',
            }}>
              AUTO · T10
            </div>
          </div>
        )}
        {showCustomer && (
          <div style={{alignSelf:'flex-start', maxWidth:'85%'}}>
            <div style={{
              padding:'10px 13px', borderRadius:18,
              background:'rgba(255,255,255,0.10)', color:'#fff',
              fontFamily:FONT_UI, fontSize:13, lineHeight:1.4,
              borderBottomLeftRadius:6,
            }}>
              Just left one. You guys were great — fixed it same day.
            </div>
          </div>
        )}
        {showThanks && (
          <div style={{alignSelf:'flex-end', maxWidth:'85%', position:'relative'}}>
            <div style={{
              padding:'10px 13px', borderRadius:18,
              background:`linear-gradient(180deg, ${BRAND.teal} 0%, ${BRAND.tealDk} 100%)`,
              color:'#062014', fontFamily:FONT_UI, fontSize:13,
              fontWeight:600, borderBottomRightRadius:6,
            }}>
              Means a lot — thank you Tom. Have a great weekend.
            </div>
            <div style={{
              position:'absolute', top:-7, right:8,
              padding:'2px 6px', borderRadius:4,
              background:'#062014', color:BRAND.teal,
              fontFamily:FONT_MONO, fontSize:8, fontWeight:700, letterSpacing:'0.2em',
            }}>
              AUTO
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewProfileCard() {
  const { localTime } = useSprite();
  const absT = localTime + 54.6;
  // New review pops in at 60s
  const showNew = absT > 59.8;
  const ratingAge = clamp(absT - 60.0, 0, 1);
  return (
    <GlassCard glow style={{width:600, padding:'28px 30px 30px'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18}}>
        <div style={{display:'flex', alignItems:'center', gap:14}}>
          <div style={{
            width:48, height:48, borderRadius:12,
            background:'#fff', color:'#1a1a1a',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:FONT_UI, fontSize:22, fontWeight:700,
          }}>G</div>
          <div>
            <div style={{fontFamily:FONT_UI, fontSize:18, color:BRAND.ink, fontWeight:700}}>
              Northstar Mechanical
            </div>
            <div style={{fontFamily:FONT_UI, fontSize:12, color:BRAND.slateLt}}>
              Mississauga, ON · Google Business Profile
            </div>
          </div>
        </div>
        <PillBadge size={11}>+1 this week</PillBadge>
      </div>

      {/* Big rating */}
      <div style={{
        display:'flex', alignItems:'baseline', gap:14, marginBottom:6,
      }}>
        <div style={{
          fontFamily:FONT_DISPLAY, fontSize:78, color:BRAND.ink, fontWeight:500, letterSpacing:'-0.03em',
          transform: showNew ? `scale(${1 + 0.04 * Math.exp(-ratingAge * 4)})` : 'none',
          transition:'transform 0.4s',
        }}>
          {showNew ? '4.9' : '4.9'}
        </div>
        <div>
          <div style={{display:'flex', gap:3, marginBottom:4}}>
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill={BRAND.teal}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <div style={{fontFamily:FONT_UI, fontSize:13, color:BRAND.slateLt}}>
            {showNew ? '247 reviews' : '246 reviews'} · 92% 5-star
          </div>
        </div>
      </div>

      {/* New review card */}
      <div style={{
        marginTop:18,
        padding:'14px 16px', borderRadius:12,
        background: showNew ? 'rgba(79,208,173,0.10)' : 'rgba(255,255,255,0.03)',
        border:`1px solid ${showNew ? 'rgba(79,208,173,0.35)' : 'rgba(255,255,255,0.06)'}`,
        opacity: showNew ? 1 : 0.4,
        transform: showNew ? `translateY(${-4 * (1 - ratingAge)}px)` : 'none',
        transition:'all 0.5s',
      }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{
              width:30, height:30, borderRadius:'50%',
              background:BRAND.navy3, color:BRAND.ink,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:FONT_UI, fontSize:13, fontWeight:700,
            }}>T</div>
            <div style={{fontFamily:FONT_UI, fontSize:14, color:BRAND.ink, fontWeight:600}}>
              Tom B.
            </div>
            <div style={{display:'flex', gap:1}}>
              {[0,1,2,3,4].map(i => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={BRAND.teal}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
          <div style={{fontFamily:FONT_MONO, fontSize:11, color:BRAND.slateLt, letterSpacing:'0.08em'}}>
            Just now
          </div>
        </div>
        <div style={{fontFamily:FONT_UI, fontSize:13, color:BRAND.ink, lineHeight:1.5}}>
          "Called at 7 AM, fixed by lunch. Honest pricing and they walked me through what was wrong. Will use again."
        </div>
        {showNew && (
          <div style={{
            marginTop:10, fontFamily:FONT_MONO, fontSize:10, color:BRAND.teal,
            letterSpacing:'0.18em', textTransform:'uppercase', fontWeight:700,
          }}>
            ↑ Posted via T10 follow-up
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function RecoveryPanel() {
  const { localTime } = useSprite();
  const absT = localTime + 54.6;
  const cancelShown = absT > 60.6;
  const outreachShown = absT > 61.6;
  const filledShown = absT > 63.2;
  return (
    <GlassCard style={{width:520, padding:'24px 26px 26px'}}>
      <div style={{marginBottom:14}}>
        <Eyebrow size={12}>T09 · No-Show Recovery</Eyebrow>
      </div>
      <div style={{fontFamily:FONT_UI, fontSize:20, color:BRAND.ink, fontWeight:700, lineHeight:1.2, marginBottom:18}}>
        Thursday · 3:00 PM slot
      </div>

      <RecoveryStep
        state={cancelShown ? 'red' : 'idle'}
        icon="✕"
        title="Customer cancelled"
        sub="Reschedule conflict · 11 min ago"
      />
      <RecoveryStep
        state={outreachShown ? 'teal' : 'idle'}
        icon="↻"
        title="Outreach to waitlist"
        sub="3 nearby leads · auto-texted"
      />
      <RecoveryStep
        state={filledShown ? 'win' : 'idle'}
        icon="✓"
        title="Slot refilled"
        sub="Anders K · same-day install"
        last
      />
    </GlassCard>
  );
}

function RecoveryStep({ state, icon, title, sub, last }) {
  const colorMap = {
    idle:'#3a4a60', red:'#ff7a7a', teal:BRAND.teal, win:BRAND.teal,
  };
  const bgMap = {
    idle:'rgba(255,255,255,0.02)', red:'rgba(220,60,60,0.08)',
    teal:'rgba(79,208,173,0.08)', win:'rgba(79,208,173,0.14)',
  };
  const active = state !== 'idle';
  return (
    <div style={{
      display:'flex', alignItems:'flex-start', gap:14,
      padding:'12px 12px', borderRadius:10,
      background: bgMap[state],
      border: `1px solid ${active ? colorMap[state] + '55' : 'rgba(255,255,255,0.04)'}`,
      marginBottom: last ? 0 : 8,
      opacity: active ? 1 : 0.4,
      transition:'all 0.4s',
    }}>
      <div style={{
        width:28, height:28, borderRadius:'50%',
        background: active ? colorMap[state] : 'rgba(255,255,255,0.06)',
        color: active ? '#062014' : BRAND.slate,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:FONT_UI, fontSize:14, fontWeight:700, flexShrink:0,
      }}>
        {icon}
      </div>
      <div style={{flex:1}}>
        <div style={{fontFamily:FONT_UI, fontSize:14, color:BRAND.ink, fontWeight:600, lineHeight:1.2}}>
          {title}
        </div>
        <div style={{fontFamily:FONT_MONO, fontSize:11, color:BRAND.slateLt, marginTop:3, letterSpacing:'0.06em'}}>
          {sub}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Scenario4 });
