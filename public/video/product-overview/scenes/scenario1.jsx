// Scenario 1 — After-hours AI receptionist (11.4–25s)
// Beats: problem (off the clock) → automation (AI call + transcript) → win (booked)

function Scenario1() {
  return (
    <Sprite start={11.4} end={25.4}>
      <div style={{position:'absolute', inset:0}}>
        <StageBG/>
      </div>

      {/* Scene label */}
      <Sprite start={11.4} end={13.4}>
        <div style={{position:'absolute', left:120, top:120}}>
          <FadeIn duration={0.4}><Eyebrow>Scenario 01 · After hours</Eyebrow></FadeIn>
          <FadeIn duration={0.5} delay={0.15}>
            <div style={{
              marginTop:20,
              fontFamily:FONT_DISPLAY, fontSize:72, color:BRAND.ink,
              letterSpacing:'-0.02em', fontWeight:400, lineHeight:1.05,
              maxWidth:1100,
            }}>
              8:14&nbsp;PM. The phone rings <span style={{color:BRAND.teal, fontStyle:'italic'}}>after</span> you've clocked off.
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.35}>
            <div style={{
              marginTop:18, fontFamily:FONT_UI, fontSize:22, color:BRAND.slateLt,
              maxWidth:780, lineHeight:1.45,
            }}>
              A homeowner has no heat. They're not waiting until morning — they're calling the next number on the list.
            </div>
          </FadeIn>
        </div>
      </Sprite>

      {/* Phone + live call transcript */}
      <Sprite start={13.4} end={25.0}>
        <Scenario1Center/>
      </Sprite>

      {/* Lower third */}
      <Sprite start={13.8} end={24.4}>
        <LowerThird scene="T05" label="Inbound AI Call Handling" tag="After-hours receptionist"/>
      </Sprite>

      {/* Win chip */}
      <Sprite start={22.6} end={25.0}>
        <WinChip x={1180} y={920} label="Appointment booked" sub="Wed · 8:00 AM · No heat — emergency"/>
      </Sprite>
    </Sprite>
  );
}

function Scenario1Center() {
  return (
    <div style={{position:'absolute', inset:0}}>
      {/* Phone, left of center */}
      <FadeIn duration={0.6}>
        <div style={{position:'absolute', left:380, top:200}}>
          <PhoneFrame width={360} height={720}>
            <Scenario1PhoneUI/>
          </PhoneFrame>
        </div>
      </FadeIn>

      {/* Transcript panel, right */}
      <FadeIn duration={0.6} delay={0.2}>
        <div style={{position:'absolute', left:830, top:200}}>
          <TranscriptPanel/>
        </div>
      </FadeIn>
    </div>
  );
}

function Scenario1PhoneUI() {
  const { localTime } = useSprite();
  // Pulse the "on-call" ring
  const pulse = 0.5 + 0.5 * Math.sin(localTime * 3);
  return (
    <div style={{
      position:'absolute', inset:0,
      background:`linear-gradient(180deg, ${BRAND.navy1} 0%, ${BRAND.base} 100%)`,
      display:'flex', flexDirection:'column', alignItems:'center',
      padding:'70px 24px 28px', color:BRAND.ink, fontFamily:FONT_UI,
    }}>
      <div style={{fontSize:12, color:BRAND.teal, letterSpacing:'0.24em', textTransform:'uppercase', marginBottom:14}}>
        Current · Live call
      </div>
      <div style={{marginBottom:18}}>
        <div style={{
          width:120, height:120, borderRadius:'50%',
          background:`linear-gradient(135deg, ${BRAND.tealDk}, ${BRAND.teal})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 0 16px rgba(93,214,203,${(0.08 + pulse * 0.18).toFixed(2)}), 0 0 32px rgba(93,214,203,${(0.12 + pulse * 0.15).toFixed(2)})`,
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Waveform */}
            <path d="M8 24 Q14 18 20 24 T32 24 T44 24" stroke="#062014" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M10 28 Q16 22 22 28 T34 28" stroke="#062014" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
          </svg>
        </div>
      </div>
      <div style={{fontSize:22, fontWeight:700, marginBottom:4}}>Receptionist</div>
      <div style={{fontSize:13, color:BRAND.slateLt, marginBottom:28, letterSpacing:'0.04em'}}>
        Connected · {Math.floor(localTime / 60).toString().padStart(2,'0')}:{Math.floor(localTime % 60).toString().padStart(2,'0')}
      </div>

      <div style={{
        width:'100%', padding:'14px 16px', borderRadius:12,
        background:'rgba(255,255,255,0.07)',
        fontSize:13, color:BRAND.slateLt, marginBottom:10,
      }}>
        <div style={{color:BRAND.teal, fontWeight:600, marginBottom:4, fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase'}}>Caller</div>
        Margaret R · Mississauga, ON
      </div>
      <div style={{
        width:'100%', padding:'14px 16px', borderRadius:12,
        background:'rgba(79,208,173,0.12)',
        fontSize:13, color:BRAND.ink,
      }}>
        <div style={{color:BRAND.teal, fontWeight:600, marginBottom:4, fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase'}}>Detected</div>
        Emergency · No heat · Furnace
      </div>

      <div style={{flex:1}}/>

      <div style={{
        width:'100%', display:'flex', justifyContent:'center', gap:16,
        padding:'10px 0',
      }}>
        <div style={{width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,0.08)'}}/>
        <div style={{width:56, height:56, borderRadius:'50%', background:'#d63c3c'}}/>
        <div style={{width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,0.08)'}}/>
      </div>
    </div>
  );
}

const transcript = [
  { who: 'AI',     time: 13.8, text: "Thanks for calling Northstar Mechanical — how can I help tonight?" },
  { who: 'Caller', time: 15.2, text: "Hi, my furnace just stopped. The house is freezing." },
  { who: 'AI',     time: 16.7, text: "I'm sorry to hear that. Can I get your name and the address?" },
  { who: 'Caller', time: 18.0, text: "Margaret Reilly — 42 Oakridge Lane, Mississauga." },
  { who: 'AI',     time: 19.3, text: "Got it. I'm flagging this as an emergency. Earliest is tomorrow 8 AM — does that work?" },
  { who: 'Caller', time: 20.8, text: "Yes please. That'd be a relief." },
  { who: 'AI',     time: 22.0, text: "Booked. You'll get a confirmation text in a moment." },
];

function TranscriptPanel() {
  const { localTime } = useSprite();
  const absoluteTime = localTime + 13.4;
  return (
    <GlassCard glow style={{width:700, padding:'28px 32px 32px'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:8, height:8, borderRadius:'50%', background:BRAND.teal, boxShadow:`0 0 8px ${BRAND.teal}`}}/>
          <div style={{fontFamily:FONT_UI, fontSize:14, color:BRAND.ink, fontWeight:600, letterSpacing:'0.04em'}}>
            Live transcript
          </div>
        </div>
        <PillBadge size={12}>T05 · After-hours</PillBadge>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14, minHeight:380}}>
        {transcript.map((m, i) => {
          if (absoluteTime < m.time) return null;
          const age = absoluteTime - m.time;
          const opacity = clamp(age / 0.4, 0, 1);
          const ty = (1 - clamp(age / 0.4, 0, 1)) * 8;
          const isAI = m.who === 'AI';
          return (
            <div key={i} style={{
              display:'flex', justifyContent: isAI ? 'flex-start' : 'flex-end',
              opacity, transform:`translateY(${ty}px)`,
            }}>
              <div style={{maxWidth:'78%'}}>
                <div style={{
                  fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.2em',
                  color: isAI ? BRAND.teal : BRAND.slateLt,
                  marginBottom:5, textAlign: isAI ? 'left' : 'right',
                }}>
                  {isAI ? 'AI · Current' : 'Caller'}
                </div>
                <div style={{
                  padding:'12px 16px', borderRadius:14,
                  background: isAI ? 'rgba(79,208,173,0.14)' : 'rgba(255,255,255,0.07)',
                  color: BRAND.ink, fontFamily:FONT_UI, fontSize:16, lineHeight:1.4,
                  borderBottomLeftRadius: isAI ? 4 : 14,
                  borderBottomRightRadius: isAI ? 14 : 4,
                }}>
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capture fields */}
      <div style={{
        marginTop:22, paddingTop:20,
        borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:14,
      }}>
        <CaptureField label="Name" value="Margaret Reilly" show={absoluteTime > 18.4}/>
        <CaptureField label="Address" value="42 Oakridge Ln, Mississauga" show={absoluteTime > 19.0}/>
        <CaptureField label="Issue" value="No heat — furnace" show={absoluteTime > 19.6}/>
        <CaptureField label="Urgency" value="Emergency" tone="warn" show={absoluteTime > 19.9}/>
        <CaptureField label="Slot" value="Wed · 8:00 AM" tone="teal" show={absoluteTime > 22.2} wide/>
      </div>
    </GlassCard>
  );
}

function CaptureField({ label, value, show, tone, wide }) {
  const opacity = show ? 1 : 0.15;
  const color = tone === 'teal' ? BRAND.teal : tone === 'warn' ? '#ffb47a' : BRAND.ink;
  return (
    <div style={{
      gridColumn: wide ? 'span 2' : 'span 1',
      padding:'10px 14px', borderRadius:10,
      background:'rgba(255,255,255,0.03)',
      border:`1px solid ${tone === 'teal' ? 'rgba(79,208,173,0.35)' : 'rgba(255,255,255,0.06)'}`,
      opacity, transition:'opacity 0.3s',
    }}>
      <div style={{
        fontFamily:FONT_MONO, fontSize:10, letterSpacing:'0.2em',
        color:BRAND.slateLt, textTransform:'uppercase', marginBottom:3,
      }}>
        {label}
      </div>
      <div style={{fontFamily:FONT_UI, fontSize:15, color, fontWeight:600}}>
        {show ? value : '—'}
      </div>
    </div>
  );
}

Object.assign(window, { Scenario1 });
