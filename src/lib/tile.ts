import * as THREE from "three"

export const tile = (position: THREE.Vector3, index: number): THREE.Mesh => {
  const geometry = new THREE.PlaneGeometry(1,1);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2)
  plane.scale.set(0.99,0.99,0.99)
  plane.position.set(position.x, position.y, position.z); 
  plane.name = "tile"
  return plane
}


