import { Champion } from "./types/champion";
import {
  AllContentstackChampionDetailNode,
  HeroVideo,
  Role,
  Skin,
  Video,
} from "./types/wr_api_champion";

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
