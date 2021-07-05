import React, { useEffect, useState } from "react";
import { TilesProps } from "../core/types";
import { Tile } from "./tile";
import { Gem } from "./gem";
import { getRandomTiles } from "../core/build";

export const TileGrid = (props: any) => {
  const [tileGrid, setTileGrid] = useState<any>([]);
  const [gems, setGems] = useState<any>([]);

  const tileMap = props.tiles;

  useEffect(() => {
    setGems([]);
    const tiles = props.tiles.map((item: TilesProps) => {
      return (
        <Tile
          x={item.x}
          y={item.y}
          id={item.id}
          empty={item.empty}
          key={item.id}
          clickedTile={onTileSelect}
        />
      );
    });
    setTileGrid(tiles);
    initGems(0.3);
  }, [props.tiles]);

  const initGems = (ratio: number) => {
    const initAmount = Math.floor(tileMap.length * ratio);
    const randomTiles = getRandomTiles(initAmount, props.tiles);
    randomTiles.forEach((item: TilesProps) => addGem(item));
  };

  const addGem = (tile: TilesProps) => {
    const newGem = (
      <Gem
        position={[tile.x, tile.y, 0]}
        key={tile.id}
        id={tile.id}
        onSelected={onGemSelect}
        deselect={deselectGem}
      />
    );
    tileMap[tile.id].empty = false;
    setGems((gems: any) => [...gems, newGem]);
  };

  const onTileSelect = (id: number) => {
    console.log(id);
    console.log(tileMap[id]);
  };

  const onGemSelect = (id: number) => {
    // deselect other gems
    const gemsToDeselect = gems.filter((item: any) => item.props.id !== id);
    console.log(gemsToDeselect);
    gemsToDeselect.forEach((item: any) => deselectGem(item));
  };

  const deselectGem = (gem: any) => {
    return;
  };

  return (
    <>
      {tileGrid} {gems}
    </>
  );
};
