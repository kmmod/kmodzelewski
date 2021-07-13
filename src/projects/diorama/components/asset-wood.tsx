import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    woodlog: THREE.Mesh;
    woodlog001: THREE.Mesh;
  };
  materials: {
    wood_log_16_32_16: THREE.MeshStandardMaterial;
  };
};

export default function SwampWood(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    "/diorama/swamp-wood.gltf"
  ) as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="woodlog"
        castShadow
        receiveShadow
        geometry={nodes.woodlog.geometry}
        material={nodes.woodlog.material}
        userData={{ name: "wood.log" }}
      />
      <mesh
        name="woodlog001"
        castShadow
        receiveShadow
        geometry={nodes.woodlog001.geometry}
        material={nodes.woodlog001.material}
        userData={{ name: "wood.log.001" }}
      />
    </group>
  );
}

useGLTF.preload("/diorama/swamp-wood.gltf");
