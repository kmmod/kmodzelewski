import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { Gems } from "./gems";
import { PuzzleOptions } from "./types";
import { TileGrid } from "./tileGrid";
import { Camera } from "./camera";
import { createTileMap } from "./build";

const PuzzleMain = (props: PuzzleOptions) => {
  const [tiles, setTiles] = useState<any>([]);

  useEffect(() => {
    const tileMap = createTileMap(props);
    setTiles(tileMap);
  }, [props.size]);

  return (
    <div className={container}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 5]} intensity={0.5} color={"orange"} />
        <pointLight position={[0, -10, 5]} intensity={0.2} color={"blue"} />

        <TileGrid tiles={tiles} />
        <Gems tiles={tiles} />
        <Camera size={props.size} />
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
