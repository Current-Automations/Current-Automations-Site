// Scenario 3 — Quote follow-up sequence (38.4–52.4s)
// Beats: quote went quiet → multi-touch sequence on a timeline → "Quote accepted"

function Scenario3() {
  return (
    <Sprite start={38.4} end={52.4}>
      <div style={{position:'absolute', inset:0}}>
        <StageBG/>
      </div>

      <Sprite start={38.4} end={41.0}>
        <div style={{position:'absolute', left:120, top:120}}>
          <FadeIn duration={0.4}><Eyebrow>Scenario 03 · Pipeline</Eyebrow></FadeIn>
          <FadeIn duration={0.5} delay={0.15}>
            <div style={{
              marginTop:20, fontFamily:FONT_DISPLAY, fontSize:72, color:BRAND.ink,
              letterSpacing:'-0.02em', fontWeight:400, lineHeight:1.05, maxWidth:1300,
            }}>
              Quote sent Tuesday. <span style={{color:BRAND.teal, fontStyle:'italic'}}>Crickets.</span>
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.35}>
            <div style={{
              marginTop:18, fontFamily:FONT_UI, fontSize:22, color:BRAND.slateLt,
              maxWidth:820, lineHeight:1.45,
            }}>
              The follow-up sequence runs itself. Polite, on-cadence, never pushy.
            </div>
          </FadeIn>
        </div>
      </Sprite>

      <Sprite start={40.6} end={52.0}>
        <Scenario3Center/>
      </Sprite>

      <Sprite start={40.8} end={51.4}>
        <LowerThird scene="T07 + T03" label="Quote Follow-Up Sequence" tag="Multi-touch nudge"/>
      </Sprite>

      <Sprite start={49.6} end={52.0}>
        <WinChip x={960} y={580} label="Quote accepted" sub="$8,420 — Roof replacement, deposit pending"/>
      </Sprite>
    </Sprite>
  );
}

function Scenario3Center() {
  return (
    <div style={{position:'absolute', inset:0}}>
      {/* Quote card on the left */}
      <FadeIn duration={0.5}>
        <div style={{position:'absolute', left:120, top:300}}>
          <QuoteCard/>
        </div>
      </FadeIn>
      {/* Sequence timeline on the right */}
      <FadeIn duration={0.5} delay={0.15}>
        <div style={{position:'absolute', left:720, top:240}}>
          <FollowUpTimeline/>
        </div>
      </FadeIn>
    </div>
  );
}

function QuoteCard() {
  const { localTime } = useSprite();
  const absT = localTime + 40.6;
  // Status pill flips to "Accepted" near the end
  const accepted = absT > 49.2;
  return (
    <GlassCard glow style={{width:560, padding:'28px 32px 30px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <div style={{
            fontFamily:FONT_MONO, fontSize:11, color:BRAND.slateLt,
            letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:6,
          }}>
            Quote #Q-4408
          </div>
          <div style={{fontFamily:FONT_UI, fontSize:24, color:BRAND.ink, fontWeight:700}}>
            Reilly Residence
          </div>
          <div style={{fontFamily:FONT_UI, fontSize:14, color:BRAND.slateLt, marginTop:3}}>
            Asphalt shingle replacement · 18 sq
          </div>
        </div>
        <div style={{
          padding:'6px 12px', borderRadius:999,
          background: accepted ? 'rgba(79,208,173,0.18)' : 'rgba(255,180,122,0.14)',
          border:`1px solid ${accepted ? 'rgba(79,208,173,0.4)' : 'rgba(255,180,122,0.3)'}`,
          color: accepted ? BRAND.teal : '#ffb47a',
          fontFamily:FONT_UI, fontSize:11, fontWeight:700,
          letterSpacing:'0.16em', textTransform:'uppercase',
          transition:'all 0.4s',
        }}>
          {accepted ? '✓ Accepted' : 'Awaiting reply'}
        </div>
      </div>

      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:18}}>
        <QuoteLine label="Tear-off & disposal" value="$1,840"/>
        <QuoteLine label="Materials — 30yr architectural" value="$3,260"/>
        <QuoteLine label="Labour · 2 crew · 3 days" value="$2,950"/>
        <QuoteLine label="Permits & site cleanup" value="$370"/>
      </div>

      <div style={{
        borderTop:`1px solid ${BRAND.rule}`,
        marginTop:14, paddingTop:14,
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
      }}>
        <div style={{fontFamily:FONT_UI, fontSize:14, color:BRAND.slateLt, letterSpacing:'0.04em', textTransform:'uppercase'}}>
          Total · GST in
        </div>
        <div style={{fontFamily:FONT_DISPLAY, fontSize:46, color:BRAND.ink, fontWeight:500, letterSpacing:'-0.02em'}}>
          $8,420
        </div>
      </div>

      <div style={{
        marginTop:16, padding:'10px 14px', borderRadius:10,
        background:'rgba(255,255,255,0.03)',
        border:'1px solid rgba(255,255,255,0.05)',
        fontFamily:FONT_MONO, fontSize:11, color:BRAND.slateLt,
        letterSpacing:'0.06em',
      }}>
        Sent <span style={{color:BRAND.ink}}>Tue, 9:14 AM</span> · Opened <span style={{color:BRAND.ink}}>3×</span> · No reply
      </div>
    </GlassCard>
  );
}

function QuoteLine({ label, value }) {
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', padding:'8px 0',
      fontFamily:FONT_UI, fontSize:15,
    }}>
      <span style={{color:BRAND.slateLt}}>{label}</span>
      <span style={{color:BRAND.ink, fontFamily:FONT_MONO, fontSize:14}}>{value}</span>
    </div>
  );
}

const touches = [
  { day:'Day 2', t: 41.4, kind:'SMS',   title:'Friendly nudge',    body:'Hi Margaret — wanted to check if you had any questions on the roof quote? Happy to walk through it.', auto:true },
  { day:'Day 4', t: 43.4, kind:'Email', title:'Value follow-up',   body:'Subject: Materials lock-in for Q3 — and our 10-year workmanship warranty', auto:true },
  { day:'Day 7', t: 45.8, kind:'SMS',   title:'Soft deadline',     body:'We can still hold our current pricing through Friday. Want me to pencil you in for next week?', auto:true },
  { day:'Day 10',t: 48.0, kind:'Email', title:'Last gentle check', body:'Subject: Should I close this one out, or do you want to chat?', auto:true },
  { day:'Day 10',t: 49.4, kind:'Reply', title:'Margaret replied',  body:'"Yes — let\'s book it. When can you start?"', auto:false, win:true },
];

function FollowUpTimeline() {
  const { localTime } = useSprite();
  const absT = localTime + 40.6;
  return (
    <GlassCard style={{width:1080, padding:'26px 30px 30px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22}}>
        <div>
          <Eyebrow size={12}>Follow-Up Sequence · T07</Eyebrow>
        </div>
        <div style={{display:'flex', gap:8}}>
          <PillBadge size={11} tone="muted">Auto-paced</PillBadge>
          <PillBadge size={11}>Never on weekends</PillBadge>
        </div>
      </div>

      <div style={{position:'relative', paddingTop:36, paddingBottom:8}}>
        {/* Track */}
        <div style={{
          position:'absolute', left:0, right:0, top:60, height:2,
          background:'rgba(255,255,255,0.08)',
        }}/>
        <div style={{
          position:'absolute', left:0, top:60, height:2,
          width: `${clamp((absT - 41.0) / 8.5, 0, 1) * 100}%`,
          background:BRAND.teal,
          boxShadow:`0 0 10px ${BRAND.teal}`,
        }}/>
        <div style={{
          display:'grid', gridTemplateColumns:`repeat(${touches.length}, 1fr)`, gap:14,
        }}>
          {touches.map((tch, i) => {
            const visible = absT >= tch.t;
            const age = absT - tch.t;
            const op = visible ? clamp(age / 0.4, 0, 1) : 0.12;
            const ty = visible ? (1 - clamp(age / 0.4, 0, 1)) * 10 : 0;
            const isWin = tch.win;
            return (
              <div key={i} style={{
                opacity: visible ? 1 : 0.35, transform:`translateY(${ty}px)`,
                transition:'opacity 0.3s',
              }}>
                {/* Day label above the track */}
                <div style={{
                  fontFamily:FONT_MONO, fontSize:11, color: visible ? BRAND.teal : BRAND.slate,
                  letterSpacing:'0.2em', textAlign:'center', marginBottom:6,
                }}>
                  {tch.day}
                </div>
                {/* Dot on track */}
                <div style={{
                  width:18, height:18, borderRadius:'50%',
                  background: isWin ? BRAND.teal : (visible ? BRAND.teal : BRAND.navy3),
                  margin:'0 auto',
                  boxShadow: visible ? `0 0 0 4px rgba(79,208,173,0.18)` : 'none',
                  border: visible ? 'none' : '2px solid rgba(255,255,255,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {isWin && visible && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#062014" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                {/* Card below */}
                <div style={{
                  marginTop:14,
                  padding:'12px 14px', borderRadius:12,
                  background: isWin ? 'rgba(79,208,173,0.10)' : 'rgba(255,255,255,0.03)',
                  border:`1px solid ${isWin ? 'rgba(79,208,173,0.35)' : 'rgba(255,255,255,0.06)'}`,
                  minHeight:130,
                }}>
                  <div style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    marginBottom:8,
                  }}>
                    <div style={{
                      fontFamily:FONT_MONO, fontSize:9, fontWeight:700,
                      letterSpacing:'0.2em', color:isWin ? BRAND.teal : BRAND.slateLt,
                      textTransform:'uppercase',
                    }}>
                      {tch.kind}
                    </div>
                    {tch.auto && (
                      <div style={{
                        fontFamily:FONT_MONO, fontSize:8, color:BRAND.teal,
                        background:'rgba(79,208,173,0.12)',
                        padding:'2px 5px', borderRadius:3,
                        letterSpacing:'0.2em', fontWeight:700,
                      }}>
                        AUTO
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontFamily:FONT_UI, fontSize:13, color:BRAND.ink, fontWeight:600,
                    marginBottom:5, lineHeight:1.25,
                  }}>
                    {tch.title}
                  </div>
                  <div style={{
                    fontFamily:FONT_UI, fontSize:11, color:BRAND.slateLt, lineHeight:1.4,
                    fontStyle: isWin ? 'italic' : 'normal',
                  }}>
                    {tch.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

Object.assign(window, { Scenario3 });
