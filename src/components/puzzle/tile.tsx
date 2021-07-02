import React from "react";
import { GridSize, TileProperties } from "./types";

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

        return <Tile position={{ x: positionX, y: positionY }} key={index} />;
      })}
    </>
  );
};

const Tile = (options: TileProperties) => {
  return (
    <mesh
      position={[options.position.x, options.position.y, 0]}
      scale={[0.95, 0.95, 0.95]}
    >
      <planeGeometry />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};
