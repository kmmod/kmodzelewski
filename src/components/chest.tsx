import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    chest: THREE.Mesh
  }
  materials: {
    chest_slices_21_26_28: THREE.MeshStandardMaterial
  }
}

export function ChestModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/chest.gltf') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="chest"
          castShadow
          receiveShadow
          geometry={nodes.chest.geometry}
          material={materials.chest_slices_21_26_28}
          userData={{ name: 'chest' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/chest.gltf')
