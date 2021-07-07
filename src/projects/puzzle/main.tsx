import React from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { PuzzleOptions } from "./core/types";
import { Camera } from "./components/camera";
import { TileMap } from "./components/TileMap";
import { RecoilRoot } from "recoil";
import { Tiles } from "./components/tiles";
import { Gems } from "./components/gems";

const PuzzleMain = (props: PuzzleOptions) => {
  return (
    <div className={container}>
      <Canvas>
        <RecoilRoot>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 10, 5]} intensity={0.5} color={"orange"} />
          <pointLight position={[0, -10, 5]} intensity={0.2} color={"blue"} />
          <TileMap size={props.size} />
          <Tiles />
          <Gems />
          <Camera size={props.size} />
        </RecoilRoot>
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
