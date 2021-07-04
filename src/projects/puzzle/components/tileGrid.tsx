import React, { useState } from "react";
import { TilesProps } from "../core/types";
import { Tile } from "./tile";

export const TileGrid = (props: any) => {
  const [tileGrid, setTileGrid] = useState<any>([]);

  return (
    <>
      {props.tiles.map((item: TilesProps) => {
        return <Tile x={item.x} y={item.y} id={item.id} />;
      })}
    </>
  );
};
