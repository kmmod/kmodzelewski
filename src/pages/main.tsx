import React from "react";
import Diorama from "../components/diorama";
import { Canvas } from "@react-three/fiber";
import { title, wrapper } from "../styles/main.module.scss";

const IndexPage = () => {
  return (
    <main>
      <title>kmodzelewski</title>
      <h1 className={title}>kmodzelewski</h1>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `static` }}
      >
        <Diorama />
      </Canvas>
    </main>
  );
};

export default IndexPage;
