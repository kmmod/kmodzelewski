import { atom, selector } from "recoil";

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

export const selectedGem = atom({
  key: "selectedGem",
  default: null,
});

export const selectedTile = atom({
  key: "selectedTile",
  default: null,
});

export const tileSelector = selector({
  key: "tileSelector",
  get: ({ get }) => {
    return get(tilesState);
  },
  set: ({ set }, newValue) => set(tilesState, newValue),
});
