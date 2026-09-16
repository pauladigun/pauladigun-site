import { useState, useEffect, useRef } from "react";

var NPJ = "https://doi.org/10.1038/s44406-026-00027-7";
var PHYS = "https://doi.org/10.1016/j.renene.2025.124658";
var SCHOLAR = "https://scholar.google.com/citations?user=7uxmezsAAAAJ&hl=en";

// Items the Google Scholar sync misses (e.g. conference talks). One line each:
// { title: "...", journal: "Conference name", year: 2025, link: "https://..." },
var MANUAL = [
];

var EXCLUDE = ["covid"];

var POOLS = [
  { id: "COMELEC", name: "Maghreb Electricity Committee", region: "North Africa", cx: 205, cy: 70, desc: "The continent's sunniest region, where solar is already central to energy planning." },
  { id: "WAPP", name: "West African Power Pool", region: "West Africa", cx: 95, cy: 165, desc: "Monsoon cloud and Harmattan dust strongly shape how much sunlight reaches solar farms." },
  { id: "EAPP", name: "Eastern Africa Power Pool", region: "Eastern Africa", cx: 310, cy: 175, desc: "Stretching from the Nile basin to the Horn, with fast-growing solar ambitions." },
  { id: "CAPP", name: "Central African Power Pool", region: "Central Africa", cx: 190, cy: 240, desc: "Persistent convective cloud makes solar output here especially variable." },
  { id: "SAPP", name: "Southern African Power Pool", region: "Southern Africa", cx: 240, cy: 335, desc: "The most interconnected pool on the continent, with some of its strongest solar resources." }
];

// Each paper is placed in the FIRST theme whose keywords match its title.
var THEMES = [
  { id: "ml", icon: "\uD83E\uDDE0", title: "Physics-constrained ML & downscaling", text: "Machine learning that respects atmospheric physics to correct and downscale climate models.", keys: ["physics-constrained", "deep learning", "downscaling", "neural network", "bias adjusted", "bias correction"] },
  { id: "drought", icon: "\uD83C\uDFDC\uFE0F", title: "Drought & water stress", text: "Drought persistence, evaporative demand and drought risk across Africa and beyond.", keys: ["drought", "evapotranspiration", "evaporative"] },
  { id: "energy", icon: "\u2600\uFE0F", title: "Solar & wind energy in a changing climate", text: "How climate change reshapes Africa's solar and wind resources and power systems.", keys: ["photovoltaic", "solar", "wind energy", "power pool"] },
  { id: "extremes", icon: "\uD83D\uDD25", title: "Heat, rainfall & compound extremes", text: "Heatwaves, extreme precipitation, aerosol effects and co-occurring hot\u2013dry extremes.", keys: ["heatwave", "compound", "precipitation", "temperature", "rainfall"] },
  { id: "tc", icon: "\uD83C\uDF00", title: "Tropical cyclones", text: "PhyConML: physics-constrained machine learning for tropical cyclone intensity using dynamical-systems metrics.", keys: ["cyclone", "typhoon", "hurricane"] }
];

var METHODS = ["Physics-constrained deep learning", "CMIP6 bias correction", "Statistical & deep-learning downscaling", "Solar & wind meteorology", "Drought & compound extremes", "Tropical cyclone dynamics"];

function useReveal() {
  var ref = useRef(null);
  var s = useState(false), shown = s[0], setShown = s[1];
  useEffect(function () {
    var el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setShown(true); return; }
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return function () { io.disconnect(); };
  }, []);
  return [ref, shown];
}

function Section(props) {
  var r = useReveal();
  return (
    <section id={props.id} ref={r[0]} className={"rx-sec" + (props.dark ? " rx-dark" : "") + (props.soft ? " rx-soft" : "") + (r[1] ? " rx-in" : "")}>
      <div className="rx-wrap">
        <div className="rx-kicker">{props.kicker}</div>
        <h2 className="rx-h2">{props.title}</h2>
        {props.intro && <p className="rx-intro">{props.intro}</p>}
        {props.children}
      </div>
    </section>
  );
}

function PowerPools() {
  var s = useState("WAPP"), sel = s[0], setSel = s[1];
  var cur = POOLS.find(function (p) { return p.id === sel; });
  var pairs = [];
  POOLS.forEach(function (a, i) { POOLS.slice(i + 1).forEach(function (b) { pairs.push([a, b]); }); });
  return (
    <Section id="power-pools" dark kicker={"Interactive \u00b7 Power-pool explorer"} title="Five grids, one shared sky" intro="Select a pool to see its solar climate and why simultaneous shortfalls across pools matter.">
      <div className="rx-pp">
        <svg viewBox="0 0 400 400" className="rx-pp-map" role="img" aria-label="Africa's five regional power pools and the links between them">
          {pairs.map(function (pr, i) {
            var on = pr[0].id === sel || pr[1].id === sel;
            return <line key={i} x1={pr[0].cx} y1={pr[0].cy} x2={pr[1].cx} y2={pr[1].cy} className={"rx-link" + (on ? " on" : "")} />;
          })}
          {POOLS.map(function (p) {
            var on = p.id === sel;
            var pick = function () { setSel(p.id); };
            return (
              <g key={p.id} className={"rx-node" + (on ? " on" : "")} tabIndex={0} onMouseEnter={pick} onFocus={pick} onClick={pick}>
                <circle cx={p.cx} cy={p.cy} r={30} className="rx-halo" />
                <circle cx={p.cx} cy={p.cy} r={on ? 17 : 13} className="rx-dot" />
                <text x={p.cx} y={p.cy + 36} textAnchor="middle" className="rx-lbl">{p.id}</text>
              </g>
            );
          })}
        </svg>
        <div className="rx-pp-panel">
          <div className="rx-tag">{cur.region}</div>
          <h3 className="rx-pp-name">{cur.name} <span>({cur.id})</span></h3>
          <p className="rx-pp-desc">{cur.desc}</p>
          <p className="rx-pp-desc">If a low-sunshine event here coincides with one in a neighbouring pool, there is less spare solar power to share across the interconnection.</p>
          <div className="rx-chips">
            {POOLS.map(function (p) {
              return <button key={p.id} type="button" className={"rx-chip" + (p.id === sel ? " on" : "")} onClick={function () { setSel(p.id); }}>{p.id}</button>;
            })}
          </div>
          <a className="rx-cta" href={NPJ} target="_blank" rel="noopener noreferrer">npj Clean Energy, 2026 <span>&rarr;</span></a>
        </div>
      </div>
    </Section>
  );
}

function Method({ img }) {
  var steps = [
    { n: "01", t: "Raw climate models", d: "CMIP6 models carry systematic biases in surface solar radiation over Africa." },
    { n: "02", t: "Physics as a constraint", d: "Aerosol\u2013cloud\u2013radiation relationships are built into training, so corrections stay physically consistent." },
    { n: "03", t: "Trustworthy projections", d: "Bias-corrected radiation feeds solar-energy projections that planners can rely on." }
  ];
  return (
    <Section id="method" kicker="Method" title="PhysConDL in three steps" intro="Machine learning is powerful, but on its own it can break the laws of physics. PhysConDL keeps it honest.">
      <div className="rx-method">
        <ol className="rx-steps">
          {steps.map(function (s, i) {
            return (
              <li key={s.n} className="rx-step" style={{ transitionDelay: (i * 0.12) + "s" }}>
                <span className="rx-step-n">{s.n}</span>
                <div><h3>{s.t}</h3><p>{s.d}</p></div>
              </li>
            );
          })}
        </ol>
        <div className="rx-side">
          <a className="rx-fig" href={PHYS} target="_blank" rel="noopener noreferrer">
            <img src={img + "figures/physcondl-architecture.jpg"} alt="PhysConDL physics-constrained deep learning architecture" loading="lazy" />
            <span>PhysConDL architecture</span>
          </a>
          <div className="rx-stat">
            <div className="rx-stat-v">70&ndash;85%</div>
            <div className="rx-stat-l">reduction in CMIP6 solar-radiation bias</div>
            <div className="rx-bar"><div className="rx-bar-fill" /></div>
            <a className="rx-cta" href={PHYS} target="_blank" rel="noopener noreferrer">Renewable Energy, 2025 <span>&rarr;</span></a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function assign(pubs) {
  var out = {};
  THEMES.forEach(function (t) { out[t.id] = []; });
  pubs.concat(MANUAL).forEach(function (p) {
    var t = " " + (p.title || "").toLowerCase() + " ";
    if (!(p.title || "").trim()) return;
    if (EXCLUDE.some(function (k) { return t.indexOf(k) !== -1; })) return;
    var th = THEMES.find(function (x) { return x.keys.some(function (k) { return t.indexOf(k) !== -1; }); });
    if (th) out[th.id].push(p);
  });
  Object.keys(out).forEach(function (k) { out[k].sort(function (a, b) { return (b.year || 0) - (a.year || 0); }); });
  return out;
}

function Themes({ pubs, setPage }) {
  var groups = assign(pubs);
  return (
    <Section id="themes" soft kicker="Research themes" title="What I work on">
      <div className="rx-themes">
        {THEMES.map(function (th) {
          var hits = groups[th.id];
          return (
            <div key={th.id} className="rx-theme">
              <div className="rx-theme-top"><span className="rx-theme-i">{th.icon}</span>{hits.length > 0 && <span className="rx-count">{hits.length} {hits.length === 1 ? "work" : "works"}</span>}</div>
              <h3>{th.title}</h3>
              <p>{th.text}</p>
              {hits.length > 0 && (
                <ul>
                  {hits.slice(0, 3).map(function (p, i) {
                    return <li key={i}><a href={p.doi || p.link || SCHOLAR} target="_blank" rel="noopener noreferrer">{p.title}</a><span>{p.year}</span></li>;
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {setPage && <div className="rx-center"><button type="button" className="rx-btn" onClick={function () { setPage("Research"); window.scrollTo(0, 0); }}>View all research areas &rarr;</button></div>}
    </Section>
  );
}

function Collaborate({ img }) {
  var s = useState(false), hasCv = s[0], setCv = s[1];
  useEffect(function () {
    fetch(img + "cv.pdf", { method: "HEAD" }).then(function (r) {
      if (r.ok && (r.headers.get("content-type") || "").indexOf("pdf") !== -1) setCv(true);
    }).catch(function () {});
  }, [img]);
  return (
    <Section id="collaborate" kicker="Collaboration" title="Let's work together">
      <div className="rx-collab">
        <div>
          <p className="rx-intro">I welcome collaboration with climate modellers, energy researchers and data scientists. What I bring:</p>
          <div className="rx-chips light">{METHODS.map(function (m) { return <span key={m} className="rx-chip static">{m}</span>; })}</div>
        </div>
        <div className="rx-collab-btns">
          <a className="rx-btn gold" href="mailto:pauladigun7@gmail.com">Email me</a>
          <a className="rx-btn" href={SCHOLAR} target="_blank" rel="noopener noreferrer">Google Scholar</a>
          {hasCv && <a className="rx-btn" href={img + "cv.pdf"} target="_blank" rel="noopener noreferrer">Download CV</a>}
        </div>
      </div>
    </Section>
  );
}

function css(C) {
  var navy = C.navy, gold = C.gold, goldL = C.goldLight;
  return `
.rx-sec{padding:84px 24px}
.rx-soft{background:#f6f4ee}
.rx-dark{background:linear-gradient(160deg,${navy} 0%,#0b1a33 100%);color:#fff}
.rx-wrap{max-width:1100px;margin:0 auto;opacity:0;transform:translateY(18px);transition:opacity .8s ease,transform .8s ease}
.rx-in .rx-wrap{opacity:1;transform:none}
.rx-kicker{font:700 11px 'DM Sans',sans-serif;letter-spacing:2.6px;text-transform:uppercase;color:${gold};margin-bottom:10px}
.rx-h2{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,4vw,44px);font-weight:700;line-height:1.1;margin:0 0 14px;color:${navy}}
.rx-dark .rx-h2{color:#fff}
.rx-intro{font:400 16px/1.65 'DM Sans',sans-serif;color:#5b6475;max-width:680px;margin:0 0 36px}
.rx-dark .rx-intro{color:rgba(255,255,255,.7)}
.rx-cta{display:inline-block;margin-top:18px;font:700 14px 'DM Sans',sans-serif;color:${goldL};text-decoration:none}
.rx-cta span{display:inline-block;transition:transform .2s}
.rx-cta:hover span{transform:translateX(5px)}
.rx-center{text-align:center;margin-top:34px}
.rx-pp{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
.rx-pp-map{width:100%;max-width:470px;justify-self:center;overflow:visible}
.rx-link{stroke:rgba(255,255,255,.14);stroke-width:1.4;stroke-dasharray:4 7;animation:rxDash 3.5s linear infinite;transition:stroke .3s}
.rx-link.on{stroke:${gold};stroke-width:2.4}
@keyframes rxDash{to{stroke-dashoffset:-44}}
.rx-node{cursor:pointer;outline:none}
.rx-halo{fill:${gold};opacity:0;transform-box:fill-box;transform-origin:center}
.rx-node.on .rx-halo{animation:rxPulse 2.2s ease-out infinite}
@keyframes rxPulse{0%{opacity:.45;transform:scale(.5)}100%{opacity:0;transform:scale(1.6)}}
.rx-dot{fill:#20365c;stroke:rgba(255,255,255,.45);stroke-width:1.5;transition:all .3s}
.rx-node:hover .rx-dot,.rx-node.on .rx-dot{fill:${gold};stroke:#fff}
.rx-lbl{font:700 12px 'DM Sans',sans-serif;fill:rgba(255,255,255,.75);letter-spacing:1px}
.rx-node.on .rx-lbl{fill:${goldL}}
.rx-pp-panel{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:30px}
.rx-tag{display:inline-block;font:700 10.5px 'DM Sans',sans-serif;letter-spacing:1.6px;text-transform:uppercase;color:${navy};background:${gold};border-radius:999px;padding:5px 11px;margin-bottom:14px}
.rx-pp-name{font-family:'Cormorant Garamond',serif;font-size:28px;margin:0 0 12px;color:#fff}
.rx-pp-name span{color:${goldL};font-size:20px}
.rx-pp-desc{font:400 15px/1.6 'DM Sans',sans-serif;color:rgba(255,255,255,.75);margin:0 0 12px}
.rx-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.rx-chip{font:600 12px 'DM Sans',sans-serif;padding:7px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;cursor:pointer;transition:all .2s}
.rx-chip.on,.rx-chip:hover{background:${gold};border-color:${gold};color:${navy}}
.rx-chips.light .rx-chip{color:${navy};border-color:rgba(12,30,60,.18);background:#fff;cursor:default}
.rx-method{display:grid;grid-template-columns:1.25fr 1fr;gap:40px;align-items:start}
.rx-steps{list-style:none;margin:0;padding:0;display:grid;gap:16px}
.rx-step{display:flex;gap:18px;align-items:flex-start;background:#fff;border:1px solid #e8e4d8;border-radius:14px;padding:20px 22px;opacity:0;transform:translateX(-14px);transition:opacity .6s ease,transform .6s ease,box-shadow .3s}
.rx-in .rx-step{opacity:1;transform:none}
.rx-step:hover{box-shadow:0 12px 30px rgba(12,30,60,.08)}
.rx-step-n{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:${gold};line-height:1}
.rx-step h3{font:700 16px 'DM Sans',sans-serif;color:${navy};margin:0 0 4px}
.rx-step p{font:400 14px/1.55 'DM Sans',sans-serif;color:#5b6475;margin:0}
.rx-side{display:grid;gap:16px}
.rx-fig{display:block;background:#fff;border:1px solid #e8e4d8;border-radius:14px;padding:12px;text-decoration:none;transition:box-shadow .3s}
.rx-fig:hover{box-shadow:0 12px 30px rgba(12,30,60,.1)}
.rx-fig img{display:block;width:100%;height:auto;border-radius:8px}
.rx-fig span{display:block;font:600 12px 'DM Sans',sans-serif;color:#5b6475;margin-top:8px;text-align:center}
.rx-stat{background:${navy};color:#fff;border-radius:14px;padding:26px 26px}
.rx-stat-v{font-family:'Cormorant Garamond',serif;font-size:54px;font-weight:700;color:${goldL};line-height:1}
.rx-stat-l{font:500 15px 'DM Sans',sans-serif;color:rgba(255,255,255,.75);margin:8px 0 18px}
.rx-bar{height:8px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}
.rx-bar-fill{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,${gold},${goldL});transition:width 1.8s cubic-bezier(.2,.8,.2,1) .3s}
.rx-in .rx-bar-fill{width:85%}
.rx-themes{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:10px}
.rx-theme{background:#fff;border:1px solid #e8e4d8;border-radius:16px;padding:24px;transition:transform .25s,box-shadow .25s}
.rx-theme:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(12,30,60,.1)}
.rx-theme-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.rx-theme-i{font-size:26px}
.rx-count{font:700 11px 'DM Sans',sans-serif;color:${navy};background:#f3ead0;border-radius:999px;padding:4px 10px}
.rx-theme h3{font-family:'Cormorant Garamond',serif;font-size:22px;color:${navy};margin:0 0 6px}
.rx-theme p{font:400 14px/1.55 'DM Sans',sans-serif;color:#5b6475;margin:0 0 12px}
.rx-theme ul{list-style:none;margin:0;padding:0;border-top:1px solid #eee}
.rx-theme li{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid #f1f1f1}
.rx-theme li a{font:500 13px/1.4 'DM Sans',sans-serif;color:${navy};text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.rx-theme li a:hover{color:${gold}}
.rx-theme li span{font:700 11px 'DM Sans',sans-serif;color:${gold};flex:none}
.rx-collab{display:grid;grid-template-columns:1.5fr 1fr;gap:36px;align-items:center;background:#f6f4ee;border-radius:20px;padding:36px}
.rx-collab .rx-intro{margin-bottom:6px}
.rx-collab-btns{display:flex;flex-direction:column;gap:12px}
.rx-btn{display:inline-block;text-align:center;font:700 14px 'DM Sans',sans-serif;padding:12px 22px;border-radius:10px;text-decoration:none;color:${navy};background:transparent;border:1.5px solid ${navy};cursor:pointer;transition:all .2s}
.rx-btn:hover{background:${navy};color:#fff}
.rx-btn.gold{background:${gold};border-color:${gold}}
.rx-btn.gold:hover{background:${navy};border-color:${navy};color:#fff}
@media(max-width:860px){.rx-pp,.rx-method,.rx-collab{grid-template-columns:1fr}.rx-sec{padding:60px 20px}.rx-collab{padding:26px}}
@media(prefers-reduced-motion:reduce){.rx-wrap,.rx-step,.rx-bar-fill{transition:none}.rx-link,.rx-node.on .rx-halo{animation:none}}
`;
}

export default function ResearchExtras({ C, img, pubs, setPage, part }) {
  return (
    <div className="rx">
      <style>{css(C)}</style>
      {part === "bottom" ? (
        <Collaborate img={img} />
      ) : (
        <>
          <PowerPools />
          <Method img={img} />
          <Themes pubs={pubs || []} setPage={setPage} />
        </>
      )}
    </div>
  );
}
