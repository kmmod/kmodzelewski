import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-water-bottom-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["swamp-land"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampBottom(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-bottom.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="swamp-water-bottom-MERGED"
        castShadow
        receiveShadow
        geometry={nodes["swamp-water-bottom-MERGED"].geometry}
        material={materials["swamp-land"]}
        userData={{ name: "swamp-water-bottom-MERGED" }}
      />
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-bottom.gltf");
