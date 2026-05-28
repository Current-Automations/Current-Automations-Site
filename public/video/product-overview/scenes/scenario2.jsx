// Scenario 2 — Missed-call text-back (25.4–38.4s)
// Beats: owner on a roof → SMS goes out in 60s → conversation → win chip

function Scenario2() {
  return (
    <Sprite start={25.4} end={38.4}>
      <div style={{position:'absolute', inset:0}}>
        <StageBG/>
      </div>

      <Sprite start={25.4} end={28.0}>
        <div style={{position:'absolute', left:120, top:120}}>
          <FadeIn duration={0.4}><Eyebrow>Scenario 02 · Daytime</Eyebrow></FadeIn>
          <FadeIn duration={0.5} delay={0.15}>
            <div style={{
              marginTop:20, fontFamily:FONT_DISPLAY, fontSize:72, color:BRAND.ink,
              letterSpacing:'-0.02em', fontWeight:400, lineHeight:1.05, maxWidth:1300,
            }}>
              You're under a sink. <span style={{color:BRAND.teal, fontStyle:'italic'}}>The lead can't wait.</span>
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.35}>
            <div style={{
              marginTop:18, fontFamily:FONT_UI, fontSize:22, color:BRAND.slateLt,
              maxWidth:820, lineHeight:1.45,
            }}>
              The call goes to voicemail. Within 60 seconds, Current is already on it.
            </div>
          </FadeIn>
        </div>
      </Sprite>

      <Sprite start={27.6} end={38.0}>
        <Scenario2Center/>
      </Sprite>

      <Sprite start={27.8} end={37.4}>
        <LowerThird scene="T01 + T02" label="Missed Call Text Back" tag="Speed-to-lead"/>
      </Sprite>

      <Sprite start={35.6} end={38.0}>
        <WinChip x={1340} y={840} label="Job booked" sub="3 min, 14 sec — total"/>
      </Sprite>
    </Sprite>
  );
}

function Scenario2Center() {
  return (
    <div style={{position:'absolute', inset:0}}>
      {/* Owner-side phone (SMS thread) */}
      <FadeIn duration={0.6}>
        <div style={{position:'absolute', left:1240, top:140}}>
          <PhoneFrame width={400} height={820}>
            <SMSThread/>
          </PhoneFrame>
        </div>
      </FadeIn>

      {/* Left: timeline of what's happening */}
      <FadeIn duration={0.6} delay={0.2}>
        <div style={{position:'absolute', left:180, top:200}}>
          <Scenario2Timeline/>
        </div>
      </FadeIn>
    </div>
  );
}

const smsEvents = [
  { side: 'in',  time: 28.0, text: "[Missed call] +1 905-555-0291" },
  { side: 'out', time: 28.6, text: "Hi — this is Mike at Northstar Mechanical. Sorry we missed you. What's going on and where are you located? We'll get right back.", system: true },
  { side: 'in',  time: 31.0, text: "Kitchen sink is leaking under the cabinet — water everywhere. I'm in Oakville." },
  { side: 'out', time: 32.8, text: "Got it. We can have someone there today between 2–4. Address?", system: true },
  { side: 'in',  time: 33.8, text: "118 Lakeshore W." },
  { side: 'out', time: 34.6, text: "Booked you for 2:30 PM with Dave. He'll text 20 min before. Sound good?", system: true },
  { side: 'in',  time: 35.2, text: "Perfect — thank you!" },
];

function SMSThread() {
  const { localTime } = useSprite();
  const absT = localTime + 27.6;
  return (
    <div style={{
      position:'absolute', inset:0,
      background:'#000',
      display:'flex', flexDirection:'column',
    }}>
      {/* Status bar */}
      <div style={{
        height:46, padding:'14px 26px 0',
        display:'flex', justifyContent:'space-between',
        fontFamily:FONT_UI, fontSize:14, fontWeight:600, color:'#fff',
      }}>
        <span>2:18</span>
        <span style={{fontSize:11}}>● ● ● ● ●</span>
      </div>
      {/* Header */}
      <div style={{
        padding:'8px 20px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column', alignItems:'center',
        fontFamily:FONT_UI, color:'#fff',
      }}>
        <div style={{
          width:44, height:44, borderRadius:'50%',
          background:`linear-gradient(135deg, ${BRAND.tealDk}, ${BRAND.teal})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:700, fontSize:16, color:'#062014', marginBottom:4,
        }}>
          MR
        </div>
        <div style={{fontSize:13, fontWeight:600}}>+1 (905) 555-0291</div>
        <div style={{fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:1}}>Customer</div>
      </div>
      {/* Messages */}
      <div style={{
        flex:1, padding:'14px 14px 14px',
        display:'flex', flexDirection:'column', gap:6,
        overflow:'hidden',
      }}>
        {smsEvents.map((m, i) => {
          if (absT < m.time) return null;
          const age = absT - m.time;
          const op = clamp(age / 0.35, 0, 1);
          const ty = (1 - op) * 10;
          if (m.text.startsWith('[Missed call]')) {
            return (
              <div key={i} style={{
                alignSelf:'center', padding:'6px 12px', borderRadius:8,
                background:'rgba(220,60,60,0.18)', color:'#ff9d9d',
                fontFamily:FONT_UI, fontSize:11, fontWeight:600,
                letterSpacing:'0.04em', margin:'4px 0',
                opacity:op, transform:`translateY(${ty}px)`,
              }}>
                ✕ Missed call · +1 (905) 555-0291
              </div>
            );
          }
          const isOut = m.side === 'out';
          return (
            <div key={i} style={{
              display:'flex', justifyContent: isOut ? 'flex-end' : 'flex-start',
              opacity:op, transform:`translateY(${ty}px)`,
            }}>
              <div style={{
                maxWidth:'82%',
                padding: isOut && m.system ? '18px 13px 9px' : '9px 13px',
                borderRadius:18,
                background: isOut
                  ? `linear-gradient(180deg, ${BRAND.teal} 0%, ${BRAND.tealDk} 100%)`
                  : 'rgba(255,255,255,0.10)',
                color: isOut ? '#062014' : '#fff',
                fontFamily:FONT_UI, fontSize:13.5, lineHeight:1.35,
                fontWeight: isOut ? 600 : 500,
                borderBottomRightRadius: isOut ? 6 : 18,
                borderBottomLeftRadius: isOut ? 18 : 6,
                position:'relative',
              }}>
                {m.text}
                {isOut && m.system && (
                  <div style={{
                    position:'absolute', top:5, right:8,
                    padding:'2px 6px', borderRadius:4,
                    background:'rgba(6,32,20,0.85)', color:BRAND.teal,
                    fontFamily:FONT_MONO, fontSize:8, fontWeight:700,
                    letterSpacing:'0.2em',
                  }}>
                    AUTO
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {/* Typing indicator when waiting for next outbound */}
        <TypingIndicator absT={absT} smsEvents={smsEvents}/>
      </div>
      {/* Input bar */}
      <div style={{
        padding:'8px 12px 14px', borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'flex', gap:8, alignItems:'center',
      }}>
        <div style={{
          flex:1, height:32, borderRadius:16,
          background:'rgba(255,255,255,0.08)',
          padding:'6px 12px', fontFamily:FONT_UI, fontSize:12,
          color:'rgba(255,255,255,0.4)', display:'flex', alignItems:'center',
        }}>
          iMessage
        </div>
      </div>
    </div>
  );
}

function TypingIndicator({ absT, smsEvents }) {
  // Show before the next outbound system message
  const next = smsEvents.find(m => m.side === 'out' && m.system && absT < m.time && absT > m.time - 0.9);
  if (!next) return null;
  return (
    <div style={{
      alignSelf:'flex-end',
      padding:'8px 12px', borderRadius:18,
      background:`linear-gradient(180deg, ${BRAND.teal} 0%, ${BRAND.tealDk} 100%)`,
      opacity:0.7,
      display:'flex', gap:4,
    }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:6, height:6, borderRadius:'50%',
          background:'#062014',
          opacity: 0.4 + 0.6 * Math.abs(Math.sin((absT + i * 0.2) * 4)),
        }}/>
      ))}
    </div>
  );
}

// Left-side timeline showing what the system is doing
function Scenario2Timeline() {
  const { localTime } = useSprite();
  const absT = localTime + 27.6;
  const events = [
    { t: 28.0,  label: 'Missed call detected', sub: '+1 905-555-0291 · 2:14 PM', tone:'warn' },
    { t: 28.6,  label: 'Automatic SMS sent',   sub: 'Template T01 · 14 sec after call', tone:'teal' },
    { t: 31.0,  label: 'Customer replied',     sub: 'Conversation routed', tone:'normal' },
    { t: 33.0,  label: 'Slot offered',         sub: 'Calendar checked · 2–4 PM open', tone:'teal' },
    { t: 35.0,  label: 'Booking confirmed',    sub: 'Dave assigned · CRM updated', tone:'teal' },
  ];
  return (
    <div style={{width:540}}>
      <div style={{marginBottom:18}}>
        <Eyebrow>Behind the scenes</Eyebrow>
      </div>
      <div style={{position:'relative', paddingLeft:52}}>
        <div style={{
          position:'absolute', left:9, top:8, bottom:8, width:2,
          background:'rgba(255,255,255,0.08)',
        }}/>
        <div style={{
          position:'absolute', left:9, top:8, width:2,
          height: `${clamp((absT - 28.0) / 7, 0, 1) * 100}%`,
          background: BRAND.teal,
          boxShadow:`0 0 12px ${BRAND.teal}`,
          transition:'height 0.3s',
        }}/>
        {events.map((e, i) => {
          const visible = absT >= e.t;
          const age = absT - e.t;
          const op = visible ? clamp(age / 0.4, 0, 1) : 0;
          const tx = (1 - op) * -12;
          const color = e.tone === 'teal' ? BRAND.teal : e.tone === 'warn' ? '#ffb47a' : BRAND.ink;
          return (
            <div key={i} style={{
              marginBottom:22, opacity:op, transform:`translateX(${tx}px)`,
              transition:'opacity 0.3s',
            }}>
              <div style={{
                position:'absolute', left:-44, marginTop:6, width:18, height:18, borderRadius:'50%',
                background:BRAND.base, border:`2px solid ${color}`,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{width:6, height:6, borderRadius:'50%', background:color}}/>
              </div>
              <div style={{
                fontFamily:FONT_UI, fontSize:20, fontWeight:600, color:BRAND.ink,
                lineHeight:1.2, marginBottom:3,
              }}>
                {e.label}
              </div>
              <div style={{
                fontFamily:FONT_MONO, fontSize:12, color:BRAND.slateLt,
                letterSpacing:'0.06em',
              }}>
                {e.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { Scenario2 });
