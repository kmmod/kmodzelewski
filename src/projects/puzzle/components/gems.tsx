import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TilesProps } from "../core/types";

export const Gems = (props: any) => {
  console.log(props.tiles);

  const [gems, setGems] = useState<any>([]);

  useEffect(() => {
    setGems([]);
    const tileCount = props.tiles.length;

    const initAmount = Math.floor(tileCount / 2);
    const randomTiles = getRandomTiles(initAmount, props.tiles);
    console.log(randomTiles);
    randomTiles.map((item: TilesProps) => {
      console.log(item);
      setGems((gems: any) => [
        ...gems,
        <Gem position={[item.x, item.y, 0]} key={item.id} />,
      ]);
    });
  }, [props.tiles]);

  return <>{gems}</>;
};

const getRandomTiles = (count: number, tiles: TilesProps[]): TilesProps[] => {
  console.log(tiles);

  const remainingTiles = [...tiles];
  const returningTiles = [];

  for (let i = 0; i < count; i++) {
    const random =
      remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
    remainingTiles.splice(remainingTiles.indexOf(random), 1);
    returningTiles.push(random);
  }
  return returningTiles;
};
