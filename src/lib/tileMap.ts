import * as THREE from "three";
import { tile } from "./tile";

export const tileMap = (scene: THREE.Scene, size: number = 5): void => {
  let index = 0;
  const tiles = [];
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      index += 1;
      const posX = -size / 2 + x;
      const posZ = -size / 2 + z;
      const newTile = tile(new THREE.Vector3(posX, 0, posZ), index);
      scene.add(newTile);
      tiles.push(newTile);
    }
  }
};
