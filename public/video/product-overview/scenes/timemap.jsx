// TimeMap — wraps children in a remapped TimelineContext so the
// existing scene components (which use absolute master-timeline times)
// can be played back as cut-downs without touching them.
//
// Usage:
//   <TimeMap segments={[
//     { from: 0,  to: 6,  innerFrom: 9.4,  innerTo: 11.4 }, // stat reveal
//     { from: 6,  to: 19, innerFrom: 25.4, innerTo: 38.4 }, // S2
//     { from: 19, to: 26, innerFrom: 80.0, innerTo: 87.0 }, // CTA
//     { from: 26, to: 30, innerFrom: 86.5, innerTo: 86.99 }, // CTA hold
//   ]}>
//     <Movie />
//   </TimeMap>

function TimeMap({ segments, masterDuration = 87, children }) {
  const outer = React.useContext(TimelineContext);
  const outerT = outer.time;

  // Find which segment contains outerT; remap to inner.
  let inner = -1; // -1 = before everything (renders nothing)
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    if (outerT >= s.from && outerT <= s.to) {
      const span = s.to - s.from;
      const local = span <= 0 ? 0 : (outerT - s.from) / span;
      inner = s.innerFrom + local * (s.innerTo - s.innerFrom);
      break;
    }
    // Past this segment but before the next? park briefly at innerTo
    if (outerT > s.to && (i === segments.length - 1 || outerT < segments[i + 1].from)) {
      inner = s.innerTo - 0.001;
    }
  }

  // Before any segment: park well outside any Sprite window so nothing renders.
  if (inner < 0) inner = -10;

  const value = React.useMemo(
    () => ({ ...outer, time: inner, duration: masterDuration }),
    [outer, inner, masterDuration]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

// CutProgressBar — like ProgressBar from the master, but stripped down.
// Shows the OUTER (cut) timeline; markers are passed in.
function CutProgressBar({ duration, markers = [], label = 'Current Automations' }) {
  const t = useTime();
  const pct = clamp(t / duration, 0, 1) * 100;
  return (
    <div style={{
      position:'absolute', left:120, right:120, top:60, zIndex:50,
      display:'flex', alignItems:'center', gap:18,
      fontFamily:FONT_MONO, fontSize:11, color:'rgba(140,240,224,0.55)',
      letterSpacing:'0.18em', textTransform:'uppercase',
      pointerEvents:'none',
    }}>
      <span style={{color:BRAND.crest}}>● {label}</span>
      <div style={{flex:1, position:'relative', height:2, background:'rgba(255,255,255,0.08)'}}>
        <div style={{
          position:'absolute', left:0, top:0, bottom:0,
          width:`${pct}%`,
          background:BRAND.wave,
        }}/>
        {markers.map((m, i) => (
          <div key={i} style={{
            position:'absolute', left:`${(m.t / duration) * 100}%`,
            top:-2, width:1, height:6,
            background: t > m.t ? BRAND.crest : 'rgba(255,255,255,0.2)',
          }}/>
        ))}
      </div>
      <span>{String(Math.floor(t)).padStart(2,'0')}<span style={{opacity:0.4}}> / {Math.ceil(duration)}s</span></span>
    </div>
  );
}

Object.assign(window, { TimeMap, CutProgressBar });
