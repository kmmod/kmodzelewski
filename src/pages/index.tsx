import About from "../components/home/about";
import ChestGrid from "../components/chestgrid";
import Demo from "../components/demo/main";
import Header from "../components/home/header";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "gatsby";
import { title, wrapper } from "../styles/main.module.scss";
import SwampDiorama from "../projects/diorama/main";
import * as THREE from "three";
import Nav from "../components/nav";

const IndexPage = () => {
  return (
    <>
      <Nav />
      {/*<About />*/}
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `absolute` }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ReinhardToneMapping;
        }}
      >
        <SwampDiorama />
      </Canvas>
    </>
  );
};

export default IndexPage;
