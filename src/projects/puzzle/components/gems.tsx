import React, { useEffect, useState } from "react";
import { Gem } from "./gem";
import { TileProp } from "../core/types";
import { getRandomTiles } from "../core/build";

export const Gems = (props: any) => {
  const [gems, setGems] = useState<any>([]);

  useEffect(() => {
    console.log(props.current);
    const currentGem = gems.filter(
      (item: any) => item.props.parent === props.current
    );
    console.log(currentGem);
  }, [props.current]);

  useEffect(() => {
    // setGems([]);
    // const tileCount = props.tiles.length;
    //
    // const initAmount = Math.floor(tileCount / 2);
    // const randomTiles = getRandomTiles(initAmount, props.tiles);
    // console.log(randomTiles);
    // randomTiles.map((item: TileProp) => {
    //   console.log(item);
    //   setGems((gems: any) => [
    //     ...gems,
    //     <Gem position={[item.x, item.y, 0]} key={item.id} />,
    //   ]);
    // });
    initGems();
  }, [props.tiles]);

  const initGems = () => {
    setGems([]);

    const tileCount = props.tiles.length;
    const initAmount = Math.floor(tileCount / 2);

    const randomTiles = getRandomTiles(initAmount, props.tiles);
    const initGems = randomTiles.map((item: TileProp, index) => {
      return (
        <Gem position={[item.x, item.y, 0]} key={index} parent={item.id} />
      );
    });
    setGems(initGems);
  };

  return <>{gems}</>;
};
