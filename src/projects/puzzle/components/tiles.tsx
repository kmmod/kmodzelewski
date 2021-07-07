import React, { useState, useEffect } from "react";
import { TileProp } from "../core/types";
import { Tile } from "./tile";
import { useRecoilState } from "recoil";
import { tilesState } from "../core/state";

export const Tiles = () => {
  const [tileMap, setTileMap] = useRecoilState<TileProp[]>(tilesState);
  const [tiles, setTiles] = useState<any[]>([]);

  useEffect(() => {
    const newTiles = tileMap.map((item: TileProp) => {
      return (
        <Tile
          id={item.id}
          key={item.id}
          onClicked={tileClicked}
          onHover={tileHover}
          x={item.x}
          y={item.y}
        />
      );
    });
    setTiles(newTiles);
  }, [tileMap]);

  const tileClicked = (id: number) => {};

  const tileHover = (id: number) => {};

  return <>{tiles}</>;
};
