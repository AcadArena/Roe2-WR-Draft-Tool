import axios from "axios";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { Champion } from "interface/champion";
import args from "./args";
import getChampions from "./getChampions";

type Task = () => Promise<void>;
type Tasks = Array<Task>;

export const downloadFileTask =
  (path: string, champ: Champion, type: "splash" | "square") => async () => {
    return new Promise<void>((resolve, reject) => {
      const url = type === "splash" ? champ.image : champ.squareImage;
      axios
        .get(url, { responseType: "arraybuffer" })
        .then((resp) => {
          if (existsSync(path)) {
            console.log(`${path} exists, skipping download.`);
            return resolve();
          }
          console.log(`Downloading ${champ.name} ${type} image`);
          const output = createWriteStream(path);
          output.write(resp.data);
          output.close();
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

export const initAssets = async () => {
  const folder = "./.cache";
  const tasks: Tasks = [];
  if (!existsSync(folder)) {
    console.log("Cache not found, creating cache folder...");
    mkdirSync(folder);
  }

  const champs = await getChampions();

  if (args.skipDownload) {
    return console.log("Skipping asset download");
  }

  champs.forEach((champ) => {
    const path = `${folder}/${champ.name}`;
    tasks.push(downloadFileTask(`${path}_splash.jpg`, champ, "splash"));
    tasks.push(downloadFileTask(`${path}_square.jpg`, champ, "square"));
  });
  console.log(`Downloading ${tasks.length}`);
  const batchSize = 10;

  // download assets by batch
  for (let i = 0; i < tasks.length; i = i + batchSize) {
    const currentTasks = tasks.slice(i, i + batchSize);
    await Promise.all(currentTasks.map((task) => task()));
  }
  console.log(`Downloading ${tasks.length} assets finished`);
};
