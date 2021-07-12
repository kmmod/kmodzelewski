import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-shore-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["swamp-grass-shore"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampShore(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-shore.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="swamp-shore-MERGED"
          castShadow
          receiveShadow
          geometry={nodes["swamp-shore-MERGED"].geometry}
          material={materials["swamp-grass-shore"]}
          userData={{ name: "swamp-shore-MERGED" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-shore.gltf");
