import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-lily-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["swamp-plant-lily"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampLily(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-lily.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="swamp-lily-MERGED"
          castShadow
          receiveShadow
          geometry={nodes["swamp-lily-MERGED"].geometry}
          material={materials["swamp-plant-lily"]}
          userData={{ name: "swamp-lily-MERGED" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-lily.gltf");
