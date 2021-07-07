import React, { useState, useEffect } from "react";
import { TileComponent, TileProp } from "../core/types";
import { Tile } from "./tile";

export const Tiles = (props: any) => {
  const [tiles, setTiles] = useState<any[]>([]);

  useEffect(() => {
    const newTiles = props.tileMap.map((item: TileProp) => {
      return (
        <Tile
          id={item.id}
          key={item.id}
          onClicked={tileClicked}
          onHover={tileHover}
          x={item.x}
          y={item.y}
        />
      );
    });
    setTiles(newTiles);
    console.log(
      props.tileMap.filter((item: any) => item.selected).length,
      "im setting"
    );
  }, [props.tileMap]);

  const tileClicked = (id: number) => {
    props.setSelected(id);
  };

  const tileHover = (id: number) => {};

  return <>{tiles}</>;
};
