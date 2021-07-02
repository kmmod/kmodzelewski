import React, { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Man31 } from "../components/man31";

const Diorama = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={0.2}/>
      <PerspectiveCamera
        makeDefault={true}
        position={[0.1, 1.0, 1.0]}
        zoom={1}
        fov={25}
      />
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-1.0}
        target={[0, 0.15, 0]}
      />
      <Suspense fallback={null}>
        <Man31 position={[0, 0, 0]} />
      </Suspense>
    </>
  );
};

export default Diorama;
