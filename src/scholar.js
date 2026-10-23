/* Live publication list from Google Scholar, synced weekly into
   public/scholar.json by scripts/update_scholar.py. No citation counts or
   metrics are read from the file or shown anywhere on the site. */
import { useState, useEffect } from "react";
import { FALLBACK_PUBS, DOI_MAP } from "./data.js";

const BASE = import.meta.env.BASE_URL;
const RAW_SCHOLAR = "https://raw.githubusercontent.com/pauladigun/pauladigun-site/main/public/scholar.json";

export function doiFor(title) {
  const t = (title || "").toLowerCase();
  const hit = DOI_MAP.find(([k]) => t.includes(k));
  return hit ? "https://doi.org/" + hit[1] : undefined;
}
export function pubType(j) {
  const s = (j || "").toLowerCase();
  if (/arxiv|egusphere|preprint|essoar|research square/.test(s)) return "Preprint";
  if (/conference|meeting|abstracts|proceeding|union|symposium/.test(s)) return "Conference";
  if (/chapter|perspective in|book/.test(s)) return "Book chapter";
  return "Journal article";
}
const slug = (s) => (s || "").toLowerCase().replace(/[^a-z]/g, "").slice(0, 60);

function normalise(list) {
  return list
    .filter((p) => (p.title || "").trim() && (p.year || p.journal))
    .map((p) => {
      const fb = FALLBACK_PUBS.find((q) => slug(q.title) === slug(p.title));
      const year = Number(p.year) || (fb && fb.year) || "";
      const journal = (p.journal || (fb && fb.journal) || "").replace(new RegExp(",?\\s*" + year + "\\s*$"), "").trim();
      return {
        title: p.title.trim().replace(/\.$/, ""),
        authors: p.authors || (fb && fb.authors) || "",
        journal,
        year,
        link: p.link || "",
        doi: doiFor(p.title),
        type: pubType(journal),
      };
    })
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

let cache = null;
const subs = new Set();
function loadScholar() {
  if (cache) return;
  const urls = [RAW_SCHOLAR, BASE + "scholar.json"];
  const tryUrl = (i) => {
    if (i >= urls.length) return;
    fetch(urls[i], { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("unavailable"); return r.json(); })
      .then((j) => {
        const pubs = normalise(j.publications || []);
        cache = { pubs: pubs.length ? pubs : normalise(FALLBACK_PUBS), updated: j.updated || "" };
        subs.forEach((f) => f());
      })
      .catch(() => tryUrl(i + 1));
  };
  tryUrl(0);
}
export function useScholar() {
  const [, force] = useState(0);
  useEffect(() => {
    const f = () => force((x) => x + 1);
    subs.add(f);
    loadScholar();
    return () => subs.delete(f);
  }, []);
  return cache || { pubs: normalise(FALLBACK_PUBS), updated: "" };
}

export function bibtex(p) {
  const authors = (p.authors || "P Adigun").split(",").map((a) => a.trim()).map((a) => (a === "et al." || a === "..." ? "others" : a)).filter(Boolean);
  const word = (p.title.toLowerCase().match(/[a-z]{5,}/) || ["paper"])[0];
  const lines = ["@article{adigun" + (p.year || "") + word, "  title = {" + p.title + "}", "  author = {" + authors.join(" and ") + "}", "  journal = {" + p.journal + "}", "  year = {" + p.year + "}"];
  if (p.doi) lines.push("  doi = {" + p.doi.replace("https://doi.org/", "") + "}");
  return lines.join(",\n") + "\n}";
}

export const doiKey = (p) => (p.doi || "").replace("https://doi.org/", "");
