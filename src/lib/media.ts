/**
 * Every photo and clip on the site is a free Pexels asset, referenced by
 * its Pexels id so the credit survives. Swap any entry for the studio's
 * own photography when it is ready.
 */
export type Photo = {
  id: number;
  alt: string;
  credit: string;
  /** Intrinsic aspect ratio used for layout stability. */
  ratio: "portrait" | "landscape" | "square";
};

export function pexelsPhoto(id: number, width = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const photos = {
  heroStill: {
    id: 36833354,
    alt: "A row of reformers in a calm, sunlit Pilates studio",
    credit: "Pexels",
    ratio: "landscape",
  },
  reformerRow: {
    id: 38844028,
    alt: "Wooden reformers lined up in a minimalist studio with linen curtains",
    credit: "Pexels",
    ratio: "landscape",
  },
  archesStudio: {
    id: 11036673,
    alt: "Reformers set beneath arched windows in a bright studio",
    credit: "Pexels",
    ratio: "portrait",
  },
  archesStudioWide: {
    id: 36833355,
    alt: "Bright Pilates studio with arched mirrors and reformers",
    credit: "Pexels",
    ratio: "landscape",
  },
  moodyLoft: {
    id: 25596894,
    alt: "A moody loft studio with reformers beside tall windows",
    credit: "Pexels",
    ratio: "landscape",
  },
  moodyLoftTall: {
    id: 11036670,
    alt: "Reformers in a dim, atmospheric studio with brick walls",
    credit: "Pexels",
    ratio: "portrait",
  },
  towerStudio: {
    id: 25599832,
    alt: "A white studio with a Pilates tower and natural light",
    credit: "Pexels",
    ratio: "portrait",
  },
  towerPlant: {
    id: 25599824,
    alt: "A tower reformer beside a palm in a bright white room",
    credit: "Pexels",
    ratio: "portrait",
  },
  classInSync: {
    id: 8769163,
    alt: "Three women moving in sync on reformers during a group class",
    credit: "Pexels",
    ratio: "landscape",
  },
  reformerElegant: {
    id: 5473896,
    alt: "A woman in a long, elegant extension on a reformer",
    credit: "Pexels",
    ratio: "landscape",
  },
  reformerWindows: {
    id: 25599840,
    alt: "A woman practicing on a reformer beside floor to ceiling windows",
    credit: "Pexels",
    ratio: "portrait",
  },
  reformerLegsInStraps: {
    id: 25596677,
    alt: "A woman working through legs in straps on a reformer",
    credit: "Pexels",
    ratio: "landscape",
  },
  reformerSeated: {
    id: 25602467,
    alt: "A woman seated on a reformer carriage, arms extended on the straps",
    credit: "Pexels",
    ratio: "portrait",
  },
  reformerDark: {
    id: 35553893,
    alt: "A woman on a reformer in low, dramatic light",
    credit: "Pexels",
    ratio: "portrait",
  },
  matDuo: {
    id: 6339447,
    alt: "Two women stretching on mats in a wood lined studio",
    credit: "Pexels",
    ratio: "landscape",
  },
  matPair: {
    id: 4587320,
    alt: "Two women in a seated side stretch on mats",
    credit: "Pexels",
    ratio: "portrait",
  },
  matHands: {
    id: 374101,
    alt: "Hands pressed into a mat during a plank",
    credit: "Pexels",
    ratio: "landscape",
  },
  matBrick: {
    id: 866019,
    alt: "Two women seated on mats in a sunlit brick studio",
    credit: "Pexels",
    ratio: "landscape",
  },
  matRolls: {
    id: 4325462,
    alt: "Rolled mats stacked in a wooden basket",
    credit: "Pexels",
    ratio: "portrait",
  },
  prenatalPlank: {
    id: 7524706,
    alt: "A pregnant woman holding a modified plank on a mat",
    credit: "Pexels",
    ratio: "landscape",
  },
  prenatalMeditate: {
    id: 7055720,
    alt: "A pregnant woman seated calmly on a mat in soft light",
    credit: "Pexels",
    ratio: "landscape",
  },
  prenatalReformer: {
    id: 1103254,
    alt: "A pregnant woman on a reformer with a stability ball",
    credit: "Pexels",
    ratio: "landscape",
  },
  prenatalClass: {
    id: 3984364,
    alt: "Pregnant women practicing together with an instructor",
    credit: "Pexels",
    ratio: "landscape",
  },
  duoStretch: {
    id: 5890304,
    alt: "Two women stretching together in a bright studio",
    credit: "Pexels",
    ratio: "landscape",
  },
  portraitCamille: {
    id: 14843495,
    alt: "Camille Beaumont, founder of Aurelle Pilates",
    credit: "Pexels",
    ratio: "portrait",
  },
  portraitSimone: {
    id: 7479762,
    alt: "Simone Okafor, senior reformer instructor",
    credit: "Pexels",
    ratio: "portrait",
  },
  portraitDaniela: {
    id: 6582577,
    alt: "Daniela Reyes, prenatal and postnatal specialist",
    credit: "Pexels",
    ratio: "portrait",
  },
  portraitHarper: {
    id: 4498509,
    alt: "Harper Lindqvist, mat and mobility instructor",
    credit: "Pexels",
    ratio: "portrait",
  },
  portraitMateo: {
    id: 5624524,
    alt: "Mateo Alvarez, private session and athletic performance coach",
    credit: "Pexels",
    ratio: "landscape",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export type Clip = {
  id: number;
  src: string;
  /** Optional portrait source for phones. */
  portraitSrc?: string;
  poster: PhotoKey;
  alt: string;
  credit: string;
};

export const clips = {
  hero: {
    id: 6023188,
    src: "https://videos.pexels.com/video-files/6023188/6023188-hd_1920_1080_25fps.mp4",
    portraitSrc:
      "https://videos.pexels.com/video-files/35576710/15075830_1440_2560_60fps.mp4",
    poster: "heroStill",
    alt: "Slow footage of an instructor guiding a client on a reformer in a sunlit studio",
    credit: "Kampus Production and Content Kiosk on Pexels",
  },
  studioRoom: {
    id: 35576710,
    src: "https://videos.pexels.com/video-files/35576710/15075830_1440_2560_60fps.mp4",
    poster: "reformerRow",
    alt: "A slow pan across a warm, modern reformer studio",
    credit: "Content Kiosk on Pexels",
  },
  stretch: {
    id: 8502424,
    src: "https://videos.pexels.com/video-files/8502424/8502424-hd_1080_1920_25fps.mp4",
    poster: "reformerSeated",
    alt: "A woman stretching her arms against a neutral wall",
    credit: "Ivan S on Pexels",
  },
  detail: {
    id: 29474205,
    src: "https://videos.pexels.com/video-files/29474205/12687552_1080_1920_25fps.mp4",
    poster: "reformerLegsInStraps",
    alt: "A close detail of a hand adjusting a reformer spring",
    credit: "Oguzhan Muntazam on Pexels",
  },
  plank: {
    id: 6023258,
    src: "https://videos.pexels.com/video-files/6023258/6023258-hd_1920_1080_25fps.mp4",
    poster: "matDuo",
    alt: "A woman holding a steady plank on a mat in a wood floored studio",
    credit: "Kampus Production on Pexels",
  },
} as const satisfies Record<string, Clip>;

export type ClipKey = keyof typeof clips;
