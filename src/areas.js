/* Areas of focus. The prose is written from the published papers and
   from work described on this site; every quantitative claim below is
   taken from a paper that is linked on the page. Each area lists the DOI
   fragments of its papers (matched against DOI_MAP in data.js) and the
   title keywords used to pull further publications from Google Scholar. */

export const AREAS = [
  {
    id: "climate-projections",
    title: "Climate projections",
    short: "Making climate-model output physically credible enough to plan with.",
    image: "clouds",
    lede:
      "Global climate models carry systematic errors over Africa, and those errors pass straight into every assessment built on top of them. This work develops corrections that respect the physics rather than only fitting the data.",
    body: [
      "Over much of Africa the models in the CMIP6 archive misplace cloud, aerosol and radiation, so the surface solar radiation they simulate is biased before any energy or impact calculation begins. Conventional statistical corrections can bring the numbers closer to observations while breaking the physical relationships between them, which leaves projections that look better and mean less.",
      "PhysConDL, the physics-constrained deep-learning framework at the centre of this programme, corrects CMIP6 surface solar radiation over Africa with three coupled devices: physics nudging that keeps the correction tied to the radiation balance, a spectral correction, and a physics-informed network trained against CM SAF satellite observations. Across the CMIP6 outputs it has been applied to, the framework removes between 70 and 85 percent of the bias while preserving the relationships between radiation, cloud and aerosol that downstream planning depends on.",
      "The same philosophy runs through the downscaling work. Deep-learning downscaling of West African summer monsoon rainfall is assessed for the added value it brings over the driving model rather than for skill scores alone, hybrid statistical downscaling is used to reduce bias in the drivers of compound wet and warm extremes, and multi-model evaluations of CMIP6 extreme precipitation over East Asia and of bias-adjusted ISIMIP models over West Africa establish which models can be trusted for which purpose.",
    ],
    callout: "A correction that improves the numbers but breaks the physics produces projections that look better and mean less.",
    featured: "10.1016/j.renene.2025.124658",
    dois: ["10.1016/j.renene.2025.124658", "10.1007/s00382-025-07865-8", "10.1007/s40808-022-01433-3"],
    keys: ["physics-constrained", "deep learning", "downscaling", "neural network", "bias adjusted", "bias correction", "multi-model evaluation"],
  },
  {
    id: "solar-and-wind-energy",
    title: "Solar and wind energy",
    short: "How warming, cloud and dust reshape Africa's renewable resources and the power systems built on them.",
    image: "solar",
    lede:
      "Africa's power plans are being drawn on present-day resource maps. This work projects how the solar and wind resource changes under climate change, separates the drivers, and asks what correlated shortfalls mean for grids that share the same weather.",
    body: [
      "Multi-model CMIP6 ensemble analysis projects the future of photovoltaic potential across Africa under higher-emission scenarios and traces the changes to their drivers: rising air temperature, which degrades panel performance, and changes in irradiance, cloud cover and aerosol, which alter the resource itself. A companion study in the Journal of Geophysical Research separates these influences on photovoltaic production, and a 2026 study shows that a doubling of Saharan dust emissions lowers photovoltaic potential through dust, radiation and cloud interactions in CMIP6 simulations.",
      "The most consequential finding concerns the regional power pools. Pooling assumes that a shortfall in one country can be covered by its neighbours, which only holds if low-output days are uncorrelated across borders. A bias-validated CMIP6 ensemble, checked against WFDE5 observations and run from 1980 to 2100 under SSP2-4.5 and SSP5-8.5, shows a three-tier vulnerability hierarchy: under the high-emissions scenario the West African and Central African pools each exceed 100 synchronised low-output days per year in the ensemble mean, the Eastern pool faces substantial increases, and the Southern pool is more resilient because of its latitudinal spread. Thermal degradation intensifies extremes everywhere; radiation-driven change compounds it in some regions and partly offsets it in others.",
      "Extreme weather also cascades through photovoltaic systems in ways that averages hide, which a 2026 study in Sustainable Energy Technologies and Assessments quantifies. On the wind side, bias-corrected NEX-GDDP-CMIP6 projections map the future wind energy potential for wind farm development across the continent, so that planners can weigh solar and wind together.",
    ],
    callout: "The value of an interconnection depends on how correlated the shortfalls are, not only on how much capacity it links.",
    featured: "10.1038/s44406-026-00027-7",
    dois: ["10.1038/s44406-026-00027-7", "10.1016/j.solener.2024.113078", "10.1029/2024JD042971", "10.1016/j.seta.2025.104776", "10.1016/j.clet.2026.101145"],
    keys: ["photovoltaic", "solar", "wind energy", "wind farm", "power pool", "energy"],
  },
  {
    id: "drought-and-water",
    title: "Drought and water stress",
    short: "Drought is not only becoming more frequent across Africa; its behaviour is changing.",
    image: "drought",
    lede:
      "From station records to CMIP6 projections, this work tracks how drought frequency, duration and severity are reorganising under warming, and what rising evaporative demand means for arid regions of Africa and Asia.",
    body: [
      "A 2026 study in Communications Earth & Environment combines Climatic Research Unit observations with a 16-member CMIP6 ensemble to ask whether African drought is changing in character, not just in amount. It finds a broad reorganisation linked to warming: drought frequency, duration and severity have all increased, largely because atmospheric evaporative demand is rising, and under both intermediate and high-emissions scenarios long-lasting, high-severity droughts become more common while frequency, duration and severity become more tightly coupled. The result is reduced hydroclimatic stability and growing compound risk to water, food systems and ecosystems.",
      "Evaporative demand is the thread running through the rest of the programme. A probabilistic assessment in Geoscience Frontiers quantifies how temperature-enhanced evapotranspiration amplifies global drought risk under climate change, and an evaporative demand drought index developed for arid regions of Asia and Africa gives monitoring systems a way to capture drought that rainfall-only indices miss.",
      "The historical baseline comes from multi-scale SPEI analysis of drought patterns and trends across Africa from 1960 to 2018, from an examination of multi-scale drought variability over West Africa and the large-scale circulation patterns behind it, and from work on the teleconnections that shape meteorological drought in Northwest China. Satellite products are also assessed for drought monitoring over Northern Africa, where ground observations are sparse.",
    ],
    callout: "Frequency, duration and severity are becoming more tightly coupled, so droughts that are long are increasingly also severe.",
    featured: "10.1038/s43247-026-03528-6",
    dois: ["10.1038/s43247-026-03528-6", "10.1016/j.wace.2026.100873", "10.1016/j.gsf.2025.102235", "10.1080/17538947.2024.2447342", "10.1080/19475705.2024.2409199"],
    keys: ["drought", "evapotranspiration", "evaporative"],
  },
  {
    id: "heat-and-compound-extremes",
    title: "Heat and compound extremes",
    short: "Human-driven heatwaves, the mortality they carry, and hot and dry extremes that arrive together.",
    image: "heat",
    lede:
      "Heatwaves are the extreme most robustly attributable to human influence, and Africa has the least capacity to absorb them. This work attributes the recent intensification, projects the health burden, and treats hot and dry extremes as one hazard rather than two.",
    body: [
      "Using the Excess Heat Factor, which combines a significance factor and an acclimatisation factor computed from daily minimum and maximum temperatures, a 2024 study in Environmental Research: Climate attributes the recent intensification of African heatwaves to greenhouse gas emissions and land-use change, and uses return-period analysis to show how conditions could escalate. The projected mortality is the headline: heat-related deaths rise from roughly 9,000 per year in the historical period to about 23,000 per year by the end of the century under RCP2.6, and to about 43,000 per year under RCP6.0. Because the continent's adaptive capacity is low, the realised impact is likely to be larger.",
      "Hot and dry extremes increasingly coincide, and their combined effect on crops, water and health exceeds either alone. Historical and projected changes in temperature and precipitation compound hot-dry extremes are assessed across Africa using both CMIP5 and CMIP6 ensembles, with month-stratified percentile thresholds and the AR6 reference regions, for a near-term and an end-of-century window under every emissions pathway.",
      "At the city scale, the potential impact of increased urbanisation on land surface temperature over South-West Nigeria shows how land-use change adds a local layer of warming on top of the regional signal.",
    ],
    callout: "Heat-related deaths in Africa are projected to more than double under a low-emissions pathway and to rise almost fivefold under a moderate one.",
    featured: "10.1088/2752-5295/ad1f41",
    dois: ["10.1088/2752-5295/ad1f41", "10.1016/j.crsust.2022.100142"],
    keys: ["heatwave", "compound", "temperature", "urbanization"],
  },
  {
    id: "dust-aerosols-and-rainfall",
    title: "Dust, aerosols and rainfall",
    short: "Saharan dust and aerosol forcing shift where it rains and how much sunlight reaches the ground.",
    image: "dust",
    lede:
      "Dust and aerosols sit at the junction of the energy and water questions. They scatter sunlight, seed cloud and move the rain belts, and climate models disagree about all three.",
    body: [
      "In CMIP6 simulations a doubling of Saharan dust emissions decreases solar photovoltaic potential through its interactions with radiation and cloud, which makes dust a first-order uncertainty for solar planning across North and West Africa. Related work in review finds a northward, dust-induced shift of tropical Atlantic precipitation in the same models, with consequences for the Sahel rainy season.",
      "Further east, aerosol forcing dominates the late-summer precipitation change over East Asia's transitional climatic zone in CMIP6 simulations, and the dynamic and thermodynamic components of the anthropogenic signal in East Asian extreme precipitation have been separated to show which part of the change is circulation and which is moisture.",
      "The monsoon work connects the two regions: deep-learning downscaling of West African summer monsoon precipitation flow, hybrid statistical downscaling of the drivers of compound wet and warm extremes, and a multi-model evaluation of summer extreme precipitation over East Asia all ask the same question of the models, which is whether they reproduce the processes that deliver rain, not just the totals.",
    ],
    callout: "Dust is a first-order uncertainty for solar planning across North and West Africa.",
    featured: "10.1007/s00382-025-07865-8",
    dois: ["10.1007/s00382-025-07865-8", "10.1007/s40808-022-01433-3"],
    keys: ["dust", "aerosol", "precipitation", "rainfall", "monsoon"],
  },
  {
    id: "cyclones-and-severe-storms",
    title: "Cyclones and severe storms",
    short: "Physics-constrained learning for tropical cyclone intensity and for hail hazard at the scales that damage occurs.",
    image: "cyclone",
    lede:
      "Storms do their damage at scales global models cannot resolve. This work brings the physics-constrained approach to tropical cyclone intensity and to convection-scale hail hazard, so that hazard and exposure can be projected together.",
    body: [
      "PhyConML applies physics-constrained learning to tropical cyclone intensity using dynamical-systems metrics, so that the learned relationship between environment and intensity stays consistent with what the dynamics permit rather than drifting to fit the training record.",
      "A second line of work downscales hail hazard over Japan under climate change. Environmental diagnostics from the MRI-ESM2-0 climate model, among them convective available potential energy, freezing-level height, mid-level lapse rate, low-level moisture and deep-layer shear, drive the HAILCAST hail model, and a Fourier neural operator with a dual occurrence and intensity head and physics-based losses learns the mapping to a high-resolution reference built from ERA5. Projected changes in hail frequency and size are then combined with gridded population projections to map exposure by prefecture.",
      "Both lines are current, and results will be posted here as the papers are published.",
    ],
    callout: "Hazard and exposure have to be projected together, because the damage a storm does depends on who is underneath it.",
    featured: null,
    dois: [],
    keys: ["cyclone", "typhoon", "hurricane", "hail"],
  },
];

export const areaOf = (id) => AREAS.find((a) => a.id === id);
