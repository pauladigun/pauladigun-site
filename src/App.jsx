import { useState, useEffect } from "react";

const gs = (q) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
const IMG = import.meta.env.BASE_URL; // /pauladigun-site/ on GitHub Pages

// ---- fallback publications (used until live Scholar data loads) ----
const publications = [
  { title: "Climate-driven synchronization of solar extremes threatens the resilience of Africa's regional power pool", authors: "P Adigun, K Dairaku, AT Ogunrinde, et al.", journal: "npj Clean Energy", volume: "2, 11", year: 2026, citations: 0, doi: "https://doi.org/10.1038/s44406-026-00027-7" },
  { title: "Extreme weather and cascading photovoltaic power vulnerabilities under climate change", authors: "P Adigun, D Koji, AT Ogunrinde, X Xue, P Ebiendele", journal: "Sustainable Energy Technologies and Assessments", volume: "85, 104776", year: 2026, citations: 0, doi: "https://doi.org/10.1016/j.seta.2025.104776" },
  { title: "Physics-constrained Deep Learning Bias Correction of CMIP6 Solar Radiation Over Africa", authors: "P Adigun, K Dairaku, P Ebiendele", journal: "Renewable Energy", volume: "124658", year: 2025, citations: 2, doi: "https://doi.org/10.1016/j.renene.2025.124658" },
  { title: "Climate change influence on solar photovoltaic energy production and its associated drivers in CMIP6 ensemble projections", authors: "P Adigun, K Dairaku, AT Ogunrinde, X Xue", journal: "Journal of Geophysical Research: Atmospheres", volume: "130(18), e2024JD042971", year: 2025, citations: 2, doi: "https://doi.org/10.1029/2024JD042971" },
  { title: "The future of photovoltaic energy potential in Africa under higher emission scenarios", authors: "P Adigun, AT Ogunrinde, K Dairaku, AA Adebiyi, X Xian", journal: "Solar Energy", volume: "285, 113078", year: 2024, citations: 10, doi: "https://doi.org/10.1016/j.solener.2024.113078" },
  { title: "Intensifying human-driven heatwaves characteristics and heat related mortality over Africa", authors: "P Adigun, EO Abah, OD Ajileye", journal: "Environmental Research: Climate", volume: "3(1), 015007", year: 2024, citations: 15, doi: "https://doi.org/10.1088/2752-5295/ad1f41" },
];

const metrics = { citations: 151, hIndex: 8, i10Index: 7 };

// ---- live Google Scholar sync (publications + citations) ----
const SCHOLAR_ID = "7uxmezsAAAAJ";
const RAW_SCHOLAR = "https://raw.githubusercontent.com/pauladigun/pauladigun-site/main/public/scholar.json";
const DOI_MAP = [
  ["synchronization of solar extremes", "10.1038/s44406-026-00027-7"],
  ["cascading photovoltaic", "10.1016/j.seta.2025.104776"],
  ["evaporative demand drought index", "10.1016/j.wace.2026.100873"],
  ["future wind energy potential", "10.1016/j.clet.2026.101145"],
  ["spatiotemporal analysis of drought", "10.1080/17538947.2024.2447342"],
  ["future of photovoltaic energy potential", "10.1016/j.solener.2024.113078"],
  ["probabilistic quantification of global drought", "10.1016/j.gsf.2025.102235"],
  ["physics-constrained deep learning bias correction", "10.1016/j.renene.2025.124658"],
  ["solar photovoltaic energy production", "10.1029/2024JD042971"],
  ["downscaling of west africa summer monsoon", "10.1007/s00382-025-07865-8"],
  ["platinum catalyst in rice husk", "10.3390/catal15080717"],
  ["heatwaves characteristics and heat related mortality", "10.1088/2752-5295/ad1f41"],
  ["multi-scale drought variability over west africa", "10.1080/19475705.2024.2409199"],
  ["urbanization on land surface temperature", "10.1016/j.crsust.2022.100142"],
  ["multi-model evaluation of summer extreme precipitation", "10.1007/s40808-022-01433-3"],
];
function doiFor(title) {
  var t = (title || "").toLowerCase();
  for (var i = 0; i < DOI_MAP.length; i++) { if (t.indexOf(DOI_MAP[i][0]) !== -1) return "https://doi.org/" + DOI_MAP[i][1]; }
  return undefined;
}
function normalizeScholar(j) {
  var pubs = (j.publications || []).map(function (p) {
    return { title: p.title || "", authors: p.authors || "", journal: p.journal || "", volume: "", year: p.year || "", citations: p.citations || 0, link: p.link || "", doi: doiFor(p.title) };
  });
  return { publications: pubs.length ? pubs : publications, metrics: j.metrics || metrics, updated: j.updated || "" };
}
var _scholarCache = null;
var _scholarSubs = [];
function loadScholar() {
  if (_scholarCache) return;
  var urls = [RAW_SCHOLAR, IMG + "scholar.json"];
  var tryUrl = function (idx) {
    if (idx >= urls.length) return;
    fetch(urls[idx], { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
      .then(function (j) { _scholarCache = normalizeScholar(j); _scholarSubs.forEach(function (f) { f(); }); })
      .catch(function () { tryUrl(idx + 1); });
  };
  tryUrl(0);
}
function useScholar() {
  var st = useState(0), set = st[1];
  useEffect(function () {
    var f = function () { set(function (x) { return x + 1; }); };
    _scholarSubs.push(f);
    loadScholar();
    return function () { _scholarSubs = _scholarSubs.filter(function (g) { return g !== f; }); };
  }, []);
  return _scholarCache || { publications: publications, metrics: metrics, updated: "" };
}

const researchAreas = [
  { color: "#E8A838", gradient: "linear-gradient(135deg, #FFF8E7 0%, #FFF0CC 100%)", title: "Solar & Renewable Energy", desc: "Projecting photovoltaic energy potential across Africa using CMIP6 ensembles. Investigating dust-radiation-cloud interactions, Saharan dust impacts on solar resources, and physics-constrained deep learning for bias correction of solar radiation data.", papers: 5, journals: ["Solar Energy", "JGR Atmospheres", "Renewable Energy"] },
  { color: "#E05555", gradient: "linear-gradient(135deg, #FFF0F0 0%, #FFE0E0 100%)", title: "Climate Extremes & Heatwaves", desc: "Quantifying intensification of human-driven heatwaves and heat-related mortality across Africa. Analyzing dynamic and thermodynamic drivers of extreme precipitation over East Asia using CMIP6 simulations.", papers: 4, journals: ["Env. Research: Climate", "AGU"] },
  { color: "#3B82C4", gradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", title: "Drought Analysis & Monitoring", desc: "Multi-scale drought variability using SPEI approaches spanning 1960-2018. Assessing teleconnection influences on meteorological drought patterns across Africa, Northwest China, and arid regions of Asia.", papers: 5, journals: ["Int. J. Digital Earth", "Big Earth Data"] },
  { color: "#8B5CF6", gradient: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)", title: "Deep Learning for Climate", desc: "Developing physics-constrained neural networks embedding radiative transfer principles for CMIP6 bias correction. Statistical downscaling of West African monsoon precipitation using deep learning architectures.", papers: 3, journals: ["Renewable Energy", "Climate Dynamics"] },
  { color: "#10B981", gradient: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)", title: "Urbanization & Land Surface", desc: "Remote sensing analysis of land surface temperature changes driven by rapid urbanization in South-West Nigeria. Modeling the thermal footprint of urban expansion on regional climate systems.", papers: 2, journals: ["Current Research in Env. Sustainability"] },
  { color: "#0EA5E9", gradient: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)", title: "Wind Energy Potential", desc: "Projecting future wind farm development potential across Africa using bias-corrected NEX-GDDP-CMIP6 wind data. Comparative life cycle analysis for sustainable energy systems.", papers: 2, journals: ["Cleaner Eng. and Technology"] },
];

const cvData = {
  education: [{ degree: "Ph.D. Candidate", field: "Climate Science / Atmospheric Sciences", institution: "University of Tsukuba, Japan", period: "Current", details: "Research on CMIP6 climate modeling, renewable energy projections, and extreme weather attribution" }],
  experience: [{ role: "Research Associate", org: "University of Tsukuba", period: "Current", details: "Climate modeling, deep learning for bias correction, solar and wind energy projections under climate change scenarios" }],
  skills: ["CMIP6 Climate Models", "Python / R", "Deep Learning (Physics-constrained)", "Remote Sensing", "Statistical Downscaling", "GIS & Spatial Analysis", "SPEI Drought Analysis", "Scientific Writing"],
};

const C = { navy: "#0B1D3A", navyLight: "#132B52", navyMid: "#1A3A6B", gold: "#C8982E", goldLight: "#E8C36A", goldPale: "#FBF4E4", cream: "#FAF8F4", warmWhite: "#FEFDFB", text: "#1a1a1a", textMid: "#4a4a4a", textLight: "#7a7a7a", border: "#E8E4DD" };

function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: scrolled ? "rgba(11,29,58,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", transition: "all 0.4s", padding: scrolled ? "10px 48px" : "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: scrolled ? C.goldLight : "#fff" }}>Paul Adigun</button>
      <div style={{ display: "flex", gap: 4 }}>
        {["Home", "Research", "Publications", "CV", "Contact"].map((p) => (
          <button key={p} onClick={() => setPage(p)} style={{ background: page === p ? (scrolled ? "rgba(200,152,46,0.15)" : "rgba(255,255,255,0.12)") : "none", border: "none", cursor: "pointer", padding: "7px 16px", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: page === p ? 600 : 400, fontSize: 13, color: page === p ? (scrolled ? C.goldLight : "#fff") : (scrolled ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.55)") }}>{p}</button>
        ))}
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.navy, padding: "48px 48px 24px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans'" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, fontWeight: 700, color: C.goldLight, marginBottom: 6 }}>Paul Adigun</div>
          <div style={{ fontSize: 13 }}>Climate Scientist &middot; Japan</div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {["Home", "Research", "Publications", "CV", "Contact"].map((p) => (
            <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans'", fontSize: 13 }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "28px auto 0", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span>&copy; {new Date().getFullYear()} Paul Adigun</span><span>pauladigun.github.io/pauladigun-site</span>
      </div>
    </footer>
  );
}

function Label({ children }) { return <p style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3.5, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>{children}</p>; }

function PageHeader({ label, title, subtitle }) {
  return (
    <section style={{ padding: "160px 48px 60px", background: "linear-gradient(165deg, " + C.navy + " 0%, " + C.navyLight + " 100%)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Label>{label}</Label>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 580, lineHeight: 1.7, fontWeight: 300 }}>{subtitle}</p>}
      </div>
    </section>
  );
}

function HeroSpotlight({ updated }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,152,46,0.28)", borderRadius: 16, padding: "24px 24px 20px", backdropFilter: "blur(8px)", boxShadow: "0 18px 50px rgba(0,0,0,0.28)" }}>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: C.goldLight, marginBottom: 12 }}>Featured Paper &middot; 2026</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 23, fontWeight: 700, color: "#fff", lineHeight: 1.22, marginBottom: 10 }}>Climate-driven synchronization of solar extremes across Africa's power pools</h3>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 12.5, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>npj Clean Energy &mdash; Nature Portfolio</p>
      <a href="https://doi.org/10.1038/s44406-026-00027-7" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, color: C.navy, background: C.gold, padding: "9px 18px", borderRadius: 6, textDecoration: "none" }}>Read the paper &#8594;</a>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans'", fontSize: 10.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
        Publications &amp; citations synced from Google Scholar{updated ? " \u00b7 updated " + updated : ""}
      </div>
    </div>
  );
}

function PubCard({ pub, i, compact }) {
  var link = pub.doi || pub.link || gs(pub.title);
  var badge = pub.doi ? "DOI" : "Scholar";
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div style={{ padding: compact ? "18px 0" : "20px 24px", marginBottom: compact ? 0 : 2, borderLeft: compact ? "none" : "3px solid transparent", borderBottom: compact ? "1px solid " + C.border : "none", borderRadius: compact ? 0 : "0 8px 8px 0", background: compact ? "transparent" : (i % 2 === 0 ? C.warmWhite : "transparent"), display: "flex", justifyContent: "space-between", gap: 20, transition: "all 0.25s", cursor: "pointer" }}
        onMouseEnter={function(e) { if (!compact) e.currentTarget.style.borderLeftColor = C.gold; e.currentTarget.style.background = C.goldPale; }}
        onMouseLeave={function(e) { if (!compact) e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.background = compact ? "transparent" : (i % 2 === 0 ? C.warmWhite : "transparent"); }}
      >
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: compact ? 15 : 14.5, fontWeight: 600, lineHeight: 1.45, marginBottom: 5, color: C.navy }}>
            {pub.title}
            <span style={{ fontSize: 11, color: pub.doi ? C.gold : C.textLight, fontWeight: 700, marginLeft: 8 }}>{badge} &#8599;</span>
          </h4>
          {pub.authors ? <p style={{ fontSize: 12.5, color: C.textLight, fontFamily: "'DM Sans'" }}>{pub.authors}</p> : null}
          <p style={{ fontSize: 12.5, color: C.textMid, fontStyle: "italic", marginTop: 2 }}>{pub.journal}{pub.volume ? ", " + pub.volume : ""}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, minWidth: 55 }}>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13, color: C.gold }}>{pub.year}</div>
          {pub.citations > 0 && <div style={{ fontSize: 11, color: C.textLight, fontFamily: "'DM Sans'", marginTop: 3 }}>{pub.citations} cited</div>}
        </div>
      </div>
    </a>
  );
}

function FeaturedResearch() {
  var cards = [
    { tag: "PhysConDL", meta: "Renewable Energy \u00b7 2025", title: "Physics-Constrained Deep Learning for Solar Radiation Bias Correction", desc: "A deep-learning framework that embeds aerosol-cloud-radiation physics as constraints, correcting CMIP6 solar-radiation bias over Africa for reliable solar-power planning in a changing climate.", img: IMG + "figures/physcondl-architecture.jpg", alt: "PhysConDL physics-constrained deep learning architecture diagram", href: "https://doi.org/10.1016/j.renene.2025.124658", color: C.gold },
    { tag: "npj Clean Energy", meta: "npj Clean Energy \u00b7 2026", title: "Synchronized Solar Extremes Across Africa's Power Pools", desc: "Evaluation of the CMIP6 ensemble against WFDE5 across five African power pools (WAPP, SAPP, EAPP, CAPP, COMELEC), revealing extreme low-irradiance events that synchronize across regions and threaten grid resilience.", img: IMG + "figures/npj-solar-extremes-fig2.webp", alt: "Evaluation of CMIP6 multi-model ensemble photovoltaic potential across African power pools", href: "https://doi.org/10.1038/s44406-026-00027-7", color: "#3B82C4" },
  ];
  return (
    <section style={{ padding: "80px 48px", background: C.warmWhite }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Label>Featured Research</Label>
        <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 34, fontWeight: 700, marginBottom: 40, color: C.navy }}>Methods &amp; Key Findings</h2>
        {cards.map(function(c, i) {
          return (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 28 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid " + C.border, background: C.cream, transition: "all 0.35s" }}
                onMouseEnter={function(e) { e.currentTarget.style.boxShadow = "0 12px 32px rgba(11,29,58,0.10)"; e.currentTarget.style.borderColor = c.color + "55"; }}
                onMouseLeave={function(e) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ padding: "26px 32px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 6, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 700, color: c.color, background: "#fff", border: "1px solid " + c.color + "33", letterSpacing: 0.5 }}>{c.tag}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: C.textLight, fontWeight: 600 }}>{c.meta}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 700, color: c.color }}>View paper &#8599;</span>
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans'", fontSize: 19, fontWeight: 700, color: C.navy, marginBottom: 8, lineHeight: 1.35 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, fontWeight: 300, maxWidth: 760 }}>{c.desc}</p>
                </div>
                <div style={{ background: "#fff", padding: "20px 24px", borderTop: "1px solid " + C.border, textAlign: "center" }}>
                  <img src={c.img} alt={c.alt} loading="lazy" style={{ maxWidth: "100%", height: "auto", borderRadius: 8, display: "block", margin: "0 auto" }} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  var sch = useScholar();
  var publications = sch.publications;
  var metrics = sch.metrics;
  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "linear-gradient(165deg, " + C.navy + " 0%, " + C.navyLight + " 45%, " + C.navyMid + " 100%)", position: "relative", overflow: "hidden", padding: "120px 48px 80px" }}>
        <div style={{ position: "absolute", top: "8%", right: "6%", width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.07)" }} />
        <div style={{ position: "absolute", top: "13%", right: "9%", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.04)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "4%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.05)" }} />
        <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", width: "100%", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ flex: "1 1 520px", maxWidth: 620 }}>
            <div style={{ width: 56, height: 2, background: "linear-gradient(90deg, " + C.gold + ", transparent)", marginBottom: 28 }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 60, fontWeight: 700, lineHeight: 1.05, color: "#fff", marginBottom: 10 }}>Paul Adigun</h1>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 500, color: C.goldLight, letterSpacing: 2, marginBottom: 26, textTransform: "uppercase" }}>Climate Scientist &middot; Japan</p>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 600, fontWeight: 300 }}>
My research integrates <span style={{ color: C.goldLight, fontWeight: 500 }}>climate and Earth system modeling</span>, high-resolution simulations, <span style={{ color: C.goldLight, fontWeight: 500 }}>machine learning</span>, and satellite observations to understand <span style={{ color: C.goldLight, fontWeight: 500 }}>extreme weather</span> and <span style={{ color: C.goldLight, fontWeight: 500 }}>renewable energy</span> potential across <span style={{ color: C.goldLight, fontWeight: 500 }}>Africa</span> and beyond, supporting <span style={{ color: C.goldLight, fontWeight: 500 }}>climate adaptation</span> and evidence-based policy.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <button onClick={function() { setPage("Publications"); }} style={{ background: C.gold, color: C.navy, border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14 }}>View Publications</button>
              <button onClick={function() { setPage("Contact"); }} style={{ background: "transparent", color: "rgba(255,255,255,0.8)", cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.2)", padding: "12px 28px", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14 }}>Get in Touch</button>
            </div>
            <div style={{ display: "flex", marginTop: 44, background: "rgba(255,255,255,0.04)", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", width: "fit-content", flexWrap: "wrap" }}>
              {[{ l: "Citations", v: metrics.citations }, { l: "h-index", v: metrics.hIndex }, { l: "i10-index", v: metrics.i10Index }, { l: "Publications", v: publications.length }].map(function(m, i) {
                return <div key={m.l} style={{ textAlign: "center", padding: "18px 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}><div style={{ fontSize: 26, fontWeight: 700, color: C.goldLight, fontFamily: "'DM Sans'" }}>{m.v}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans'", fontWeight: 500, marginTop: 3 }}>{m.l}</div></div>;
              })}
            </div>
          </div>
          <div style={{ flex: "1 1 320px", maxWidth: 400, minWidth: 280 }}>
            <HeroSpotlight updated={sch.updated} />
          </div>
        </div>
      </section>

      <FeaturedResearch />

      <section style={{ padding: "80px 48px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Research Highlights</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 34, fontWeight: 700, marginBottom: 40, color: C.navy }}>Areas of Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {researchAreas.slice(0, 3).map(function(a, i) {
              return (
                <div key={i} onClick={function() { setPage("Research"); }} style={{ padding: 28, borderRadius: 12, background: a.gradient, border: "1.5px solid " + a.color + "22", cursor: "pointer", transition: "all 0.35s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px " + a.color + "18"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 40, height: 4, borderRadius: 2, background: a.color, marginBottom: 16, opacity: 0.7 }} />
                  <h3 style={{ fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 700, marginBottom: 8, color: C.navy }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, fontWeight: 300 }}>{a.desc.slice(0, 120)}...</p>
                  <div style={{ marginTop: 14, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 600, color: a.color }}>{a.papers} publications &#8594;</div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={function() { setPage("Research"); }} style={{ background: "none", border: "1.5px solid " + C.navy, color: C.navy, padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13.5 }}>View All Research Areas &#8594;</button>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 48px", background: C.warmWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Latest Work</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 34, fontWeight: 700, marginBottom: 40, color: C.navy }}>Recent Publications</h2>
          {publications.slice(0, 5).map(function(pub, i) { return <PubCard key={i} pub={pub} i={i} compact={true} />; })}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={function() { setPage("Publications"); }} style={{ background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14 }}>View All Publications &#8594;</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ResearchPage() {
  return (
    <div>
      <PageHeader label="Research" title="Areas of Focus" subtitle="My research bridges climate science, renewable energy, and computational modeling to address pressing environmental challenges across Africa and Asia." />
      <section style={{ padding: "60px 48px 100px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {researchAreas.map(function(area, i) {
            return (
              <div key={i} style={{ marginBottom: 24, borderRadius: 16, overflow: "hidden", border: "1px solid " + C.border, background: C.warmWhite, transition: "all 0.35s" }}
                onMouseEnter={function(e) { e.currentTarget.style.boxShadow = "0 8px 32px " + area.color + "15"; e.currentTarget.style.borderColor = area.color + "44"; }}
                onMouseLeave={function(e) { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ display: "flex", minHeight: 180 }}>
                  <div style={{ width: 6, background: area.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: "32px 36px", display: "flex", gap: 32 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: area.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: area.color, fontFamily: "'DM Sans'", border: "1.5px solid " + area.color + "33" }}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 style={{ fontFamily: "'DM Sans'", fontSize: 20, fontWeight: 700, color: C.navy }}>{area.title}</h3>
                      </div>
                      <p style={{ fontSize: 14.5, color: C.textMid, lineHeight: 1.75, fontWeight: 300, marginBottom: 16 }}>{area.desc}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {area.journals.map(function(j) {
                          return <span key={j} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 600, color: area.color, background: area.gradient, border: "1px solid " + area.color + "22" }}>{j}</span>;
                        })}
                      </div>
                    </div>
                    <div style={{ width: 100, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderLeft: "1px solid " + C.border, paddingLeft: 24 }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: area.color, fontFamily: "'DM Sans'" }}>{area.papers}</div>
                      <div style={{ fontSize: 11, color: C.textLight, fontFamily: "'DM Sans'", fontWeight: 500, textAlign: "center" }}>papers</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 48, padding: 40, background: C.warmWhite, borderRadius: 12, border: "1px solid " + C.border }}>
            <Label>Keywords</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
              {["Extreme Attribution", "Pollution Modelling", "CMIP6", "Deep Learning", "Solar Energy", "Drought", "Climate Change", "Africa", "East Asia", "Renewable Energy", "Heatwaves", "Photovoltaics", "Statistical Downscaling", "SPEI", "Wind Energy", "Saharan Dust", "Monsoon", "Remote Sensing", "Urbanization"].map(function(tag) {
                return <span key={tag} style={{ padding: "8px 18px", borderRadius: 24, fontSize: 13, fontFamily: "'DM Sans'", fontWeight: 500, color: C.navy, background: C.goldPale, border: "1px solid rgba(200,152,46,0.2)" }}>{tag}</span>;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PublicationsPage() {
  var sch = useScholar();
  var publications = sch.publications;
  var metrics = sch.metrics;
  var _a = useState(false), showAll = _a[0], setShowAll = _a[1];
  var _b = useState("year"), sortBy = _b[0], setSortBy = _b[1];
  var sorted = publications.slice().sort(function(a, b) { return sortBy === "year" ? (b.year - a.year || b.citations - a.citations) : b.citations - a.citations; });
  var display = showAll ? sorted : sorted.slice(0, 10);
  return (
    <div>
      <section style={{ padding: "160px 48px 60px", background: "linear-gradient(165deg, " + C.navy + " 0%, " + C.navyLight + " 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Publications</Label>
          <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Selected Works</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28, fontFamily: "'DM Sans'" }}>Click any paper to view it on the publisher website or Google Scholar{sch.updated ? " \u00b7 synced " + sch.updated : ""}</p>
          <div style={{ display: "flex", gap: 32 }}>
            {[{ l: "Total Citations", v: metrics.citations }, { l: "h-index", v: metrics.hIndex }, { l: "i10-index", v: metrics.i10Index }, { l: "Publications", v: publications.length }].map(function(m) {
              return <div key={m.l}><div style={{ fontSize: 28, fontWeight: 700, color: C.goldLight, fontFamily: "'DM Sans'" }}>{m.v}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans'", marginTop: 2 }}>{m.l}</div></div>;
            })}
          </div>
        </div>
      </section>
      <section style={{ padding: "60px 48px 100px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 24 }}>
            {["year", "citations"].map(function(s) {
              return <button key={s} onClick={function() { setSortBy(s); }} style={{ fontFamily: "'DM Sans'", padding: "6px 18px", borderRadius: 20, border: sortBy === s ? "1.5px solid " + C.navy : "1.5px solid " + C.border, background: sortBy === s ? C.navy : "#fff", color: sortBy === s ? "#fff" : C.textMid, cursor: "pointer", fontSize: 12.5, fontWeight: 600, textTransform: "capitalize" }}>{"By " + s}</button>;
            })}
          </div>
          {display.map(function(pub, i) { return <PubCard key={i} pub={pub} i={i} compact={false} />; })}
          {publications.length > 10 && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={function() { setShowAll(!showAll); }} style={{ background: "none", border: "1.5px solid " + C.navy, color: C.navy, padding: "10px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13.5 }}>{showAll ? "Show Less" : "Show All " + publications.length + " Publications"}</button>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="https://scholar.google.com/citations?user=7uxmezsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.gold, fontWeight: 600, textDecoration: "none" }}>View on Google Scholar &#8599;</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function CVPage() {
  return (
    <div>
      <PageHeader label="Curriculum Vitae" title="CV" subtitle="A summary of my academic journey, experience, and skills." />
      <section style={{ padding: "60px 48px 100px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <button style={{ marginBottom: 40, background: C.gold, color: C.navy, border: "none", padding: "12px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14 }}>Download Full CV (PDF)</button>
          <div style={{ marginBottom: 48 }}>
            <Label>Education</Label>
            {cvData.education.map(function(e, i) {
              return <div key={i} style={{ padding: 28, background: C.warmWhite, borderRadius: 12, border: "1px solid " + C.border, marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><h3 style={{ fontFamily: "'DM Sans'", fontSize: 17, fontWeight: 700, color: C.navy }}>{e.degree}</h3><p style={{ fontSize: 14, color: C.gold, fontWeight: 600, marginTop: 2 }}>{e.field}</p><p style={{ fontSize: 14, color: C.textMid, marginTop: 4 }}>{e.institution}</p><p style={{ fontSize: 13, color: C.textLight, marginTop: 6, lineHeight: 1.6 }}>{e.details}</p></div><span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: C.textLight }}>{e.period}</span></div></div>;
            })}
          </div>
          <div style={{ marginBottom: 48 }}>
            <Label>Experience</Label>
            {cvData.experience.map(function(e, i) {
              return <div key={i} style={{ padding: 28, background: C.warmWhite, borderRadius: 12, border: "1px solid " + C.border, marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><h3 style={{ fontFamily: "'DM Sans'", fontSize: 17, fontWeight: 700, color: C.navy }}>{e.role}</h3><p style={{ fontSize: 14, color: C.gold, fontWeight: 600, marginTop: 2 }}>{e.org}</p><p style={{ fontSize: 13, color: C.textLight, marginTop: 6, lineHeight: 1.6 }}>{e.details}</p></div><span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: C.textLight }}>{e.period}</span></div></div>;
            })}
          </div>
          <div>
            <Label>Technical Skills</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {cvData.skills.map(function(s) { return <span key={s} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13.5, fontFamily: "'DM Sans'", fontWeight: 600, color: C.navy, background: C.warmWhite, border: "1px solid " + C.border }}>{s}</span>; })}
            </div>
          </div>
          <div style={{ marginTop: 60, padding: 32, borderRadius: 12, background: "linear-gradient(135deg, " + C.navy + ", " + C.navyMid + ")", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 8 }}>Need the complete CV?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 20, fontFamily: "'DM Sans'" }}>Download the full PDF with publication list, conferences, and teaching experience.</p>
            <button style={{ background: C.gold, color: C.navy, border: "none", padding: "12px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14 }}>Download CV</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <PageHeader label="Contact" title="Let's Collaborate" subtitle="Open to research collaborations, speaking invitations, and discussions on climate science, renewable energy, and deep learning." />
      <section style={{ padding: "60px 48px 100px", background: C.cream }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
            {[
              { label: "Email", value: "adigunmet133492@futa.edu.ng", icon: "\u2709", href: "mailto:adigunmet133492@futa.edu.ng" },
              { label: "Google Scholar", value: "View Profile", icon: "\uD83D\uDCDA", href: "https://scholar.google.com/citations?user=7uxmezsAAAAJ&hl=en" },
              { label: "ResearchGate", value: "View Profile", icon: "\uD83D\uDD2C", href: "https://www.researchgate.net/profile/Paul-Adigun" },
              { label: "GitHub", value: "pauladigun", icon: "\uD83D\uDCBB", href: "https://github.com/pauladigun" },
              { label: "Affiliation", value: "University of Tsukuba", icon: "\uD83C\uDFDB", href: null },
              { label: "Location", value: "Japan", icon: "\uD83D\uDCCD", href: null },
            ].map(function(item) {
              var card = (
                <div style={{ padding: 24, borderRadius: 12, background: C.warmWhite, border: "1px solid " + C.border, cursor: item.href ? "pointer" : "default", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: C.navy }}>{item.value}</p>
                </div>
              );
              return item.href ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{card}</a> : <div key={item.label}>{card}</div>;
            })}
          </div>
          <div style={{ padding: 40, borderRadius: 12, textAlign: "center", background: "linear-gradient(135deg, " + C.navy + ", " + C.navyMid + ")" }}>
            <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 24, color: "#fff", fontWeight: 600, marginBottom: 8 }}>Interested in collaborating?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24, fontFamily: "'DM Sans'", lineHeight: 1.6 }}>Always excited to connect with fellow researchers working on climate, energy, and computational earth science.</p>
            <a href="mailto:adigunmet133492@futa.edu.ng" style={{ textDecoration: "none" }}>
              <button style={{ background: C.gold, color: C.navy, border: "none", padding: "14px 36px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 15 }}>Send an Email</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PaulAdigunWebsite() {
  var _a = useState("Home"), page = _a[0], setPage = _a[1];
  var changePage = function(p) { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", background: C.cream, color: C.text, minHeight: "100vh" }}>
      <NavBar page={page} setPage={changePage} />
      <main key={page}>
        {page === "Home" && <HomePage setPage={changePage} />}
        {page === "Research" && <ResearchPage />}
        {page === "Publications" && <PublicationsPage />}
        {page === "CV" && <CVPage />}
        {page === "Contact" && <ContactPage />}
      </main>
      <Footer setPage={changePage} />
    </div>
  );
}
