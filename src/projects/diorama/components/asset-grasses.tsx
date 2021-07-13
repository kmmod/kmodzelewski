import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-grasses-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["grass-slices"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampGrasses(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-grasses.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="swamp-grasses-MERGED"
        castShadow
        receiveShadow
        geometry={nodes["swamp-grasses-MERGED"].geometry}
        material={materials["grass-slices"]}
        userData={{ name: "swamp-grasses-MERGED" }}
      />
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-grasses.gltf");
