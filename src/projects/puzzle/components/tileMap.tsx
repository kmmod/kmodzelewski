import React, { useEffect } from "react";
import { TileProp } from "../core/types";
import { useRecoilState } from "recoil";
import { selectedGem, startState, tilesState } from "../core/state";
import { createTileMap } from "../core/build";

export const TileMap = (props: any): null => {
  const [tiles, setTiles] = useRecoilState<TileProp[]>(tilesState);
  const [start, setStart] = useRecoilState<number>(startState);
  const [current, setCurrent] = useRecoilState(selectedGem);

  useEffect(() => {
    const tileMap = createTileMap(props.size);
    setTiles(tileMap);
    setStart(start + 1);
  }, [props.size]);

  return null;
};
