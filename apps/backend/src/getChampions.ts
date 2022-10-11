import axios from "axios";
import { defaultApiChampion, defaultSkin } from "./defaultValues";
import { Champion } from "./types/champion";
import { WildRiftAPIResponse } from "./types/wr_api_champion";
import { WildRiftAPIResposeAllChampions } from "./types/wr_api_champios_all";

async function getChampions() {
  console.log("Fetching Champion Data...");
  const { data } = await axios.get<WildRiftAPIResposeAllChampions>(
    "https://wildrift.leagueoflegends.com/page-data/en-sg/champions/page-data.json"
  );
  const [{ championList }] =
    data?.result?.data?.allContentstackChampions?.nodes ?? [];

  let promises = (championList ?? []).map((champion) => {
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

  return allChampions.map<Champion>((res) => {
    const [champ = defaultApiChampion] =
      res.data?.result?.data?.allContentstackChampionDetail?.nodes ?? [];
    const skin = champ.skins[0] ?? defaultSkin;
    const champFromList = championList.find((c) => c.name === champ.title);
    return {
      image: champFromList?.image.url ?? skin.splash.url,
      name: champ.title,
      squareImage: skin.icon.url,
    };
  });
}

export default getChampions;
