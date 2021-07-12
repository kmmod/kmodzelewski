import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-grass-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["swamp-land"]: THREE.MeshStandardMaterial;
  };
};

export default function SwampGrass(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-grass.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="swamp-grass-MERGED"
          castShadow
          receiveShadow
          geometry={nodes["swamp-grass-MERGED"].geometry}
          material={materials["swamp-land"]}
          userData={{ name: "swamp-grass-MERGED" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-grass.gltf");
