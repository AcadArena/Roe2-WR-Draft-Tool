import { championStore } from "../store";

export const sanitizedChampList = () => {
  const obj = Object.fromEntries(championStore);
  for (const [id, champ] of Object.entries(obj)) {
    obj[id] = {
      name: champ.name,
      image: `.cache/${encodeURIComponent(champ.name)}_splash.jpg`,
      squareImage: `.cache/${encodeURIComponent(champ.name)}_square.jpg`,
    };
  }
  return obj;
};
