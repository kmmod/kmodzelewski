import React from "react";
import { GridSize } from "./types";
import { Tile } from "./tile";

export const TileGrid = (props: GridSize) => {
  const factor = 1;
  const step = 1;
  const size = props.size.x * props.size.y;

  return (
    <>
      {[...Array(size)].map((item: any, index: number) => {
        const currentRow = Math.trunc(index / props.size.x);
        const offsetY = 0 - props.size.y / 2 + step / 2;
        const offsetX = 0 - props.size.x / 2 + step / 2;

        const positionY = (offsetY + currentRow) * factor;

        const positionX =
          (offsetX + index - currentRow * props.size.x) * factor;

        return (
          <Tile
            position={{ x: positionX, y: positionY }}
            id={index}
            key={index}
          />
        );
      })}
    </>
  );
};
