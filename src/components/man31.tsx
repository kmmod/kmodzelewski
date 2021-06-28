import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    ['31']: THREE.Mesh
  }
  materials: {
    ['31walk+idle']: THREE.MeshStandardMaterial
  }
}

export function Man31(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const map = useTexture("/31walk+idle.png");
  map.magFilter = THREE.NearestFilter;
  map.minFilter = THREE.NearestFilter;
  map.offset.y = 0;
  map.flipY = false;
  const { nodes, materials } = useGLTF('/31.gltf') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="31"
          castShadow
          receiveShadow
          geometry={nodes['31'].geometry}
          material={materials['31walk+idle']}
          userData={{ name: '31' }}
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
  )
}

useGLTF.preload('/31.gltf')
