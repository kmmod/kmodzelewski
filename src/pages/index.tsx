import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { Suspense} from "react";
import { Canvas } from "react-three-fiber";
import { ChestModel } from "../components/chest"
import { wrapper } from "../styles/main.module.scss";

const IndexPage = () => {

  return (
    <main>
      <title>kmodzelewski</title>
      <h1>kmodzelewski</h1>
      <Canvas className={wrapper} style={{width: `100%`, height: `100vh`, position: `static`}} >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault={true} position={[0,1.0,1.0]} zoom={1} fov={25} />
        <OrbitControls autoRotate={true} autoRotateSpeed={-1.0} target={[0,0,0]}/>
        <mesh position={[2,0,0]}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={"orange"} />
        </mesh>
        <Suspense fallback={null}>
          <ChestModel/>
        </Suspense>
      </Canvas>
    </main>
  );
};

export default IndexPage;
