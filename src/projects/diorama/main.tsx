import React, { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SwampShore from "./components/asset-shore";
import SwampUnderland from "./components/asset-underland";
import SwampBottom from "./components/asset-bottom";
import SwampWater from "./components/asset-water";
import SwampGrass from "./components/asset-grass";
import Character31 from "./components/assets-31";
import SwampStones from "./components/assets-stones";
import SwampWood from "./components/asset-wood";
import SwampLily from "./components/asset-lily";
import SwampGrasses from "./components/asset-grasses";

const SwampDiorama = () => {
  return (
    <>
      <hemisphereLight intensity={0.1} />
      <spotLight
        position={[0, 10, 0]}
        intensity={1.5}
        angle={0.8}
        penumbra={1}
      />
      <PerspectiveCamera
        makeDefault={true}
        position={[20, 25, -20]}
        zoom={1}
        fov={25}
      />
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-0.2}
        target={[0, 0.05, 0]}
      />
      <Suspense fallback={null}>
        <SwampShore />
        <SwampWater />
      </Suspense>
      <Suspense fallback={null}>
        <SwampBottom />
        <SwampUnderland />
      </Suspense>
      <Suspense fallback={null}>
        <SwampGrass />
        <SwampGrasses />
      </Suspense>
      <Suspense fallback={null}>
        <Character31 />
      </Suspense>
      <Suspense fallback={null}>
        <SwampWood />
        <SwampStones />
        <SwampLily />
      </Suspense>
    </>
  );
};

export default SwampDiorama;
