import { useState, useMemo, useRef, useEffect } from "react";
import * as Icon from "./icons.jsx";
import { QUESTIONS, questionOf, FIGURES } from "./programme.js";
import { SCHOLAR_URL } from "./data.js";

const BASE = import.meta.env.BASE_URL;
const doiKey = (p) => (p.doi || "").replace("https://doi.org/", "");

/* A figure that hides itself if the file has not been added yet. */
function PaperFigure({ p }) {
  const f = FIGURES[doiKey(p)];
  const [ok, setOk] = useState(true);
  if (!f || !ok) return null;
  return (
    <figure className="map-fig">
      <img src={BASE + "figures/" + f.file} alt={f.caption} loading="lazy" onError={() => setOk(false)} />
      <figcaption>{f.caption}</figcaption>
    </figure>
  );
}

/* ---------- Research map: every paper placed on a timeline, one row per question ---------- */
export function ResearchMap({ pubs, focus, setFocus }) {
  const [sel, setSel] = useState(null);
  const placed = useMemo(
    () => pubs.map((p) => ({ ...p, q: questionOf(p) })).filter((p) => p.q && p.year),
    [pubs]
  );
  const years = useMemo(() => {
    const ys = placed.map((p) => p.year);
    const lo = Math.min(...ys), hi = Math.max(...ys);
    return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  }, [placed]);

  const PAD_L = 26, PAD_R = 22, PAD_T = 18, ROW = 84, COL = 73;
  const W = PAD_L + years.length * COL + PAD_R;
  const H = PAD_T + QUESTIONS.length * ROW + 36;
  const x = (y) => PAD_L + (y - years[0]) * COL + COL / 2;
  const r = () => 9;

  // spread papers that share a cell so they do not overlap
  const cells = {};
  placed.forEach((p) => { const k = p.q + p.year; (cells[k] = cells[k] || []).push(p); });
  const dots = [];
  Object.values(cells).forEach((list) => {
    const n = list.length;
    list.forEach((p, i) => {
      const qi = QUESTIONS.findIndex((q) => q.id === p.q);
      const cy = PAD_T + qi * ROW + ROW / 2;
      const spread = Math.min(COL - 18, 18 * (n - 1));
      const cx = x(p.year) - spread / 2 + (n > 1 ? (spread / (n - 1)) * i : 0);
      dots.push({ p, cx, cy, rr: r() });
    });
  });

  const pick = (p) => { setSel(p); setFocus(p.q); };
  const active = sel || null;
  const panelRef = useRef(null);
  useEffect(() => { if (sel && panelRef.current) panelRef.current.focus({ preventScroll: true }); }, [sel]);
  // On narrow screens the map scrolls sideways; open on the most recent years, where the work is.
  const scrollRef = useRef(null);
  useEffect(() => { const el = scrollRef.current; if (el) el.scrollLeft = el.scrollWidth; }, [placed.length]);

  return (
    <div className="rmap">
      <div className="rmap-filters" role="group" aria-label="Filter by research question">
        <button type="button" className={!focus ? "on" : ""} aria-pressed={!focus} onClick={() => { setFocus(null); setSel(null); }}>All work</button>
        {QUESTIONS.map((q, i) => (
          <button key={q.id} type="button" className={focus === q.id ? "on" : ""} aria-pressed={focus === q.id} onClick={() => { setFocus(focus === q.id ? null : q.id); setSel(null); }}>
            <span className="rmap-qn">{i + 1}</span>{q.short}
          </button>
        ))}
      </div>

      <div className="rmap-frame">
        <div className="rmap-labels" aria-hidden="true" style={{ height: H }}>
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className={"rmap-label" + (focus && focus !== q.id ? " dim" : "")} style={{ top: PAD_T + i * ROW + ROW / 2 }}>
              <span className="rmap-qn">{i + 1}</span>{q.short}
            </div>
          ))}
        </div>
      <div className="rmap-scroll" ref={scrollRef}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="rmap-svg" role="img"
          aria-label={`Research map: publications from ${years[0]} to ${years[years.length - 1]}, placed on three programme questions.`}>
          {QUESTIONS.map((q, i) => {
            const cy = PAD_T + i * ROW + ROW / 2;
            const dim = focus && focus !== q.id;
            return (
              <g key={q.id} className={dim ? "rmap-row dim" : "rmap-row"}>
                <line x1={PAD_L} y1={cy} x2={W - PAD_R} y2={cy} className="rmap-rule" />
              </g>
            );
          })}
          {years.map((y) => (
            <text key={y} x={x(y)} y={H - 10} textAnchor="middle" className="rmap-year">{y}</text>
          ))}
          {dots.map(({ p, cx, cy, rr }) => {
            const dim = focus && focus !== p.q;
            const on = active && active.title === p.title;
            return (
              <g key={p.title} className={"rmap-dot" + (dim ? " dim" : "") + (on ? " on" : "")} role="button" tabIndex={dim ? -1 : 0}
                aria-label={`${p.title}, ${p.journal}, ${p.year}`}
                onClick={() => pick(p)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(p); } }}>
                <circle cx={cx} cy={cy} r={rr + 6} className="rmap-hit" />
                <circle cx={cx} cy={cy} r={rr} className="rmap-mark" />
              </g>
            );
          })}
        </svg>
      </div>
      </div>
      <p className="rmap-key">Each circle is a publication. Select one to read about it, or select a question to filter the bibliography below.</p>

      {active && (
        <div className="rmap-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
          <div className="rmap-panel-head">
            <p className="rmap-panel-q">{QUESTIONS.find((q) => q.id === active.q).label}</p>
            <button type="button" className="rmap-close" onClick={() => setSel(null)} aria-label="Close">Close</button>
          </div>
          <h3>{active.title}</h3>
          <p className="rmap-meta">
            <em>{active.journal}</em>, {active.year}
            {active.authors && <> · {active.authors}</>}
          </p>
          <PaperFigure p={active} />
          <a className="text-link" href={active.doi || active.link || SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
            {active.doi ? "Read at the publisher" : "View on Google Scholar"}<Icon.External width={15} height={15} />
          </a>
        </div>
      )}
    </div>
  );
}

