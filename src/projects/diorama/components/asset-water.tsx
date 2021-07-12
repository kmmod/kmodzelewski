import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["swamp-water-MERGED"]: THREE.Mesh;
  };
  materials: {
    ["swamp-water"]: THREE.MeshPhysicalMaterial;
  };
};

export default function SwampWater(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-diorama-water.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="swamp-water-MERGED"
          castShadow
          receiveShadow
          geometry={nodes["swamp-water-MERGED"].geometry}
          material={materials["swamp-water"]}
          userData={{ name: "swamp-water-MERGED" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-diorama-water.gltf");
