import { Champion } from "../types/champion";
import { Ban, Pick, State, Team } from "../types/state";
import {
  AllContentstackChampionDetailNode,
  HeroVideo,
  Role,
  Skin,
  Video,
} from "../types/wr_api_champion";

export const defaultIconUrl: { url: string; title: string } = {
  title: "",
  url: "",
};

export const defaultVideo: Video = {
  file: defaultIconUrl,
};

export const defaultHeroVideo: HeroVideo = {
  video: defaultVideo,
  posterImage: defaultIconUrl,
};

export const defaultRole: Role = {
  icon: defaultIconUrl,
  name: "",
  machineName: "",
};

export const defaultApiChampion: AllContentstackChampionDetailNode = {
  abilities: [],
  buttons: [],
  difficulty: "",
  difficultyLevel: "",
  hero: "",
  heroImage: defaultIconUrl,
  heroVideo: [],
  heroVideoMobile: [],
  subtitle: "",
  roles: [],
  promoAd: { isEnabled: false, selectedPromos: [] },
  relatedTags: [],
  skins: [],
  title: "",
};

export const defaultChampion: Champion = {
  name: "",
  image: "",
  squareImage: "",
};

export const defaultSkin: Skin = {
  icon: defaultIconUrl,
  name: "",
  splash: defaultIconUrl,
};

/*===================================
      State
======================================*/

export const defaultBan: Ban = {
  id: 0,
  champion: defaultChampion,
  isActive: false,
  status: "pending",
};

export const defaultPick: Pick = {
  id: 0,
  champion: defaultChampion,
  isActive: false,
  status: "pending",
  displayName: "",
};

function newBan(id: number): Ban {
  return { ...defaultBan, id };
}

function newPick(id: number): Pick {
  return { ...defaultPick, id };
}

const defaultBans: Array<Ban> = new Array(5).fill(0).map((_, i) => newBan(i));
const defaultPicks: Array<Pick> = new Array(5)
  .fill(0)
  .map((_, i) => newPick(i));

export const defaultTeam: Team = {
  bans: defaultBans,
  isActive: false,
  picks: defaultPicks,
};

export const defaultState: State = {
  status: "paused",
  teamA: defaultTeam,
  teamB: defaultTeam,
  timer: 25,
  currentSequence: 0,
};
