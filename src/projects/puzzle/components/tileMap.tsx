import React, { useEffect, useState } from "react";
import { GridSize, TileProp } from "../core/types";
import { createTileMap } from "../core/build";
import { Tiles } from "./tiles";

export const TileMap = (props: any) => {
  const [tileMap, setTileMap] = useState<TileProp[]>();

  // useEffect(() => {
  //   const newTileMap = createTileMap(props.size);
  //   setTileMap(newTileMap);
  //   console.log(newTileMap);
  // }, [props.size]);

  return (
    <>
      <Tiles tileMap={props.size} />
    </>
  );
};
