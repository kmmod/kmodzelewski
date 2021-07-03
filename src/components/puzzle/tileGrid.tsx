import React, { useEffect } from "react";
import { GridOptions, GridSize } from "./types";
import { Tile } from "./tile";

export const TileGrid = (props: GridOptions) => {
  const factor = 1;
  const step = 1;
  const size = props.size.x * props.size.y;

  const tiles = [...Array(size)].map((item: any, index: number) => {
    const currentRow = Math.trunc(index / props.size.x);
    const offsetY = 0 - props.size.y / 2 + step / 2;
    const offsetX = 0 - props.size.x / 2 + step / 2;

    const positionY = (offsetY + currentRow) * factor;
    const positionX = (offsetX + index - currentRow * props.size.x) * factor;

    return (
      <Tile position={{ x: positionX, y: positionY }} id={index} key={index} />
    );
  });

  useEffect(() => {
    const tilesPos = tiles.map((item: any) => {
      return {
        x: item.props.position.x,
        y: item.props.position.y,
        id: item.props.id,
      };
    });
    props.setTiles(tilesPos);
  }, []);

  return <>{tiles}</>;
};
