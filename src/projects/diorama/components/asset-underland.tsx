import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-underland-MERGED001"]: THREE.Mesh;
  };
  materials: {
    ["swamp-underland"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampUnderland(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-underland.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="swamp-underland-MERGED001"
        castShadow
        receiveShadow
        geometry={nodes["swamp-underland-MERGED001"].geometry}
        material={materials["swamp-underland"]}
        userData={{ name: "swamp-underland-MERGED.001" }}
      />
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-underland.gltf");
