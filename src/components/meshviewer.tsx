import React, { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ChestModel } from "../components/chest";

const MeshViewer = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
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
      <Suspense fallback={null}>
        <ChestModel />
      </Suspense>
    </>
  );
};

export default MeshViewer;
