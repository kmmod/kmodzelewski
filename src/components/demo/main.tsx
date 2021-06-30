import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Sphere } from "./sphere"
import { Light } from "./light"

const Demo = () => {
  return (
    <>
      <ambientLight />
      <PerspectiveCamera
        makeDefault={true}
        position={[0, 0, 5]}
        zoom={1}
        fov={45}
      />
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-1.0}
        target={[0, 0, 0]}
      />
      <Light position={[10,10,10]} color={"orange"} time={3}/>
      <Light position={[-20,5,2]} color={"red"} time={2}/>
      <Light position={[10,-30,-10]} color={"lightblue"} time={10}/>
      <Sphere/>
    </>
  );
};

export default Demo;
