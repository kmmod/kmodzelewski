import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    Stones002: THREE.Mesh;
    Stones003: THREE.Mesh;
    Stones004: THREE.Mesh;
  };
  materials: {
    Stones: THREE.MeshStandardMaterial;
  };
};

export default function SwampStones(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-stones.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="Stones002"
        castShadow
        receiveShadow
        geometry={nodes.Stones002.geometry}
        material={nodes.Stones002.material}
        userData={{ name: "Stones.002" }}
      />
      <mesh
        name="Stones003"
        castShadow
        receiveShadow
        geometry={nodes.Stones003.geometry}
        material={nodes.Stones003.material}
        userData={{ name: "Stones.003" }}
      />
      <mesh
        name="Stones004"
        castShadow
        receiveShadow
        geometry={nodes.Stones004.geometry}
        material={nodes.Stones004.material}
        rotation={[0, 0.78, 0]}
        userData={{ name: "Stones.004" }}
      />
    </group>
  );
}

useGLTF.preload("/diorama/swamp-stones.gltf");
