import { TileComponent } from "../core/types";
import React, { MutableRefObject, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { content } from "../../../styles/puzzle.module.scss";

export const Tile = (props: TileComponent) => {
  const mesh = useRef(null) as MutableRefObject<any>;

  const onClicked = () => {
    props.onClicked(props.id);
  };

  const onHover = () => {
    props.onHover(props.id);
  };

  const onHoverMove = (event: ThreeEvent<PointerEvent>) => {
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
    <group position={[props.x, props.y, 0]}>
      <mesh ref={mesh} scale={[0.95, 0.95, 0.95]}>
        <planeGeometry />
        <meshStandardMaterial color={"white"} roughness={0.9} metalness={0.4} />
        {/*<Html distanceFactor={10}>*/}
        {/*  <div className={content}>{options.id}</div>*/}
        {/*</Html>*/}
      </mesh>
      <mesh
        onPointerOver={(event) => onHover()}
        onPointerMove={(event) => onHoverMove(event)}
        onPointerOut={() => onOut()}
        onPointerDown={() => onClicked()}
        visible={false}
      >
        <planeGeometry />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};