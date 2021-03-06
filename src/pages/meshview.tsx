import React from "react";
import ChestGrid from "../components/meshviewer";
import { Canvas } from "@react-three/fiber";
import { title, wrapper } from "../styles/main.module.scss";

const MeshView = () => {
  return (
    <main>
      <title>kmodzelewski</title>
      <h1 className={title}>kmodzelewski</h1>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `static` }}
      >
        <ChestGrid />
      </Canvas>
    </main>
  );
};

export default MeshView;
