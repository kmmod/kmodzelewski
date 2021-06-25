import React from "react";
import { Canvas } from "react-three-fiber";
import { title, wrapper } from "../styles/main.module.scss";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const MeshView = () => {
  return (
    <main>
      <title>kmodzelewski</title>
      <h1 className={title}>kmodzelewski</h1>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `static` }}
      >
        <PerspectiveCamera
          makeDefault={true}
          position={[1.0, 1.0, 1.0]}
          zoom={1}
          fov={25}
        />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={-1.0}
          target={[0, 0, 0]}
        />
        <mesh>
          <planeGeometry />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </main>
  );
};

export default MeshView;
