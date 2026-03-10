import { useState, useEffect } from "react";

// ============================================================
// DATA
// ============================================================
const publications = [
  { title: "Evaporative Demand Drought Index for Monitoring and Analyzing Drought Conditions in Arid Regions of Asia and Africa", authors: "AT Ogunrinde, P Adigun, X Xue, D Koji, ES Brhane", journal: "Weather and Climate Extremes", volume: "100873", year: 2026, citations: 0 },
  { title: "Future Wind Energy Potential for Wind Farm Development in Africa Based on Bias-Corrected NEX-GDDP-CMIP6 Wind Projections", authors: "AT Ogunrinde, P Adigun, D Koji, X Xue, S Shameer, S Zare", journal: "Cleaner Engineering and Technology", volume: "101145", year: 2026, citations: 0 },
  { title: "Extreme weather and cascading photovoltaic power vulnerabilities under climate change", authors: "P Adigun, D Koji, AT Ogunrinde, X Xue, P Ebiendele", journal: "Sustainable Energy Technologies and Assessments", volume: "85, 104776", year: 2026, citations: 0 },
  { title: "Spatiotemporal analysis of drought patterns and trends across Africa: a multi-scale SPEI approach (1960–2018)", authors: "AT Ogunrinde, P Adigun, X Xue, D Koji, Q Jing", journal: "International Journal of Digital Earth", volume: "18(1), 2447342", year: 2025, citations: 17 },
  { title: "The future of photovoltaic energy potential in Africa under higher emission scenarios: Insights from CMIP6 multi-model ensemble analysis", authors: "P Adigun, AT Ogunrinde, K Dairaku, AA Adebiyi, X Xian", journal: "Solar Energy", volume: "285, 113078", year: 2025, citations: 10 },
  { title: "Probabilistic quantification of global drought risk amplification from temperature-enhanced evapotranspiration under climate change", authors: "AT Ogunrinde, P Adigun, X Xue, K Dairaku, SA Shah, IS Adawa", journal: "Geoscience Frontiers", volume: "102235", year: 2025, citations: 2 },
  { title: "Physics-constrained Deep Learning Bias Correction of CMIP6 Solar Radiation Over Africa and Its Implications for Solar Power Planning in a Changing Climate", authors: "P Adigun, K Dairaku, P Ebiendele", journal: "Renewable Energy", volume: "124658", year: 2025, citations: 2 },
  { title: "Climate change influence on solar photovoltaic energy production and its associated drivers in CMIP6 ensemble projections", authors: "P Adigun, K Dairaku, AT Ogunrinde, X Xue", journal: "Journal of Geophysical Research: Atmospheres", volume: "130(18), e2024JD042971", year: 2025, citations: 2 },
  { title: "Doubled Saharan dust emissions decrease solar photovoltaic potential through dust-radiation-cloud interactions in CMIP6 simulation", authors: "P Adigun, K Dairaku, AT Ogunrinde, X Xue", journal: "Environmental Research: Climate", volume: "", year: 2025, citations: 0 },
  { title: "DEEP learning downscaling of West Africa summer monsoon precipitation flow: exploring added value", authors: "P Ebiendele, K Dairaku, P Adigun", journal: "Climate Dynamics", volume: "63(10), 410", year: 2025, citations: 3 },
  { title: "Assessment of Platinum Catalyst in Rice Husk Combustion: A Comparative Life Cycle Analysis with Conventional Methods", authors: "EO Abah, PD Kahandage, R Noguchi, T Ahamed, P Adigun, C Idogho", journal: "Catalysts", volume: "15(8), 717", year: 2025, citations: 2 },
  { title: "Intensifying human-driven heatwaves characteristics and heat related mortality over Africa", authors: "P Adigun, EO Abah, OD Ajileye", journal: "Environmental Research: Climate", volume: "3(1), 015007", year: 2024, citations: 15 },
  { title: "Multi-scale drought variability over West Africa and the associated large-scale circulation patterns", authors: "AT Ogunrinde, P Adigun, X Xian, H Yu, D Koji, A Adebiyi, AA Sabo", journal: "Geomatics, Natural Hazards and Risk", volume: "15(1), 2409199", year: 2024, citations: 10 },
  { title: "Assessing teleconnection influences on the spatial and temporal patterns of meteorological drought in Northwest China", authors: "AT Ogunrinde, X Xian, P Adigun, IS Adawa, D Zhao, Z Xing, IJ Temitope", journal: "Big Earth Data", volume: "8(4), 703-731", year: 2024, citations: 9 },
  { title: "Drought assessment over Northern Africa using Multi-source satellite product", authors: "EO Abah, AP Ayodele, E Precious, R Noguchi, PA Omale", journal: "Remote Sensing Application II", volume: "", year: 2024, citations: 4 },
  { title: "Hybrid Statistical Downscaling in Reducing Bias in Drivers of Compound Wet-Warm Extremes During the West African Summer Monsoon Season", authors: "P Ebiendele, K Dairaku, P Adigun", journal: "Int. Conf. Mediterranean Geosciences Union", volume: "117-121", year: 2023, citations: 0 },
  { title: "The potential impact of increased urbanization on land surface temperature over South-West Nigeria", authors: "AI Seun, AP Ayodele, D Koji, SO Akande", journal: "Current Research in Environmental Sustainability", volume: "4, 100142", year: 2022, citations: 34 },
  { title: "CMIP6 multi-model evaluation of summer extreme precipitation over East Asia", authors: "AP Ayodele, EE Precious, ES Brhane, AI Seun", journal: "Modeling Earth Systems and Environment", volume: "8(4), 4749-4763", year: 2022, citations: 16 },
  { title: "Aerosol forcing dominating late-summer precipitation change over East Asia's transitional climatic zone in CMIP6 model simulation", authors: "P Adigun, K Dairaku, P Ebiendele", journal: "Int. Conf. Mediterranean Geosciences Union", volume: "245-250", year: 2022, citations: 3 },
  { title: "Potential impact of increased urbanization on surface temperature in southwestern Nigeria", authors: "P Adigun, K Dairaku", journal: "Annual Conference Proceedings, Japan", volume: "", year: 2022, citations: 3 },
  { title: "Dynamic and Thermodynamic component controlling Anthropogenic signal attributed to Extreme precipitation over east Asia in CMIP6 model simulation", authors: "P Adigun, D Koji", journal: "AGU Fall Meeting Abstracts", volume: "A41A-03", year: 2022, citations: 0 },
  { title: "Added Value of Bias Adjusted and statistical downscaled ISIMIP Models in Simulating Extreme Precipitation Characteristics over West Africa", authors: "PE Ebiendele, PA Adigun, LC Ezekwe, IA Rhaji, HM Doko", journal: "", volume: "", year: 2022, citations: 1 },
  { title: "Seasonal rainfall prediction in Lagos, Nigeria using artificial neural network", authors: "AP Ayodele, EE Precious", journal: "Asian Journal of Research in Computer Science", volume: "3(4), 1-10", year: 2019, citations: 18 },
];

const metrics = { citations: 151, hIndex: 8, i10Index: 7 };

const researchAreas = [
  { icon: "◈", title: "Solar & Renewable Energy", desc: "CMIP6 ensemble projections of photovoltaic energy potential, dust-radiation interactions, and climate change impacts on solar power planning across Africa.", tags: ["CMIP6", "Photovoltaics", "Africa"] },
  { icon: "◇", title: "Climate Extremes & Heatwaves", desc: "Intensification of human-driven heatwaves, extreme precipitation dynamics, and heat-related mortality attribution over Africa and East Asia.", tags: ["Heatwaves", "Mortality", "Attribution"] },
  { icon: "△", title: "Drought Analysis & Monitoring", desc: "Multi-scale drought variability using SPEI approaches, teleconnection influences, and evaporative demand indices across Africa, Asia, and China.", tags: ["SPEI", "Teleconnection", "Drought"] },
  { icon: "○", title: "Deep Learning for Climate", desc: "Physics-constrained deep learning for bias correction of solar radiation, statistical downscaling of West African monsoon precipitation.", tags: ["Deep Learning", "Bias Correction", "Downscaling"] },
  { icon: "□", title: "Urbanization & Land Surface", desc: "Assessing land surface temperature changes driven by urbanization in South-West Nigeria using remote sensing and climate models.", tags: ["LST", "Urbanization", "Nigeria"] },
  { icon: "▽", title: "Wind Energy Potential", desc: "Future wind farm development potential across Africa using bias-corrected NEX-GDDP-CMIP6 wind projections and sustainability analysis.", tags: ["Wind Energy", "NEX-GDDP", "Projections"] },
];

const cvData = {
  education: [
    { degree: "Ph.D. Candidate", field: "Climate Science / Atmospheric Sciences", institution: "University of Tsukuba, Japan", period: "Current", details: "Research on CMIP6 climate modeling, renewable energy projections, and extreme weather attribution" },
  ],
  experience: [
    { role: "Research Associate", org: "University of Tsukuba", period: "Current", details: "Climate modeling, deep learning for bias correction, solar and wind energy projections under climate change scenarios" },
  ],
  skills: [
    "CMIP6 Climate Models", "Python / R", "Deep Learning (Physics-constrained)", "Remote Sensing", "Statistical Downscaling", "GIS & Spatial Analysis", "SPEI Drought Analysis", "Scientific Writing"
  ],
};

// ============================================================
// COLORS
// ============================================================
const C = {
  navy: "#0B1D3A",
  navyLight: "#132B52",
  navyMid: "#1A3A6B",
  gold: "#C8982E",
  goldLight: "#E8C36A",
  goldPale: "#FBF4E4",
  cream: "#FAF8F4",
  warmWhite: "#FEFDFB",
  text: "#1a1a1a",
  textMid: "#4a4a4a",
  textLight: "#7a7a7a",
  border: "#E8E4DD",
};

// ============================================================
// SHARED COMPONENTS
// ============================================================
function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(11,29,58,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.4s", padding: scrolled ? "10px 48px" : "16px 48px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <button onClick={() => setPage("Home")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20,
        color: scrolled ? C.goldLight : "#fff", transition: "color 0.3s",
      }}>Paul Adigun</button>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {["Home", "Research", "Publications", "CV", "Contact"].map((p) => (
          <button key={p} onClick={() => setPage(p)} style={{
            background: page === p ? (scrolled ? "rgba(200,152,46,0.15)" : "rgba(255,255,255,0.12)") : "none",
            border: "none", cursor: "pointer", padding: "7px 16px", borderRadius: 6,
            fontFamily: "'DM Sans', sans-serif", fontWeight: page === p ? 600 : 400,
            fontSize: 13, transition: "all 0.3s",
            color: page === p ? (scrolled ? C.goldLight : "#fff") : (scrolled ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.55)"),
          }}>{p}</button>
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
          <div style={{ fontSize: 13 }}>Climate Scientist · University of Tsukuba</div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {["Home", "Research", "Publications", "CV", "Contact"].map((p) => (
            <button key={p} onClick={() => { setPage(p); window.scrollTo(0, 0); }} style={{
              background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans'", fontSize: 13,
            }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1000, margin: "28px auto 0", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span>© {new Date().getFullYear()} Paul Adigun</span>
        <span>pauladigun.com</span>
      </div>
    </footer>
  );
}

function Label({ children }) {
  return <p style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: 3.5, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>{children}</p>;
}

function PageHeader({ label, title, subtitle }) {
  return (
    <section style={{ padding: "160px 48px 60px", background: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyLight} 100%)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Label>{label}</Label>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 580, lineHeight: 1.7, fontWeight: 300 }}>{subtitle}</p>}
      </div>
    </section>
  );
}

// ============================================================
// PAGES
// ============================================================
function HomePage({ setPage }) {
  return (
    <div>
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyLight} 45%, ${C.navyMid} 100%)`,
        position: "relative", overflow: "hidden", padding: "120px 48px 80px",
      }}>
        <div style={{ position: "absolute", top: "8%", right: "6%", width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.07)" }} />
        <div style={{ position: "absolute", top: "13%", right: "9%", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.04)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "4%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(200,152,46,0.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(200,152,46,0.03) 0%, transparent 60%)" }} />

        <div style={{ maxWidth: 780, position: "relative", zIndex: 2 }}>
          <div style={{ width: 56, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)`, marginBottom: 28 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 64, fontWeight: 700, lineHeight: 1.05, color: "#fff", marginBottom: 10, letterSpacing: "-1px" }}>
            Paul Adigun
          </h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 500, color: C.goldLight, letterSpacing: 2, marginBottom: 28, textTransform: "uppercase" }}>
            Climate Scientist · University of Tsukuba, Japan
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 600, fontWeight: 300 }}>
            Investigating the intersections of <span style={{ color: C.goldLight, fontWeight: 500 }}>climate change</span>,{" "}
            <span style={{ color: C.goldLight, fontWeight: 500 }}>renewable energy</span>, and{" "}
            <span style={{ color: C.goldLight, fontWeight: 500 }}>extreme weather</span>{" "}
            across Africa and Asia — using CMIP6 models, deep learning, and satellite observations.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            <button onClick={() => setPage("Publications")} style={{
              background: C.gold, color: C.navy, border: "none", cursor: "pointer",
              padding: "12px 28px", borderRadius: 6, fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14,
            }}>View Publications</button>
            <button onClick={() => setPage("Contact")} style={{
              background: "transparent", color: "rgba(255,255,255,0.8)", cursor: "pointer",
              border: "1.5px solid rgba(255,255,255,0.2)", padding: "12px 28px", borderRadius: 6,
              fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14,
            }}>Get in Touch</button>
          </div>

          <div style={{
            display: "flex", marginTop: 56, background: "rgba(255,255,255,0.04)", borderRadius: 10,
            overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", width: "fit-content",
          }}>
            {[{ l: "Citations", v: metrics.citations }, { l: "h-index", v: metrics.hIndex }, { l: "i10-index", v: metrics.i10Index }, { l: "Publications", v: publications.length }].map((m, i) => (
              <div key={m.l} style={{ textAlign: "center", padding: "18px 28px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: C.goldLight, fontFamily: "'DM Sans'" }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans'", fontWeight: 500, marginTop: 3 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Preview */}
      <section style={{ padding: "80px 48px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Research Highlights</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 34, fontWeight: 700, marginBottom: 40, color: C.navy }}>Areas of Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {researchAreas.slice(0, 3).map((a, i) => (
              <div key={i} onClick={() => setPage("Research")} style={{
                padding: 28, borderRadius: 10, background: C.warmWhite, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.3s",
              }}>
                <div style={{ fontSize: 20, color: C.gold, marginBottom: 14, fontWeight: 700 }}>{a.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 700, marginBottom: 8, color: C.navy }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.65, fontWeight: 300 }}>{a.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => setPage("Research")} style={{
              background: "none", border: `1.5px solid ${C.navy}`, color: C.navy,
              padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13.5,
            }}>View All Research Areas →</button>
          </div>
        </div>
      </section>

      {/* Recent Pubs */}
      <section style={{ padding: "80px 48px", background: C.warmWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Latest Work</Label>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 34, fontWeight: 700, marginBottom: 40, color: C.navy }}>Recent Publications</h2>
          {publications.slice(0, 5).map((pub, i) => (
            <div key={i} style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.45, marginBottom: 5, color: C.navy }}>{pub.title}</h4>
                <p style={{ fontSize: 13, color: C.textLight, fontFamily: "'DM Sans'" }}>{pub.authors}</p>
                <p style={{ fontSize: 13, color: C.textMid, fontStyle: "italic", marginTop: 2 }}>{pub.journal}</p>
              </div>
              <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13, color: C.gold, flexShrink: 0 }}>{pub.year}</span>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => setPage("Publications")} style={{
              background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6,
              cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14,
            }}>View All Publications →</button>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {researchAreas.map((area, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 12, background: C.warmWhite, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(200,152,46,0.04)" }} />
                <div style={{
                  fontSize: 24, color: C.gold, marginBottom: 16, fontWeight: 700,
                  width: 44, height: 44, borderRadius: 8, background: C.goldPale,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{area.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans'", fontSize: 18, fontWeight: 700, marginBottom: 10, color: C.navy }}>{area.title}</h3>
                <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>{area.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {area.tags.map((tag) => (
                    <span key={tag} style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontFamily: "'DM Sans'", fontWeight: 600, color: C.navyMid, background: "rgba(11,29,58,0.05)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 60, padding: 40, background: C.warmWhite, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <Label>Keywords</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
              {["Extreme Attribution", "Pollution Modelling", "CMIP6", "Deep Learning", "Solar Energy", "Drought", "Climate Change", "Africa", "East Asia", "Renewable Energy", "Heatwaves", "Photovoltaics", "Statistical Downscaling", "SPEI", "Wind Energy", "Saharan Dust", "Monsoon", "Remote Sensing", "Urbanization"].map((tag) => (
                <span key={tag} style={{ padding: "8px 18px", borderRadius: 24, fontSize: 13, fontFamily: "'DM Sans'", fontWeight: 500, color: C.navy, background: C.goldPale, border: "1px solid rgba(200,152,46,0.2)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PublicationsPage() {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("year");

  const sorted = [...publications].sort((a, b) => sortBy === "year" ? (b.year - a.year || b.citations - a.citations) : b.citations - a.citations);
  const display = showAll ? sorted : sorted.slice(0, 10);

  const yearCounts = {};
  publications.forEach((p) => { yearCounts[p.year] = (yearCounts[p.year] || 0) + 1; });
  const chartYears = Object.keys(yearCounts).sort();
  const maxCount = Math.max(...Object.values(yearCounts));

  return (
    <div>
      <section style={{ padding: "160px 48px 60px", background: `linear-gradient(165deg, ${C.navy} 0%, ${C.navyLight} 100%)` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Label>Publications</Label>
          <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 48, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Selected Works</h1>
          <div style={{ display: "flex", gap: 32 }}>
            {[{ l: "Total Citations", v: metrics.citations }, { l: "h-index", v: metrics.hIndex }, { l: "i10-index", v: metrics.i10Index }, { l: "Publications", v: publications.length }].map((m) => (
              <div key={m.l}>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.goldLight, fontFamily: "'DM Sans'" }}>{m.v}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans'", marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 48px 100px", background: C.cream }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Chart */}
          <div style={{ marginBottom: 48, padding: 28, background: C.warmWhite, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: C.textLight, marginBottom: 20, letterSpacing: 2, textTransform: "uppercase" }}>Publications per Year</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
              {chartYears.map((year) => {
                const count = yearCounts[year];
                const h = (count / maxCount) * 65 + 10;
                return (
                  <div key={year} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 4, fontFamily: "'DM Sans'" }}>{count}</div>
                    <div style={{ width: "100%", maxWidth: 44, height: h, background: `linear-gradient(180deg, ${C.gold}, ${C.navy})`, borderRadius: "5px 5px 0 0" }} />
                    <div style={{ fontSize: 10, color: C.textLight, marginTop: 5, fontFamily: "'DM Sans'" }}>{year}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 24 }}>
            {["year", "citations"].map((s) => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                fontFamily: "'DM Sans'", padding: "6px 18px", borderRadius: 20,
                border: sortBy === s ? `1.5px solid ${C.navy}` : `1.5px solid ${C.border}`,
                background: sortBy === s ? C.navy : "#fff", color: sortBy === s ? "#fff" : C.textMid,
                cursor: "pointer", fontSize: 12.5, fontWeight: 600, textTransform: "capitalize",
              }}>By {s}</button>
            ))}
          </div>

          {/* List */}
          {display.map((pub, i) => (
            <div key={i} style={{
              padding: "22px 24px", marginBottom: 2, borderLeft: "3px solid transparent",
              borderRadius: "0 8px 8px 0", background: i % 2 === 0 ? C.warmWhite : "transparent",
              display: "flex", justifyContent: "space-between", gap: 20, transition: "all 0.25s", cursor: "default",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = C.gold; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "transparent"; }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.45, marginBottom: 5, color: C.navy }}>{pub.title}</h4>
                <p style={{ fontSize: 12.5, color: C.textLight, fontFamily: "'DM Sans'" }}>{pub.authors}</p>
                <p style={{ fontSize: 12.5, color: C.textMid, fontStyle: "italic", marginTop: 2 }}>{pub.journal}{pub.volume ? `, ${pub.volume}` : ""}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, minWidth: 55 }}>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13, color: C.gold }}>{pub.year}</div>
                {pub.citations > 0 && <div style={{ fontSize: 11, color: C.textLight, fontFamily: "'DM Sans'", marginTop: 3 }}>{pub.citations} cited</div>}
              </div>
            </div>
          ))}

          {publications.length > 10 && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={() => setShowAll(!showAll)} style={{
                background: "none", border: `1.5px solid ${C.navy}`, color: C.navy,
                padding: "10px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13.5,
              }}>{showAll ? "Show Less" : `Show All ${publications.length} Publications`}</button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="https://scholar.google.com/citations?user=PAUL_SCHOLAR_ID" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans'", fontSize: 13, color: C.gold, fontWeight: 600 }}>View on Google Scholar ↗</a>
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
          <button style={{
            marginBottom: 40, background: C.gold, color: C.navy, border: "none",
            padding: "12px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14,
          }}>⬇ Download Full CV (PDF)</button>

          <div style={{ marginBottom: 48 }}>
            <Label>Education</Label>
            {cvData.education.map((e, i) => (
              <div key={i} style={{ padding: 28, background: C.warmWhite, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans'", fontSize: 17, fontWeight: 700, color: C.navy }}>{e.degree}</h3>
                    <p style={{ fontSize: 14, color: C.gold, fontWeight: 600, marginTop: 2 }}>{e.field}</p>
                    <p style={{ fontSize: 14, color: C.textMid, marginTop: 4 }}>{e.institution}</p>
                    <p style={{ fontSize: 13, color: C.textLight, marginTop: 6, lineHeight: 1.6 }}>{e.details}</p>
                  </div>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: C.textLight }}>{e.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 48 }}>
            <Label>Experience</Label>
            {cvData.experience.map((e, i) => (
              <div key={i} style={{ padding: 28, background: C.warmWhite, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans'", fontSize: 17, fontWeight: 700, color: C.navy }}>{e.role}</h3>
                    <p style={{ fontSize: 14, color: C.gold, fontWeight: 600, marginTop: 2 }}>{e.org}</p>
                    <p style={{ fontSize: 13, color: C.textLight, marginTop: 6, lineHeight: 1.6 }}>{e.details}</p>
                  </div>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, color: C.textLight }}>{e.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label>Technical Skills</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {cvData.skills.map((s) => (
                <span key={s} style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13.5, fontFamily: "'DM Sans'", fontWeight: 600, color: C.navy, background: C.warmWhite, border: `1px solid ${C.border}` }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 60, padding: 32, borderRadius: 12, background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 8 }}>Need the complete CV?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 20, fontFamily: "'DM Sans'" }}>
              Download the full PDF with publication list, conferences, and teaching experience.
            </p>
            <button style={{ background: C.gold, color: C.navy, border: "none", padding: "12px 28px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 14 }}>⬇ Download CV</button>
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
              { label: "Email", value: "paul.adigun@example.com", icon: "✉", href: "mailto:paul.adigun@example.com" },
              { label: "Google Scholar", value: "View Profile", icon: "📚", href: "https://scholar.google.com/citations?user=PAUL_SCHOLAR_ID" },
              { label: "Affiliation", value: "University of Tsukuba", icon: "🏛", href: null },
              { label: "Location", value: "Tsukuba, Japan", icon: "📍", href: null },
            ].map((item) => {
              const card = (
                <div style={{ padding: 24, borderRadius: 12, background: C.warmWhite, border: `1px solid ${C.border}`, cursor: item.href ? "pointer" : "default" }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: C.navy }}>{item.value}</p>
                </div>
              );
              return item.href ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{card}</a> : <div key={item.label}>{card}</div>;
            })}
          </div>

          <div style={{ padding: 40, borderRadius: 12, textAlign: "center", background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})` }}>
            <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 24, color: "#fff", fontWeight: 600, marginBottom: 8 }}>Interested in collaborating?</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24, fontFamily: "'DM Sans'", lineHeight: 1.6 }}>
              I'm always excited to connect with fellow researchers working on climate, energy, and computational earth science.
            </p>
            <a href="mailto:paul.adigun@example.com" style={{ textDecoration: "none" }}>
              <button style={{ background: C.gold, color: C.navy, border: "none", padding: "14px 36px", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 15 }}>✉ Send an Email</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function PaulAdigunWebsite() {
  const [page, setPage] = useState("Home");
  const changePage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", background: C.cream, color: C.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=Source+Serif+4:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: ${C.navy}; color: ${C.goldLight}; }
        body { overflow-x: hidden; }
      `}</style>
      <NavBar page={page} setPage={changePage} />
      <main key={page}>{page === "Home" && <HomePage setPage={changePage} />}{page === "Research" && <ResearchPage />}{page === "Publications" && <PublicationsPage />}{page === "CV" && <CVPage />}{page === "Contact" && <ContactPage />}</main>
      <Footer setPage={changePage} />
    </div>
  );
}
