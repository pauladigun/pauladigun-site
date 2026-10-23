/* Photographs used across the site. All are free-licence images from
   Wikimedia Commons (public domain, CC BY or CC BY-SA). The credit lines
   are rendered in the footer, which satisfies the attribution terms.
   APPLY.sh downloads each file into public/images/ at 1920 px. */

export const IMAGES = {
  solar: {
    file: "solar-ouarzazate.jpg",
    alt: "Rows of mirrors at the Noor solar power station near Ouarzazate, Morocco, under a clear sky.",
    credit: "Richard Allaway, CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Noor_1_and_2_-_Ouarzazate_Solar_Power_Station_(48962353822).jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Noor_1_and_2_-_Ouarzazate_Solar_Power_Station_%2848962353822%29.jpg/1920px-Noor_1_and_2_-_Ouarzazate_Solar_Power_Station_%2848962353822%29.jpg",
  },
  clouds: {
    file: "clouds-africa-modis.jpg",
    alt: "Satellite view of a long line of clouds over northern Africa.",
    credit: "NASA MODIS Land Rapid Response Team, public domain",
    source: "https://commons.wikimedia.org/wiki/File:Clouds_over_Africa_(MODIS_2025-01-12).jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Clouds_over_Africa_%28MODIS_2025-01-12%29.jpg/1920px-Clouds_over_Africa_%28MODIS_2025-01-12%29.jpg",
  },
  drought: {
    file: "drought-morocco.jpg",
    alt: "Cracked, dry earth during a drought in Morocco.",
    credit: "Houssain Tork, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Drought_in_Morocco.jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Drought_in_Morocco.jpg/1920px-Drought_in_Morocco.jpg",
  },
  lakechad: {
    file: "lake-chad-modis.jpg",
    alt: "Satellite view of Lake Chad and the surrounding Sahel.",
    credit: "NASA MODIS Land Rapid Response Team, public domain",
    source: "https://commons.wikimedia.org/wiki/File:Lake_Chad_(MODIS_2017-01-20).jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Lake_Chad_%28MODIS_2017-01-20%29.jpg/1920px-Lake_Chad_%28MODIS_2017-01-20%29.jpg",
  },
  heat: {
    file: "heat-haze-nigeria.jpg",
    alt: "The sun setting through dust haze over a street in Nigeria.",
    credit: "Timiadekola, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Sunset_over_a_Dusty_Street.jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Sunset_over_a_Dusty_Street.jpg/1920px-Sunset_over_a_Dusty_Street.jpg",
  },
  dust: {
    file: "sahara-dust-storm.jpg",
    alt: "Satellite view of a dust storm sweeping across the Sahara.",
    credit: "European Union, Copernicus Sentinel-3 imagery",
    source: "https://commons.wikimedia.org/wiki/File:Dust_storm_in_the_Sahara_(Copernicus).jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Dust_storm_in_the_Sahara_%28Copernicus%29.jpg/1920px-Dust_storm_in_the_Sahara_%28Copernicus%29.jpg",
  },
  cyclone: {
    file: "cyclone-batsirai.jpg",
    alt: "Satellite view of Tropical Cyclone Batsirai approaching Madagascar.",
    credit: "NOAA, public domain",
    source: "https://commons.wikimedia.org/wiki/File:Tropical_Cyclone_Batsirai_approaching_Madagascar_NOAA-20_satellite_image_2_February_2022.png",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/90/Tropical_Cyclone_Batsirai_approaching_Madagascar_NOAA-20_satellite_image_2_February_2022.png",
  },
  wind: {
    file: "wind-farm-south-africa.jpg",
    alt: "Wind turbines at Klipheuwel in the Western Cape, South Africa.",
    credit: "Warren Rohner, CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Klipheuwel_wind_farm_2008.jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Klipheuwel_wind_farm_2008.jpg/1920px-Klipheuwel_wind_farm_2008.jpg",
  },
  rain: {
    file: "monsoon-rain-senegal.jpg",
    alt: "Donkeys turned away from driving monsoon rain in Senegal.",
    credit: "Noah Elhardt, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Asses_in_the_rain.jpg",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Asses_in_the_rain.jpg/1920px-Asses_in_the_rain.jpg",
  },
  earth: {
    file: "africa-from-space.jpg",
    alt: "Africa and Europe seen from a million miles away by NASA's EPIC camera.",
    credit: "NASA, public domain",
    source: "https://commons.wikimedia.org/wiki/File:Africa_and_Europe_from_a_Million_Miles_Away.png",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Africa_and_Europe_from_a_Million_Miles_Away.png",
  },
};

/* While the files are not yet in public/images/ (for example in a
   preview build), the page falls back to the Commons URL. */
export function imgSrc(base, key) {
  const im = IMAGES[key];
  return { local: base + "images/" + im.file, remote: im.url, alt: im.alt };
}
