/* Assigns each publication to one of the three programme questions used
   by the research map. First match wins, so every paper counts once. */

export const QUESTIONS = [
  { id: "q1", short: "Physical credibility", label: "How can climate projections be made more physically credible?",
    keys: ["physics-constrained", "deep learning", "downscaling", "neural network", "bias adjusted", "bias correction", "bias-corrected", "multi-model evaluation", "evaluation of"] },
  { id: "q2", short: "Energy and infrastructure", label: "How does climate change alter energy resources and infrastructure risk?",
    keys: ["photovoltaic", "solar", "wind energy", "wind farm", "power pool", "energy"] },
  { id: "q3", short: "Compound extremes", label: "How do changing atmospheric extremes create compound risk?",
    keys: ["drought", "evapotranspiration", "evaporative", "heatwave", "compound", "precipitation", "temperature", "rainfall", "aerosol", "dust", "cyclone", "typhoon", "monsoon", "urbanization"] },
];

const EXCLUDE = ["covid", "catalyst"]; // outside the climate programme

export function questionOf(p) {
  const t = " " + (p.title || "").toLowerCase() + " ";
  if (EXCLUDE.some((k) => t.includes(k))) return null;
  const q = QUESTIONS.find((x) => x.keys.some((k) => t.includes(k)));
  return q ? q.id : null;
}

/* Figures from the papers, keyed by DOI. A figure only renders when its
   file exists in public/figures/, so entries can be added ahead of files. */
export const FIGURES = {
  "10.1038/s44406-026-00027-7": { file: "npj-fig1.png", caption: "Figure 1 of the npj Clean Energy paper: vulnerability of the five African power pools to synchronised solar extremes." },
  "10.1016/j.renene.2025.124658": { file: "physcondl-architecture.jpg", caption: "The PhysConDL bias-correction pipeline, from the Renewable Energy paper." },
};

/* Figure gallery on the home page. Each is a real figure from a paper. */
export const GALLERY = [
  { file: "npj-fig1.png", doi: "10.1038/s44406-026-00027-7", title: "Three-tier vulnerability of Africa's power pools", caption: "Pool structure, vulnerability ranking and priority transmission corridors under synchronised solar extremes.", venue: "npj Clean Energy, 2026" },
  { file: "npj-fig5.png", doi: "10.1038/s44406-026-00027-7", title: "Pool-wide failure risk and the country pairs that drive it", caption: "Conditional probability of pool-wide failure and annual frequency of synchronised and severe events.", venue: "npj Clean Energy, 2026" },
  { file: "npj-fig3.png", doi: "10.1038/s44406-026-00027-7", title: "Where the extremes come from, country by country", caption: "Change in low-irradiance days, high-temperature days and their combination for every country, grouped by power pool, under SSP2-4.5 and SSP5-8.5.", venue: "npj Clean Energy, 2026" },
  { file: "physcondl-architecture.jpg", doi: "10.1016/j.renene.2025.124658", title: "The PhysConDL bias-correction pipeline", caption: "CMIP6 radiation and cloud fields pass through physics nudging, a spectral correction and a physics-informed network, evaluated against CM SAF.", venue: "Renewable Energy, 2025" },
  { file: "npj-fig6.png", doi: "10.1038/s44406-026-00027-7", title: "Country pairs that fail together", caption: "Each pair's contribution to synchronised extreme events, which marks the transmission corridors that matter most in every pool.", venue: "npj Clean Energy, 2026" },
];
