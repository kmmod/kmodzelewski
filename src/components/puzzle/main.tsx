import React from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { PuzzleOptions } from "./types";
import { TileGrid } from "./tile";

const PuzzleMain = (props: PuzzleOptions) => {
  // logic for game

  return (
    <div className={container}>
      <Canvas>
        <TileGrid size={{ x: 4, y: 4 }} />
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
