import { TilesProps } from "./types";
import React, { MutableRefObject, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { content } from "../../styles/puzzle.module.scss";

export const Tile = (options: TilesProps) => {
  const mesh = useRef(null) as MutableRefObject<any>;

  const onOver = (event: ThreeEvent<PointerEvent>) => {
    return;
  };

  const onHover = (event: ThreeEvent<PointerEvent>) => {
    if (event && event.uv !== undefined) {
      const distanceX = (event.uv.x - 0.5) * 0.8;
      const distanceY = (0.5 - event.uv.y) * 0.8;
      animateRotation(distanceY, distanceX);
    }
  };

  const onOut = () => {
    animateRotation(0, 0);
  };

  const animateRotation = (destX: number, destY: number) => {
    gsap.to(mesh.current.rotation, { x: destX, y: destY, duration: 0.5 });
  };

  return (
    <group position={[options.x, options.y, 0]}>
      <mesh ref={mesh} scale={[0.95, 0.95, 0.95]}>
        <planeGeometry />
        <meshStandardMaterial color={"white"} roughness={0.9} metalness={0.4} />
        {/*<Html distanceFactor={10}>*/}
        {/*  <div className={content}>{options.id}</div>*/}
        {/*</Html>*/}
      </mesh>
      <mesh
        onPointerOver={(event) => onOver(event)}
        onPointerMove={(event) => onHover(event)}
        onPointerOut={() => onOut()}
        visible={false}
      >
        <planeGeometry />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};
