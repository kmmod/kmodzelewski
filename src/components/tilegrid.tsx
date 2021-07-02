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
        position={[0.1, 1.0, 1.0]}
        zoom={1}
        fov={25}
      />
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-1.0}
        target={[0, 0, 0]}
      />
      <Suspense fallback={null}>
        <ChestModel position={[0, 0, 0]} />
      </Suspense>
    </>
  );
};

export default MeshViewer;
