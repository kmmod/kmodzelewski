import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TileProp } from "../core/types";
import { getRandomTiles } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import { startState, tilesState } from "../core/state";

export const Gems = () => {
  const [gems, setGems] = useState<any>([]);
  const [tileMap, setTileMap] = useRecoilState(tilesState);
  const start = useRecoilValue(startState);

  useEffect(() => {
    initGems();
  }, [start]);

  const gemClicked = (id: number) => {};

  const initGems = () => {
    setGems([]);

    const tileCount = tileMap.length;
    const initAmount = Math.floor(tileCount / 2);

    const randomTiles = getRandomTiles(initAmount, tileMap);
    const initGems = randomTiles.map((item: TileProp, index) => {
      setTileMap((oldTiles) =>
        [...oldTiles].map((tile: any) =>
          tile.id === item.id ? { ...tile, child: index } : tile
        )
      );
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
