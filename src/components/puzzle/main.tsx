import React from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { PuzzleOptions } from "./types";
import { TileGrid } from "./tileGrid";

const PuzzleMain = (props: PuzzleOptions) => {
  // logic for game

  return (
    <div className={container}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 5]} intensity={0.2} />
        <TileGrid size={props.size} />
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
