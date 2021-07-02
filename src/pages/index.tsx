import React from "react";
import ChestGrid from "../components/chestgrid";
import Demo from "../components/demo/main"
import { Canvas } from "@react-three/fiber";
import { title, wrapper } from "../styles/main.module.scss";
import About from "../components/home/about";

const IndexPage = () => {
  return (
    <main>
      <title>kmodzelewski</title>

      <h1 className={title}>kmodzelewski</h1>
      <About/>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `absolute` }}
      >
        <Demo />
      </Canvas>

    </main>
  );
};

export default IndexPage;
