import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
} from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ChestModel } from "../components/chest";
import gsap from "gsap";
import THREE from "three";

const ChestGrid = () => {
  const [grid, setGrid] = useState([] as any);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    setGrid(chestsGrid(25));
    animationOut();
  }, []);

  const startPos = {
    x: 0.1,
    y: 1.0,
    z: 0.6,
  };

  const endPos = {
    x: 5.0,
    y: 5.0,
    z: -5.0,
  };

  const time = 30;

  const animationOut = () => {
    if (cameraRef.current) animation(cameraRef.current, endPos, animationIn);
  };

  const animationIn = () => {
    if (cameraRef.current) animation(cameraRef.current, startPos, animationOut);
  };

  const animation = (camera: THREE.PerspectiveCamera, pos: any, next: any) => {
    gsap.to(camera.position, {
      y: pos.y,
      duration: time,
      ease: "power3.inOut",
    });
    gsap.to(camera.position, {
      x: pos.x,
      z: pos.z,
      duration: time,
      ease: "power1.inOut",
      onComplete: next,
    });
  };

  const chestsGrid = (size: number): any[] => {
    const positionArray = [];
    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const posX = 0 - size / 2 + x;
        const posZ = 0 - size / 2 + z;
        const normalize = 0.2;
        positionArray.push([posX * normalize, 0, posZ * normalize]);
      }
    }
    return positionArray;
  };

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={true}
        position={[0.1, 1.0, 1.0]}
        zoom={1}
        fov={25}
      />
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={-1.0}
        target={[0, 0, 0]}
      />
      {grid.map((item: any, index: number) => (
        <Suspense fallback={null} key={index}>
          <ChestModel position={item} />
        </Suspense>
      ))}
    </>
  );
};

export default ChestGrid;
