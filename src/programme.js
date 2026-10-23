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

