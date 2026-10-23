import { useState, useEffect, useMemo, useRef } from "react";
import "./styles.css";
import * as Icon from "./icons.jsx";
import { SCHOLAR_URL, RG_URL, GITHUB_URL, EMAIL } from "./data.js";
import { AREAS, areaOf } from "./areas.js";
import { IMAGES } from "./images.js";
import { NEWS } from "./news.js";
import { useScholar, bibtex, doiKey } from "./scholar.js";
import { figureFor } from "./figures.js";
import { QUESTIONS, questionOf } from "./programme.js";
import { ResearchMap } from "./ResearchMap.jsx";

const BASE = import.meta.env.BASE_URL;

/* ---------------- Routing (hash based, works on GitHub Pages) ---------------- */
function useRoute() {
  const read = () => {
    const h = (window.location.hash || "#/").replace(/^#\/?/, "");
    const [page, arg] = h.split("/");
    return { page: page || "home", arg: arg || "" };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const h = () => { setRoute(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
}
const href = (page, arg) => "#/" + (page === "home" ? "" : page) + (arg ? "/" + arg : "");

/* ---------------- Photo that prefers the local file, then Commons ---------------- */
function Photo({ id, className, eager }) {
  const im = IMAGES[id];
  const [src, setSrc] = useState(BASE + "images/" + im.file);
  return (
    <img className={className} src={src} alt={im.alt} loading={eager ? "eager" : "lazy"} decoding="async" style={im.crop === "left" ? { width: "200%", maxWidth: "none", objectPosition: "left center" } : im.position ? { objectPosition: im.position } : undefined}
      onError={() => { if (src !== im.url) setSrc(im.url); }} />
  );
}

/* ---------------- Figure from a paper: local file first, then the publisher ---------------- */
function Figure({ fig, className }) {
  const [src, setSrc] = useState(BASE + "figures/" + fig.file);
  return <img className={className} src={src} alt={fig.caption} loading="lazy" decoding="async" onError={() => { if (src !== fig.url) setSrc(fig.url); }} />;
}

/* ---------------- Header ---------------- */
const NAV = [
  ["about", "About"],
  ["areas", "Areas of focus"],
  ["map", "Research map"],
  ["research", "Publications"],
  ["news", "News"],
  ["contact", "Contact"],
];

function Header({ page }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [page]);
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span>Climate scientist. Physics-constrained machine learning for Africa's climate and energy future.</span>
          <nav aria-label="Profiles">
            <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href={RG_URL} target="_blank" rel="noopener noreferrer">ResearchGate</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href={href("home")} className="wordmark" aria-label="Paul Adigun, home">
            <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path d="M8 24c4-6 8-9 12-9s8 3 12 9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M11 29c3-3 6-4.5 9-4.5s6 1.5 9 4.5" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="20" cy="12" r="2.6" fill="var(--accent)" />
            </svg>
            <span><strong>Paul Adigun</strong><em>PhD</em></span>
          </a>
          <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            {open ? <Icon.Close /> : <Icon.Menu />}<span className="sr-only">Menu</span>
          </button>
          <nav id="site-nav" className={"site-nav" + (open ? " open" : "")} aria-label="Site">
            {NAV.map(([id, label]) => (
              <a key={id} href={href(id)} className={page === id || (id === "areas" && page === "area") ? "current" : ""} aria-current={page === id ? "page" : undefined}>{label}</a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------------- Hero slider ---------------- */
const SLIDES = [
  { image: "aerosols", kicker: "Machine learning for climate", title: "Climate models corrected by machine learning that keeps the physics intact", text: "PhysConDL removes 70 to 85 percent of the solar-radiation bias in CMIP6 models over Africa while preserving the links between radiation, cloud and aerosol.", link: href("area", "machine-learning"), cta: "Read about the work" },
  { image: "solar", kicker: "Renewable energy", title: "Africa's power pools could fail together as the climate warms", text: "Under high emissions, the West and Central African pools each face more than 100 synchronised low-output days a year.", link: href("area", "solar-and-wind-energy"), cta: "Read about the work" },
  { image: "dust", kicker: "Dust and aerosols", title: "Doubling Saharan dust cuts solar potential by up to a tenth", text: "Across the Sahara and Sahel, dust and cloud interactions amplify the loss well beyond what scattering alone would cause.", link: href("area", "dust-aerosols-and-rainfall"), cta: "Read about the work" },
  { image: "heatmap", kicker: "Heat and health", title: "Heat-related deaths in Africa could almost quintuple this century", text: "Human-driven heatwaves are intensifying, with projected mortality rising from about 9,000 to as many as 43,000 deaths a year.", link: href("area", "heat-and-compound-extremes"), cta: "Read about the work" },
];

function Hero() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const go = (d) => setI((x) => (x + d + n) % n);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 9000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured research">
      {SLIDES.map((s, k) => (
        <div key={s.image} className={"slide" + (k === i ? " on" : "")} aria-hidden={k !== i} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`}>
          <Photo id={s.image} className="slide-img" eager={k === 0} />
          <div className="wrap">
            <div className="slide-card">
              <p className="kicker">{s.kicker}</p>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <a className="btn" href={s.link} tabIndex={k === i ? 0 : -1}>{s.cta}</a>
            </div>
          </div>
        </div>
      ))}
      <div className="wrap slide-controls">
        <button type="button" className="arrow" onClick={() => go(-1)} aria-label="Previous"><Icon.ArrowLeft /></button>
        <button type="button" className="arrow" onClick={() => go(1)} aria-label="Next"><Icon.ArrowRight /></button>
      </div>
      <div className="dots" aria-hidden="true">{SLIDES.map((_, k) => <span key={k} className={k === i ? "on" : ""} />)}</div>
    </section>
  );
}

/* ---------------- Shared blocks ---------------- */
function SectionHead({ title, link, label, children }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {link && <a className="text-link" href={link}>{label}<Icon.ArrowRight width={16} height={16} /></a>}
      {children}
    </div>
  );
}

function Carousel({ children, label }) {
  const ref = useRef(null);
  const scroll = (d) => { const el = ref.current; if (el) el.scrollBy({ left: d * Math.round(el.clientWidth * 0.8), behavior: "smooth" }); };
  return (
    <div className="carousel">
      <div className="carousel-arrows">
        <button type="button" className="arrow" onClick={() => scroll(-1)} aria-label={"Scroll " + label + " back"}><Icon.ArrowLeft /></button>
        <button type="button" className="arrow" onClick={() => scroll(1)} aria-label={"Scroll " + label + " forward"}><Icon.ArrowRight /></button>
      </div>
      <div className="track" ref={ref}>{children}</div>
    </div>
  );
}

function areaForPub(p) {
  const k = doiKey(p);
  const t = " " + (p.title || "").toLowerCase() + " ";
  return AREAS.find((a) => (k && a.dois.includes(k)) || a.keys.some((w) => t.includes(w)));
}
function PubCard({ p, kicker = "Research", photo }) {
  const fig = photo ? figureFor(doiKey(p)) : null;
  const a = photo && !fig ? areaForPub(p) : null;
  return (
    <article className={"pub-card" + (fig || a ? " has-photo" : "")}>
      {fig && <Figure fig={fig} className="pub-fig" />}
      {a && <Photo id={a.image} className="pub-photo" />}
      <p className="kicker">{kicker}</p>
      <h3><a href={p.doi || p.link || SCHOLAR_URL} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
      <p className="meta">{p.journal}{p.year && <> / {p.year}</>}</p>
    </article>
  );
}

function AreaTiles({ except }) {
  const list = AREAS.filter((a) => a.id !== except);
  return (
    <div className="tiles">
      {list.map((a) => (
        <a key={a.id} className="tile" href={href("area", a.id)}>
          <Photo id={a.image} className="tile-img" />
          <span className="tile-title">{a.title}</span>
        </a>
      ))}
    </div>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-grid">
        <div><h2>About the research</h2><a className="btn" href={href("about")}>Learn more</a></div>
        <div><h2>Collaborate</h2><a className="btn" href={href("contact")}>Work with me</a></div>
        <div><h2>Get in touch</h2><a className="btn" href={"mailto:" + EMAIL}>Email</a></div>
      </div>
    </section>
  );
}

/* ---------------- Home ---------------- */
function Home({ pubs }) {
  const recent = pubs.filter((p) => questionOf(p) && p.type === "Journal article").slice(0, 9);
  const news = NEWS.slice(0, 6);
  return (
    <>
      <Hero />
      <section className="intro">
        <div className="wrap intro-grid">
          <h2>Climate projections that planners can trust, for a continent that cannot afford to get them wrong</h2>
          <div>
            <p>I build physics-constrained machine learning that corrects and downscales global climate models, and I use it to ask how warming reshapes Africa's renewable energy, water and heat risks. Machine learning is the method; every other area on this site is where it is put to work.</p>
            <div className="btn-row"><a className="btn" href={href("areas")}>Explore the areas of focus</a><a className="btn btn-ghost" href={href("about")}>About</a></div>
          </div>
        </div>
      </section>

      <section className="band band-research">
        <div className="wrap">
          <SectionHead title="Featured research" link={href("research")} label="All publications" />
          <Carousel label="research">
            {recent.map((p) => <PubCard key={p.title} p={p} kicker="Featured research" photo />)}
          </Carousel>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <SectionHead title="News and insights" link={href("news")} label="All news" />
          <Carousel label="news">
            {news.map((n) => <NewsCard key={n.title} n={n} />)}
          </Carousel>
        </div>
      </section>

      <section className="band band-areas">
        <div className="wrap">
          <SectionHead title="Areas of focus" />
          <AreaTiles />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function NewsCard({ n }) {
  const a = areaOf(n.area);
  const d = new Date(n.date + "T00:00:00");
  const date = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="news-card">
      {a && <Photo id={a.image} className="news-img" />}
      <div className="news-body">
        <p className="kicker">{n.kind}</p>
        <h3>{n.link ? <a href={n.link} target="_blank" rel="noopener noreferrer">{n.title}</a> : n.title}</h3>
        <p className="meta">{date}</p>
      </div>
    </article>
  );
}

/* ---------------- Areas index ---------------- */
function Areas() {
  return (
    <>
      <PageHead title="Areas of focus" intro="Six connected questions, from the physics of the models to the people and power systems on the receiving end." />
      <section className="band">
        <div className="wrap area-list">
          {AREAS.map((a) => (
            <a key={a.id} className="area-row" href={href("area", a.id)}>
              <Photo id={a.image} className="area-row-img" />
              <div>
                <h2>{a.title}</h2>
                <p>{a.short}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function PageHead({ title, intro, image, kicker }) {
  return (
    <section className={"page-head" + (image ? " has-img" : "")}>
      {image && <Photo id={image} className="page-head-img" eager />}
      <div className="wrap">
        <div className="page-head-card">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- One area ---------------- */
function Area({ id, pubs }) {
  const a = areaOf(id);
  if (!a) return <NotFound />;
  const mine = pubs.filter((p) => {
    const k = doiKey(p);
    if (k && a.dois.includes(k)) return true;
    const t = " " + p.title.toLowerCase() + " ";
    return !(questionOf(p) === null) && a.keys.some((w) => t.includes(w));
  });
  const feat = a.featured ? pubs.find((p) => doiKey(p) === a.featured) : null;
  const featFig = a.featured ? figureFor(a.featured) : null;
  const pair = a.dois.map((d) => [d, figureFor(d)]).filter(([, f]) => f).slice(0, 2);
  const news = NEWS.filter((n) => n.area === a.id);
  return (
    <>
      <PageHead title={a.title} intro={a.lede} image={a.image} kicker="Area of focus" />
      <section className="band">
        <div className="wrap area-grid">
          <div className="prose">
            <p>{a.body[0]}</p>
            <blockquote className="callout">{a.callout}</blockquote>
            <p>{a.body[1]}</p>
            {pair.length > 0 && (
              <div className={"fig-pair" + (pair.length === 1 ? " single" : "")}>
                {pair.map(([d, f]) => (
                  <figure key={d}>
                    <a href={"https://doi.org/" + d} target="_blank" rel="noopener noreferrer"><Figure fig={f} className="pair-fig" /></a>
                    <figcaption>{f.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {a.body.slice(2).map((t, k) => <p key={k}>{t}</p>)}
          </div>
          <aside className="area-side">
            {feat && (
              <div className="feat-card">
                <p className="kicker">Featured research</p>
                {featFig ? <Figure fig={featFig} className="feat-fig" /> : <Photo id={a.image} className="feat-photo" />}
                <h3><a href={feat.doi} target="_blank" rel="noopener noreferrer">{feat.title}</a></h3>
                <p className="meta">{feat.journal} / {feat.year}</p>
                <a className="btn btn-small" href={feat.doi} target="_blank" rel="noopener noreferrer">View research</a>
              </div>
            )}
            <div className="side-map">
              <p className="kicker">Research map</p>
              <p>See where this work sits across the whole programme.</p>
              <a className="btn btn-small btn-ghost" href={href("map")}>Explore the map</a>
            </div>
          </aside>
        </div>
      </section>
      {mine.length > 0 && (
        <section className="band band-research">
          <div className="wrap">
            <SectionHead title="Research in this area" link={href("research")} label="All publications" />
            <Carousel label="research">{mine.map((p) => <PubCard key={p.title} p={p} />)}</Carousel>
          </div>
        </section>
      )}
      {news.length > 0 && (
        <section className="band">
          <div className="wrap">
            <SectionHead title="News in this area" link={href("news")} label="All news" />
            <Carousel label="news">{news.map((n) => <NewsCard key={n.title} n={n} />)}</Carousel>
          </div>
        </section>
      )}
      <section className="band band-areas">
        <div className="wrap">
          <SectionHead title="Other areas of focus" />
          <AreaTiles except={a.id} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Research map page ---------------- */
function MapPage({ pubs }) {
  const [focus, setFocus] = useState(null);
  return (
    <>
      <PageHead title="Research map" intro="Every publication placed on a timeline, one row for each question the programme asks. Select a circle to read about the paper, or a question to filter." />
      <section className="band">
        <div className="wrap">
          <ResearchMap pubs={pubs} focus={focus} setFocus={setFocus} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Publications ---------------- */
function Research({ pubs, updated }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [copied, setCopied] = useState("");
  const types = ["All", "Journal article", "Preprint", "Conference", "Book chapter"];
  const list = useMemo(() => pubs.filter((p) => (type === "All" || p.type === type) && (!q || (p.title + " " + p.journal + " " + p.authors).toLowerCase().includes(q.toLowerCase()))), [pubs, q, type]);
  const years = [...new Set(list.map((p) => p.year))];
  const copy = (p) => { navigator.clipboard?.writeText(bibtex(p)).then(() => { setCopied(p.title); setTimeout(() => setCopied(""), 1500); }); };
  return (
    <>
      <PageHead title="Publications" intro="Synced from Google Scholar. Journal articles, preprints and conference papers, newest first." />
      <section className="band">
        <div className="wrap">
          <div className="pub-tools">
            <label className="search"><Icon.Search /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, journals, authors" aria-label="Search publications" /></label>
            <div className="chips" role="group" aria-label="Filter by type">
              {types.map((t) => <button key={t} type="button" className={type === t ? "on" : ""} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}
            </div>
          </div>
          {years.map((y) => (
            <div key={y} className="pub-year">
              <h2>{y || "Undated"}</h2>
              <ol className="pub-list">
                {list.filter((p) => p.year === y).map((p) => (
                  <li key={p.title}>
                    <h3><a href={p.doi || p.link || SCHOLAR_URL} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
                    {p.authors && <p className="authors"><Authors s={p.authors} /></p>}
                    <p className="meta"><em>{p.journal}</em>{p.type !== "Journal article" && <> / {p.type}</>}</p>
                    <div className="pub-actions">
                      {p.doi && <a className="text-link" href={p.doi} target="_blank" rel="noopener noreferrer">DOI<Icon.External width={14} height={14} /></a>}
                      <button type="button" className="text-btn" onClick={() => copy(p)}>{copied === p.title ? <><Icon.Check width={14} height={14} />Copied</> : <><Icon.Copy width={14} height={14} />BibTeX</>}</button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
          {list.length === 0 && <p className="empty">No publications match. Clear the search or choose another type.</p>}
          <p className="updated">{updated ? "Last synced from Google Scholar on " + updated + "." : ""} <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">Full profile on Google Scholar</a>.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function Authors({ s }) {
  return s.split(",").map((a, i, arr) => {
    const t = a.trim();
    const me = /^p\.?\s*adigun$/i.test(t) || /^adigun,?\s*p/i.test(t);
    return <span key={i}>{me ? <strong>{t}</strong> : t}{i < arr.length - 1 ? ", " : ""}</span>;
  });
}

/* ---------------- News ---------------- */
function News({ pubs }) {
  const fresh = pubs.filter((p) => questionOf(p) && p.type === "Journal article").slice(0, 5);
  return (
    <>
      <PageHead title="News and insights" intro="New papers, talks and milestones." />
      <section className="band">
        <div className="wrap news-grid">
          <div className="news-list">
            {NEWS.map((n) => <NewsRow key={n.title} n={n} />)}
          </div>
          <aside className="area-side">
            <div className="side-map">
              <p className="kicker">Latest publications</p>
              <ul className="side-pubs">
                {fresh.map((p) => <li key={p.title}><a href={p.doi || p.link || SCHOLAR_URL} target="_blank" rel="noopener noreferrer">{p.title}</a><span>{p.journal}, {p.year}</span></li>)}
              </ul>
              <a className="btn btn-small btn-ghost" href={href("research")}>All publications</a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
function NewsRow({ n }) {
  const a = areaOf(n.area);
  const d = new Date(n.date + "T00:00:00");
  return (
    <article className="news-row">
      {a && <Photo id={a.image} className="news-row-img" />}
      <div>
        <p className="kicker">{n.kind} / {d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <h2>{n.link ? <a href={n.link} target="_blank" rel="noopener noreferrer">{n.title}</a> : n.title}</h2>
        <p>{n.text}</p>
        {a && <a className="text-link" href={href("area", a.id)}>{a.title}<Icon.ArrowRight width={15} height={15} /></a>}
      </div>
    </article>
  );
}

/* ---------------- About ---------------- */
function Portrait() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img className="portrait" src={BASE + "portrait.jpg"} alt="Paul Adigun" onError={() => setOk(false)} />;
}
function About() {
  return (
    <>
      <PageHead title="About" intro="Climate scientist working at the junction of physics, machine learning and the decisions that depend on both." image="earth" />
      <section className="band">
        <div className="wrap about-grid">
          <Portrait />
          <div className="prose">
            <p>Paul Adigun is a climate scientist whose work makes climate-model output physically credible enough to plan with, and then uses it to ask how a warming climate reshapes Africa's renewable energy, water and heat risks.</p>
            <p>He completed his PhD in Engineering Mechanics and Energy at the University of Tsukuba, Japan, under Prof. Koji Dairaku, as a MEXT scholar. His doctoral work produced PhysConDL, a physics-constrained deep-learning framework that corrects systematic solar-radiation errors in CMIP6 models over Africa while preserving the physical relationships between radiation, cloud and aerosol, and it set the pattern for the rest of the programme: corrections that respect the physics, applied to questions that matter on the ground.</p>
            <p>His publications span renewable-energy meteorology, drought dynamics, heat and compound extremes, Saharan dust and tropical cyclones, in journals including npj Clean Energy, Communications Earth &amp; Environment, Renewable Energy, the Journal of Geophysical Research: Atmospheres, Solar Energy, Geoscience Frontiers, Climate Dynamics and Environmental Research: Climate. Current work extends the physics-constrained approach to tropical cyclone intensity and to convection-scale hail hazard and population exposure over Japan.</p>
            <p>He is originally from Nigeria.</p>
            <div className="btn-row">
              <a className="btn" href={BASE + "cv.pdf"} target="_blank" rel="noopener noreferrer"><Icon.Download width={16} height={16} />Download CV</a>
              <a className="btn btn-ghost" href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">Google Scholar<Icon.External width={15} height={15} /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="band band-areas">
        <div className="wrap">
          <SectionHead title="Areas of focus" />
          <AreaTiles />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <>
      <PageHead title="Get in touch" intro="For collaboration, data and code requests, talks, or questions about any of the papers." />
      <section className="band">
        <div className="wrap contact-grid">
          <div className="contact-card">
            <Icon.Mail width={28} height={28} />
            <h2>Email</h2>
            <p>The quickest route for anything research related.</p>
            <a className="btn" href={"mailto:" + EMAIL}>Send an email</a>
          </div>
          <div className="contact-card">
            <Icon.Scholar width={28} height={28} />
            <h2>Publications and profiles</h2>
            <p>Papers, preprints and code.</p>
            <div className="btn-row">
              <a className="btn btn-small btn-ghost" href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">Google Scholar</a>
              <a className="btn btn-small btn-ghost" href={RG_URL} target="_blank" rel="noopener noreferrer">ResearchGate</a>
              <a className="btn btn-small btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="contact-card">
            <Icon.Building width={28} height={28} />
            <h2>Affiliation</h2>
            <p>University of Tsukuba, Japan.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function NotFound() {
  return (
    <section className="band"><div className="wrap"><h1>Page not found</h1><p>That page does not exist. <a href={href("home")}>Go to the home page</a>.</p></div></section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const [credits, setCredits] = useState(false);
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="footer-name">Paul Adigun, PhD</p>
          <p>Climate science and physics-constrained machine learning.</p>
          <div className="footer-social">
            <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"><Icon.Scholar /></a>
            <a href={RG_URL} target="_blank" rel="noopener noreferrer" aria-label="ResearchGate"><Icon.ResearchGate /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon.GitHub /></a>
            <a href={"mailto:" + EMAIL} aria-label="Email"><Icon.Mail /></a>
          </div>
        </div>
        <nav aria-label="Footer"><ul>{[["home", "Home"], ...NAV].map(([id, l]) => <li key={id}><a href={href(id)}>{l}</a></li>)}</ul></nav>
        <nav aria-label="Areas of focus"><ul>{AREAS.map((a) => <li key={a.id}><a href={href("area", a.id)}>{a.title}</a></li>)}</ul></nav>
      </div>
      <div className="wrap footer-bottom">
        <p>&copy; {new Date().getFullYear()} Paul Adigun. Figures are from the linked open-access papers. <button type="button" className="text-btn light" onClick={() => setCredits(!credits)}>{credits ? "Hide photo credits" : "Photo credits"}</button></p>
        {credits && (
          <ul className="credits">
            {Object.values(IMAGES).map((im) => <li key={im.file}><a href={im.source} target="_blank" rel="noopener noreferrer">{im.alt}</a> {im.credit}, via Wikimedia Commons.</li>)}
          </ul>
        )}
      </div>
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  const { page, arg } = useRoute();
  const { pubs, updated } = useScholar();
  useEffect(() => {
    const titles = { home: "", about: "About", areas: "Areas of focus", area: areaOf(arg)?.title || "Area of focus", map: "Research map", research: "Publications", news: "News and insights", contact: "Contact" };
    document.title = (titles[page] ? titles[page] + " | " : "") + "Paul Adigun, PhD | Climate Scientist";
  }, [page, arg]);
  let body;
  switch (page) {
    case "home": body = <Home pubs={pubs} />; break;
    case "about": body = <About />; break;
    case "areas": body = <Areas />; break;
    case "area": body = <Area id={arg} pubs={pubs} />; break;
    case "map": body = <MapPage pubs={pubs} />; break;
    case "research": body = <Research pubs={pubs} updated={updated} />; break;
    case "news": body = <News pubs={pubs} />; break;
    case "contact": body = <Contact />; break;
    default: body = <NotFound />;
  }
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header page={page} />
      <main id="main">{body}</main>
      <Footer />
    </>
  );
}
