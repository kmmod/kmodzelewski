import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TileProp } from "../core/types";
import { getRandomId, getRandomTiles } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import { gemsState, startState, tilesState } from "../core/state";
import { gemColor, maxColors } from "../core/config";

export const Gems = () => {
  const [gems, setGems] = useRecoilState(gemsState);
  const [tileMap, setTileMap] = useRecoilState(tilesState);
  const start = useRecoilValue(startState);

  useEffect(() => {
    const init = initGems();
    setGems(init);
  }, [start]);

  const gemClicked = (id: number) => {};

  const initGems = () => {
    setGems([]);

    const tileCount = tileMap.length;
    const initAmount = Math.floor(tileCount / 2);

    const randomTiles = getRandomTiles(initAmount, tileMap);
    const initGems = randomTiles.map((item: TileProp, index) => {
      const colorId = getRandomId(maxColors);
      const newColor = gemColor(colorId);
      const gem = (
        <Gem
          position={[item.x, item.y, 0]}
          key={index}
          id={index}
          parent={item.id}
          color={newColor}
          selected={gemClicked}
        />
      );
      setTileMap((oldTiles) =>
        [...oldTiles].map((tile: any) =>
          tile.id === item.id
            ? { ...tile, child: index, color: newColor }
            : tile
        )
      );
      return gem;
    });
    return initGems;
  };

  return <>{gems}</>;
};
