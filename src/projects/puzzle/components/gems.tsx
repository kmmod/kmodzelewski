import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TileProp } from "../core/types";
import { getRandomId, getRandomTiles } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  gemCount,
  gemsState,
  startState,
  tilesState,
  turnState,
} from "../core/state";
import { gemColor, maxColors } from "../core/config";

export const Gems = () => {
  const [gems, setGems] = useRecoilState(gemsState);
  const [tileMap, setTileMap] = useRecoilState(tilesState);
  const [gemNumber, setGemNumber] = useRecoilState(gemCount);
  const start = useRecoilValue(startState);
  const turn = useRecoilValue(turnState);

  useEffect(() => {
    setGems([]);
    const tileCount = tileMap.length;
    const initAmount = Math.floor(tileCount / 5);
    const init = initGems(initAmount, tileMap);
    setGems(init);
  }, [start]);

  useEffect(() => {
    if (tileMap.length === 0) return;
    const tiles = tileMap.filter((item: any) => item.child === null);
    const randomCount = Math.trunc(Math.random() * 3 + 1);
    const newGems = initGems(randomCount, tiles);
    if (tiles.length > 0) {
      setGems((oldGems) => [...oldGems, ...newGems]);
    } else {
      console.log("game end");
    }
  }, [turn]);

  const gemClicked = (id: number) => {};

  const initGems = (count: number, tiles: TileProp[]) => {
    const randomCount = tiles.length < count ? tiles.length : count;
    const randomTiles = getRandomTiles(randomCount, tiles);
    const initGems = randomTiles.map((item: TileProp, index) => {
      const colorId = getRandomId(maxColors);
      const newColor = gemColor(colorId);
      const gem = (
        <Gem
          position={[item.x, item.y, 0]}
          key={index + gemNumber}
          id={index + gemNumber}
          parent={item.id}
          color={newColor}
          selected={gemClicked}
        />
      );
      setTileMap((oldTiles) =>
        [...oldTiles].map((tile: any) =>
          tile.id === item.id
            ? { ...tile, child: index + gemNumber, color: newColor }
            : tile
        )
      );
      return gem;
    });
    setGemNumber((oldValue) => oldValue + initGems.length);
    return initGems;
  };

  return <>{gems}</>;
};
