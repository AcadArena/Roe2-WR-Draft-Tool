import axios from "axios";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Champion } from "interface/champion";
import { WildRiftAPIResponse } from "interface/wr_api_champion";
import { WildRiftAPIResposeAllChampions } from "interface/wr_api_champios_all";
import { defaultApiChampion, defaultSkin } from "utils/defaultValues";
import { championStore } from "../store";
import args from "./args";

async function getChampions() {
  const filePath = "./.cache/champions.json";
  if (args.useCache) {
    if (existsSync(filePath)) {
      console.log("Champion cache found, loading from cache...");
      const champions = JSON.parse(
        readFileSync(filePath).toString()
      ) as Champion[];
      champions.forEach((champ) => championStore.set(champ.name, champ));

      return champions;
    }

    console.log("Cache not found, fetching from API...");
  }
  console.log("Fetching Champion Data...");
  const { data } = await axios.get<WildRiftAPIResposeAllChampions>(
    "https://wildrift.leagueoflegends.com/page-data/en-sg/champions/page-data.json"
  );
  const [{ championList }] =
    data?.result?.data?.allContentstackChampions?.nodes ?? [];

  let promises = (championList ?? []).map(async (champion) => {
    return axios
      .get<WildRiftAPIResponse>(
        "https://wildrift.leagueoflegends.com/page-data/en-sg" +
          champion.url.url +
          "/page-data.json"
      )
      .then((res) => {
        console.log(`Fetching ${champion.name} data`);
        return res;
      });
  });

  const allChampions = await Promise.all(promises);

  const champions = allChampions.map<Champion>((res) => {
    const [champ = defaultApiChampion] =
      res.data?.result?.data?.allContentstackChampionDetail?.nodes ?? [];
    const skin = champ.skins[0] ?? defaultSkin;
    const champFromList = championList.find((c) => c.name === champ.title);
    const champion = {
      image: champFromList?.image.url ?? skin.splash.url,
      name: champ.title,
      squareImage: skin.icon.url,
    };
    championStore.set(champion.name, champion);
    return champion;
  });

  writeFileSync(filePath, JSON.stringify(champions));
  return champions;
}

export default getChampions;
