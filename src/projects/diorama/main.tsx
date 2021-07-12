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

const SwampDiorama = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={0.2} />
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
      </Suspense>
      <Suspense fallback={null}>
        <SwampUnderland />
      </Suspense>
      <Suspense fallback={null}>
        <SwampBottom />
      </Suspense>
      <Suspense fallback={null}>
        <SwampWater />
      </Suspense>
      <Suspense fallback={null}>
        <SwampGrass />
      </Suspense>
      <Suspense fallback={null}>
        <Character31 />
      </Suspense>
      <Suspense fallback={null}>
        <SwampStones />
      </Suspense>
      <Suspense fallback={null}>
        <SwampWood />
      </Suspense>
      <Suspense fallback={null}>
        <SwampLily />
      </Suspense>
    </>
  );
};

export default SwampDiorama;
