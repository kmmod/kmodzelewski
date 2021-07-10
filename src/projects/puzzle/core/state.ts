import { atom } from "recoil";

export const tilesState = atom({
  key: "tilesState",
  default: [],
});

export const gemsState = atom({
  key: "gemsState",
  default: [],
});

export const scoreState = atom({
  key: "score",
  default: 0,
});

export const startState = atom({
  key: "start",
  default: 0,
});
