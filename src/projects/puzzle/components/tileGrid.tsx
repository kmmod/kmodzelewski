import React, { useEffect, useState } from "react";
import { TileComponent, TileProp } from "../core/types";
import { Tile } from "./tile";
import { Gem } from "./gem";
import { getRandomTiles } from "../core/build";

export const TileGrid = (props: any) => {
  const [tileGrid, setTileGrid] = useState<TileComponent[]>([]);
  const [gems, setGems] = useState<any>([]);

  const tileMap = props.tiles;

  useEffect(() => {
    setGems([]);
    const tiles = props.tiles.map((item: TileProp) => {
      return (
        <Tile
          key={item.id}
          x={item.x}
          y={item.y}
          id={item.id}
          onClicked={onTileSelect}
          onHover={onTileHover}
        />
      );
    });
    setTileGrid(tiles);
    initGems(0.3);
  }, [props.tiles]);

  const initGems = (ratio: number) => {
    const initAmount = Math.floor(tileMap.length * ratio);
    const randomTiles = getRandomTiles(initAmount, props.tiles);
    const gems = randomTiles.map((item: TileProp) => addGem(item));
    setGems(gems);
  };

  const addGem = (tile: TileProp) => {
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
    return newGem;
    // setGems((gems: any) => [...gems, newGem]);
  };

  const onTileSelect = (id: number) => {
    if (!tileMap[id].empty && !tileMap[id].selected) {
      tileMap.forEach((item: TileProp) => (item.selected = false));
      tileMap[id].selected = true;
      console.log(tileMap);
      return;
    }
    if (!tileMap[id].empty && tileMap[id].selected) {
      tileMap[id].selected = false;
      return;
    }
    const otherSelected = tileMap.filter(
      (item: TileProp) => item.selected === true
    );
    if (tileMap[id].empty && otherSelected.length > 0) {
      console.log("another");
      const other = otherSelected[0].id;
      console.log(gems);
      console.log(
        gems,
        gems.filter((item: any) => item.props.id === other)
      );
      return;
    }
  };

  const onTileHover = (id: number) => {
    console.log(id);
  };

  const onGemSelect = (id: number) => {
    // deselect other gems
    // const gemsToDeselect = gems.filter((item: any) => item.props.id !== id);
    // console.log(gemsToDeselect);
    // gemsToDeselect.forEach((item: any) => deselectGem(item));
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
