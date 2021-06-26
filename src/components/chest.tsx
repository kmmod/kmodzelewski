import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    chest: THREE.Mesh;
  };
  materials: {
    chest_slices_21_26_28: THREE.MeshPhongMaterial;
  };
};

export function ChestModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const map = useTexture("/chest.png");
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.NearestFilter;
  const { nodes, materials } = useGLTF("/chest.gltf") as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" position={props.position}>
        <mesh
          name="chest"
          castShadow
          receiveShadow
          geometry={nodes.chest.geometry}
          material={materials.chest_slices_21_26_28}
          userData={{ name: "chest" }}
        >
          <meshStandardMaterial
            attach="material"
            transparent={true}
            map={map}
            flatShading={true}
            depthWrite={true}
            alphaTest={0.0}
            alphaToCoverage={true}
            roughness={1.0}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/chest.gltf");
