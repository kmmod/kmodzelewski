import React, { useEffect } from "react";
import { TileProp } from "../core/types";
import { useRecoilState } from "recoil";
import { scoreState, startState, tilesState } from "../core/state";
import { createTileMap } from "../core/build";

export const TileMap = (props: any): any => {
  const [tiles, setTiles] = useRecoilState<TileProp[]>(tilesState);
  const [start, setStart] = useRecoilState<number>(startState);
  const [score, setScore] = useRecoilState<number>(scoreState);

  useEffect(() => {
    const tileMap = createTileMap(props.size);
    setTiles(tileMap);
    setStart(start + 1);
    setScore(0);
  }, [props.size]);

  return null;
};
