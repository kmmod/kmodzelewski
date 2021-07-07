import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TileProp } from "../core/types";
import { getRandomTiles } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import { gemsState, startState, tilesState } from "../core/state";

export const Gems = () => {
  const [gems, setGems] = useRecoilState<any>(gemsState);
  const start = useRecoilValue(startState);
  const tiles = useRecoilValue(tilesState);

  useEffect(() => {
    initGems();
  }, [start]);

  const gemClicked = (id: number) => {};

  const initGems = () => {
    setGems([]);

    const tileCount = tiles.length;
    const initAmount = Math.floor(tileCount / 2);

    const randomTiles = getRandomTiles(initAmount, tiles);
    const initGems = randomTiles.map((item: TileProp, index) => {
      return (
        <Gem
          position={[item.x, item.y, 0]}
          key={index}
          id={index}
          parent={item.id}
          current={0}
          selected={gemClicked}
        />
      );
    });
    setGems(initGems);
  };

  return <>{gems}</>;
};
