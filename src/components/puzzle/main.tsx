import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { Gems } from "./gems";
import { PuzzleOptions } from "./types";
import { TileGrid } from "./tileGrid";
import { Camera } from "./camera";

const PuzzleMain = (props: PuzzleOptions) => {
  // logic for game
  const [tiles, setTiles] = useState([]);

  return (
    <div className={container}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 5]} intensity={0.5} color={"orange"} />
        <pointLight position={[0, -10, 5]} intensity={0.2} color={"blue"} />

        <TileGrid size={props.size} setTiles={setTiles} />
        <Gems tiles={tiles} />
        <Camera size={props.size} />
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
