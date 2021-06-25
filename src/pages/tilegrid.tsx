import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { title, wrapper } from "../styles/main.module.scss";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const tile = (position: any) => {
  const plane = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);
  useFrame(() => (plane.current.rotation.x += 0.01));
  return (
    <mesh
      ref={plane}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.99, 0.99, 0.99]}
      position={position}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={active ? "orange" : "grey"} />
    </mesh>
  );
};

const tileMap = (size: number) => {
  const tiles = [];
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const posX = -size / 2 + x;
      const posZ = -size / 2 + z;
      const newTile = tile([posX, 0, posZ]);

      tiles.push(newTile);
    }
  }
  return tiles;
};

const TileGrid = () => {
  return (
    <main>
      <title>kmodzelewski</title>
      <h1 className={title}>kmodzelewski</h1>
      <Canvas
        className={wrapper}
        style={{ width: `100%`, height: `100vh`, position: `static` }}
      >
        <pointLight position={[0, 10, 0]} />
        <PerspectiveCamera
          makeDefault={true}
          position={[9.0, 9.0, 9.0]}
          zoom={1}
          fov={15}
        />
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={-1.0}
          target={[0, 0, 0]}
        />
        {tile([0,0,0])}
      </Canvas>
    </main>
  );
};

export default TileGrid;
