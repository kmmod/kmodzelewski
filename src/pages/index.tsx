import React from "react";
import MeshViewer from "../components/meshviewer";
import { Canvas } from "@react-three/fiber";
import { title, wrapper } from "../styles/main.module.scss";
import { OrbitControls } from "@react-three/drei";

const IndexPage = () => {
  return (
    <main>
      <title>kmodzelewski</title>
      <h1 className={title}>kmodzelewski</h1>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `static` }}
      >
        <MeshViewer />
      </Canvas>
    </main>
  );
};

export default IndexPage;
