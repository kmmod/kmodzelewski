import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { PuzzleOptions } from "./core/types";
import { Camera } from "./components/camera";
import { TileMap } from "./components/TileMap";
import { RecoilRoot } from "recoil";
import { Tiles } from "./components/tiles";
import { Gems } from "./components/gems";
import { Score } from "./components/score";

const PuzzleMain = (props: PuzzleOptions) => {
  const [score, setScore] = useState(0);
  const updateScore = (score: number) => {
    setScore(score);
  };
  return (
    <div className={container}>
      <h2
        style={{
          color: "white",
          marginTop: "8rem",
          marginLeft: "1rem",
          position: "absolute",
        }}
      >
        score: {score}
      </h2>
      <Canvas>
        <RecoilRoot>
          <Score updateScore={updateScore} />
          <ambientLight intensity={0.0} />
          <pointLight position={[0, 10, 5]} intensity={0.5} color={0xf68151} />
          <pointLight position={[0, -10, 5]} intensity={0.5} color={0x51c7f6} />
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
