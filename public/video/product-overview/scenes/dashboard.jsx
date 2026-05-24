// Scene 5 — Closing system view (65.4–80.0s)
// Pull back: it's all one system. Weekly ROI dashboard in navy/teal.

function DashboardScene() {
  return (
    <Sprite start={65.4} end={80.0}>
      <div style={{position:'absolute', inset:0}}>
        <StageBG/>
      </div>

      <Sprite start={65.4} end={67.6}>
        <div style={{position:'absolute', left:120, top:160}}>
          <FadeIn duration={0.4}><Eyebrow>The full picture · T11</Eyebrow></FadeIn>
          <FadeIn duration={0.5} delay={0.15}>
            <div style={{
              marginTop:24, fontFamily:FONT_DISPLAY, fontSize:88, color:BRAND.ink,
              letterSpacing:'-0.02em', fontWeight:500, lineHeight:1.05, maxWidth:1500,
            }}>
              One system, <span style={{
                background:BRAND.wave, WebkitBackgroundClip:'text', backgroundClip:'text',
                color:'transparent',
              }}>running your front office.</span>
            </div>
          </FadeIn>
          <FadeIn duration={0.5} delay={0.35}>
            <div style={{
              marginTop:22, fontFamily:FONT_UI, fontSize:24, color:BRAND.ink50,
              maxWidth:820, lineHeight:1.45,
            }}>
              Every Friday morning, in plain English. No dashboards to log into.
            </div>
          </FadeIn>
        </div>
      </Sprite>

      <Sprite start={67.6} end={79.6}>
        <DashboardCard/>
      </Sprite>
    </Sprite>
  );
}

function DashboardCard() {
  const { localTime } = useSprite();
  // All metric count-ups and the sparkline draw finish by ~2.3s.
  // Cap t here so memoized children receive a stable value and skip
  // re-rendering for the remainder of the scene (avoids per-frame
  // DOM churn on ~6 BigMetrics + SVG sparkline while nothing moves).
  const ANIM_DONE = 2.3;
  const t = Math.min(localTime, ANIM_DONE);
  return (
    <div style={{position:'absolute', left:120, top:140}}>
      <FadeIn duration={0.6}>
        <GlassCard glow style={{width:1680, padding:'34px 40px 36px'}}>
          {/* Header */}
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            paddingBottom:22, borderBottom:`1px solid ${BRAND.rule}`,
          }}>
            <div style={{display:'flex', alignItems:'center', gap:16}}>
              <LogoMark size={44}/>
              <div>
                <div style={{
                  fontFamily:FONT_MONO, fontSize:11, color:BRAND.crest,
                  letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:4,
                }}>
                  Weekly ROI · T11 · Northstar Mechanical <span style={{color:'rgba(140,240,224,0.55)', marginLeft:8}}>· sample week</span>
                </div>
                <div style={{fontFamily:FONT_DISPLAY, fontSize:30, color:BRAND.ink, fontWeight:600, letterSpacing:'-0.01em'}}>
                  Week of May 18 — 24, 2026
                </div>
              </div>
            </div>
            <div style={{display:'flex', gap:10}}>
              <PillBadge>Concept demo</PillBadge>
              <PillBadge tone="muted">Auto-delivered Fri 7AM</PillBadge>
              <PillBadge tone="muted">SMS · Email · PDF</PillBadge>
            </div>
          </div>

          {/* Big metrics row */}
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:24,
            paddingTop:26, paddingBottom:26,
          }}>
            <BigMetric label="Leads captured"  value={47}  delta="+12" delay={0.2} t={t}/>
            <BigMetric label="After-hours calls answered" value={9} delta="+9" delay={0.35} t={t}/>
            <BigMetric label="Quotes followed up" value={31} delta="+6" delay={0.5} t={t}/>
            <BigMetric label="Jobs recovered"   value={4}   delta="+2" delay={0.65} t={t}/>
            <BigMetric label="Reviews collected" value={12} delta="+12" delay={0.8} t={t}/>
            <BigMetric label="Pipeline influenced" value="$19.4k" isMoney delta="+$5.2k" delay={0.95} t={t}/>
          </div>

          {/* Bottom row — sparkline + plain-English summary */}
          <div style={{
            display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:30,
            paddingTop:24, borderTop:`1px solid ${BRAND.ruleSoft}`,
          }}>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14}}>
                <div style={{
                  fontFamily:FONT_MONO, fontSize:11, color:BRAND.ink50,
                  letterSpacing:'0.18em', textTransform:'uppercase',
                }}>
                  This week · Lead activity
                </div>
                <div style={{fontFamily:FONT_MONO, fontSize:11, color:BRAND.ink50, letterSpacing:'0.06em'}}>
                  MON · TUE · WED · THU · FRI · SAT · SUN
                </div>
              </div>
              <Sparkline t={localTime}/>
              <div style={{
                marginTop:14, display:'flex', gap:22,
                fontFamily:FONT_MONO, fontSize:11, color:BRAND.ink50, letterSpacing:'0.08em',
              }}>
                <LegendDot color={BRAND.crest} label="Leads in"/>
                <LegendDot color={BRAND.blue} label="Jobs booked"/>
                <LegendDot color={BRAND.tealMid} label="Quotes accepted"/>
              </div>
            </div>

            <div style={{
              padding:'18px 22px', borderRadius:14,
              background:'rgba(140,240,224,0.05)',
              border:`1px solid ${BRAND.ruleSoft}`,
            }}>
              <div style={{
                fontFamily:FONT_MONO, fontSize:11, color:BRAND.crest,
                letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:10,
              }}>
                Your weekly note
              </div>
              <div style={{fontFamily:FONT_UI, fontSize:16, color:BRAND.ink80, lineHeight:1.5}}>
                Here's how a week could look, Mike. In this sample, <span style={{color:BRAND.ink, fontWeight:600}}>9 calls</span> were answered after hours that would've gone to voicemail — 4 of those booked. The missed-call text-back caught a <span style={{color:BRAND.ink, fontWeight:600}}>$2,940 sink repair</span> Wednesday morning. The Reilly roof quote (Q-4408) closed at <span style={{color:BRAND.crest, fontWeight:600}}>$8,420</span> after the day-10 nudge.
                <br/><br/>
                Two recovered no-shows put booked hours up <span style={{color:BRAND.crest, fontWeight:600}}>11% vs last week</span>.
              </div>
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}

const BigMetric = React.memo(function BigMetric({ label, value, delta, isMoney, delay = 0, t = 0 }) {
  const visible = t > delay;
  const age = t - delay;
  const op = clamp(age / 0.5, 0, 1);
  const ty = (1 - op) * 14;
  // Count up
  const countT = clamp(age / 1.2, 0, 1);
  let display = value;
  if (!isMoney && typeof value === 'number') {
    display = Math.round(value * Easing.easeOutCubic(countT));
  } else if (isMoney) {
    const num = parseFloat(String(value).replace(/[^0-9.]/g,''));
    const eased = num * Easing.easeOutCubic(countT);
    display = '$' + eased.toFixed(1) + 'k';
  }
  return (
    <div style={{
      opacity: visible ? op : 0,
      transform:`translateY(${ty}px)`,
    }}>
      <div style={{
        fontFamily:FONT_MONO, fontSize:10, color:BRAND.ink50,
        letterSpacing:'0.20em', textTransform:'uppercase', marginBottom:10,
        lineHeight:1.3, minHeight:26,
      }}>
        {label}
      </div>
      <div style={{display:'flex', alignItems:'baseline', gap:10}}>
        <div style={{
          fontFamily:FONT_DISPLAY, fontSize:54, color:BRAND.ink, fontWeight:500,
          letterSpacing:'-0.03em', lineHeight:1,
        }}>
          {display}
        </div>
        <div style={{
          fontFamily:FONT_MONO, fontSize:12, color:BRAND.teal,
          fontWeight:600, letterSpacing:'0.04em',
          padding:'3px 7px', borderRadius:5,
          background:'rgba(93,214,203,0.10)',
        }}>
          ↑ {delta}
        </div>
      </div>
    </div>
  );
});

const Sparkline = React.memo(function Sparkline({ t = 0 }) {
  // 7 days of data, 3 series
  const days = 7;
  const w = 940, h = 130;
  const series = [
    { color: BRAND.crest,   data: [4, 6, 5, 8, 10, 7, 7]   }, // leads in
    { color: BRAND.blue,    data: [2, 3, 4, 5, 6, 4, 5]    }, // jobs booked
    { color: BRAND.tealMid, data: [1, 2, 3, 3, 5, 4, 6]    }, // quotes accepted
  ];
  const max = 10;
  const pathFor = (data) => {
    const stepX = w / (days - 1);
    let d = '';
    data.forEach((v, i) => {
      const x = i * stepX;
      const y = h - 20 - (v / max) * (h - 30);
      d += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
    });
    return d;
  };
  // Stroke-dashoffset draw-on animation
  const drawProgress = clamp((t - 0.4) / 1.6, 0, 1);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block'}}>
      {/* baseline */}
      <line x1={0} x2={w} y1={h-20} y2={h-20} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4"/>
      {series.map((s, i) => {
        const pathLen = 1400;
        return (
          <g key={i}>
            <path d={pathFor(s.data)} stroke={s.color} strokeWidth={2.5} fill="none"
                  strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray={pathLen}
                  strokeDashoffset={pathLen * (1 - drawProgress)}/>
            {/* dots */}
            {s.data.map((v, j) => {
              const stepX = w / (days - 1);
              const x = j * stepX;
              const y = h - 20 - (v / max) * (h - 30);
              const dotT = clamp((drawProgress * 7) - j, 0, 1);
              return (
                <circle key={j} cx={x} cy={y} r={3.5 * dotT}
                        fill={BRAND.deep} stroke={s.color} strokeWidth={1.5}/>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
});

function LegendDot({ color, label }) {
  return (
    <span style={{display:'inline-flex', alignItems:'center', gap:7}}>
      <span style={{width:10, height:10, borderRadius:'50%', background:color, boxShadow:`0 0 8px ${color}88`}}/>
      <span style={{textTransform:'uppercase'}}>{label}</span>
    </span>
  );
}

Object.assign(window, { DashboardScene });
