export type SoundInfo = {
  title: string;
  creator: string;
  source: string;
  licence: string;
  style: string;
  fileName: string;
};

const soundInfos: Record<string, SoundInfo> = {
  bell1: {
    title: "sing bowl wave bird relaxtion meditation music",
    creator: "smilecat77",
    source: "Freesound",
    licence: "Creative Commons 0",
    style: "Singing bowl / meditation bell / ambient relaxation audio.",
    fileName: "bell1.mp3",
  },
  bell2: {
    title: "Bell 2",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "A second bell sound for quiet moments.",
    fileName: "bell2.wav",
  },
  rain: {
    title: "Jungle Rain",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "Rain and nature sound for calm background listening.",
    fileName: "jungle-rain.mp3",
  },
  mus: {
    title: "Mus",
    creator: "Not yet confirmed",
    source: "Not yet confirmed",
    licence: "Not yet confirmed",
    style: "Music track for relaxation or meditation.",
    fileName: "mus.mp3",
  },
};

export default soundInfos;