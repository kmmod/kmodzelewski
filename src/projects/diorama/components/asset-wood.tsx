import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["wood-log"]: THREE.Mesh;
  };
  materials: {
    ["wood-log"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampWood(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-wood.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="wood-log"
          castShadow
          receiveShadow
          geometry={nodes["wood-log"].geometry}
          material={materials["wood-log"]}
          userData={{ name: "wood-log" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-wood.gltf");
