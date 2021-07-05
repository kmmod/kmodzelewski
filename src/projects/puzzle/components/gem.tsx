import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export const Gem = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const gem = useRef(null) as MutableRefObject<any>;
  const wobbleMat = useRef(null) as MutableRefObject<any>;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    wobbleSize(hovered ? 0.2 : 0);
  }, [hovered]);

  useEffect(() => {
    const scale = selected ? 0.8 : 0.6;
    gsap.to(gem.current.scale, { x: scale, y: scale, z: scale, duration: 1 });
  }, [selected]);

  useEffect(() => {
    setSelected(false);
  }, [props.deselect]);

  const onSelected = () => {
    setSelected(true);
    props.onSelected(props.id);
  };

  const baseZ = 0.5;

  const wobbleSize = (size: number) => {
    gsap.to(wobbleMat.current, {
      factor: size,
      duration: 1.0,
    });
    gsap.to(gem.current.position, { z: baseZ + size / 2, duration: 1.0 });
  };

  return (
    <group position={props.position}>
      <mesh ref={gem} position={[0, 0, baseZ]} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
        <MeshWobbleMaterial
          ref={wobbleMat}
          factor={0}
          speed={5}
          color={new THREE.Color(0xff0000)}
          emissive={new THREE.Color(0xff000022)}
        />
      </mesh>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => onSelected()}
        visible={false}
      >
        <planeGeometry args={[1.0, 1.0, 1.0]} />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};
