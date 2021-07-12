import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    ["31"]: THREE.Mesh;
  };
  materials: {
    ["31"]: THREE.MeshStandardMaterial;
  };
};

export default function Character31(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF("/diorama/swamp-31.gltf") as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="31"
          castShadow
          receiveShadow
          geometry={nodes["31"].geometry}
          material={materials["31"]}
          userData={{ name: "31" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/diorama/swamp-31.gltf");
