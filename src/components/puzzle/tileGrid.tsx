import React from "react";
import { TilesProps } from "./types";
import { Tile } from "./tile";

export const TileGrid = (props: any) => {
  return (
    <>
      {props.tiles.map((item: TilesProps) => {
        return <Tile x={item.x} y={item.y} id={item.id} />;
      })}
    </>
  );
};
