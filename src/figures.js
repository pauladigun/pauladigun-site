/* One figure per paper, used on the featured-research cards and on the
   area pages. Keyed by DOI. APPLY.sh downloads each file into
   public/figures/; until the file exists the page loads the publisher URL.
   All papers are open access, and the figures are the author's own. */

export const FIGURES = {
  "10.1038/s44406-026-00027-7": {
    file: "npj-fig2.png",
    url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs44406-026-00027-7/MediaObjects/44406_2026_27_Fig2_HTML.png",
    caption: "Figure 2. Validation of the CMIP6 historical multi-model ensemble against WFDE5 for photovoltaic potential across the African power pools, 1980 to 2014.",
  },
  "10.1038/s43247-026-03528-6": {
    file: "drought-reorganization-fig2.png",
    url: "https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs43247-026-03528-6/MediaObjects/43247_2026_3528_Fig2_HTML.png",
    caption: "Figure 2. Projected changes in drought frequency, duration and severity across Africa under SSP2-4.5 and SSP5-8.5.",
  },
  "10.1016/j.seta.2025.104776": {
    file: "cascading-pv-fig2.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S2213138825006071-gr2_lrg.jpg",
    caption: "Figure 2. Where extreme weather compounds photovoltaic power vulnerabilities under climate change.",
  },
  "10.1016/j.solener.2024.113078": {
    file: "pv-potential-fig2.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S0038092X24007734-gr2_lrg.jpg",
    caption: "Figure 2. Projected change in photovoltaic potential across Africa in the CMIP6 multi-model ensemble under higher-emission scenarios.",
  },
  "10.1016/j.wace.2026.100873": {
    file: "eddi-fig2.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S2212094726000241-gr2_lrg.jpg",
    caption: "Figure 2. The evaporative demand drought index across arid regions of Asia and Africa.",
  },
  "10.1016/j.clet.2026.101145": {
    file: "wind-potential-fig8.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S2666790826000042-gr8_lrg.jpg",
    caption: "Figure 8. Future wind energy potential for wind farm development across Africa from bias-corrected NEX-GDDP-CMIP6 projections.",
  },
  "10.1016/j.gsf.2025.102235": {
    file: "global-drought-risk-fig2.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S1674987125002403-gr2_lrg.jpg",
    caption: "Figure 2. Global amplification of drought risk from temperature-enhanced evapotranspiration under climate change.",
  },
  "10.1016/j.renene.2025.124658": {
    file: "physcondl-fig1.jpg",
    url: "https://ars.els-cdn.com/content/image/1-s2.0-S0960148125023225-gr1_lrg.jpg",
    caption: "Figure 1. The PhysConDL framework: physics nudging, spectral correction and a physics-informed network applied to CMIP6 solar radiation over Africa.",
  },
  "10.1088/2752-5295/ad1f41": {
    file: "heatwaves-fig1.jpg",
    url: "https://content.cld.iop.org/journals/2752-5295/3/1/015007/revision4/erclad1f41f1_hr.jpg",
    caption: "Figure 1. Heatwave magnitude across Africa, 1980 to 2014, in observations and CMIP6 simulations.",
  },
  "10.1088/2752-5295/ae2ef3": {
    file: "saharan-dust-fig1.jpg",
    url: "https://content.cld.iop.org/journals/2752-5295/5/3/035002/revision2/erclae2ef3f1_hr.jpg",
    caption: "Figure 1. Changes in dust emissions across Africa under doubled Saharan dust in the CMIP6 multi-model ensemble, annual and by season.",
  },
  "10.1029/2024JD042971": {
    file: "pv-drivers-fig2.png",
    url: "https://agupubs.onlinelibrary.wiley.com/cms/asset/fa81cb23-d849-4163-990c-eab14b206033/jgrd60756-fig-0002-m.png",
    caption: "Figure 2. WFDE5 and the CMIP6 multi-model ensemble compared over 1980 to 2014: surface solar radiation, near-surface temperature and photovoltaic potential, with the bias in each.",
  },
};

export const figureFor = (doiKey) => FIGURES[doiKey] || null;
