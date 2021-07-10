import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gemColor, maxColors } from "../core/config";
import { getRandomId } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import { startState, tilesState } from "../core/state";
import { TileProp } from "../core/types";

export const Gem = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [color, setColor] = useState(String);

  const [tileMap, setTileMap] = useRecoilState(tilesState);

  const start = useRecoilValue(startState);

  const gem = useRef(null) as MutableRefObject<any>;
  const group = useRef(null) as MutableRefObject<any>;
  const wobbleMat = useRef(null) as MutableRefObject<any>;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    wobbleSize(hovered ? 0.2 : 0);
  }, [hovered]);

  useEffect(() => {
    const scale = selected ? 0.8 : 0.6;
    gsap.to(gem.current.scale, { x: scale, y: scale, z: scale, duration: 0.5 });
  }, [selected]);

  useEffect(() => {
    const colorId = getRandomId(maxColors);
    const newColor = gemColor(colorId);
    setColor(newColor);
  }, []);

  useEffect(() => {
    const selectedState = tileMap.filter(
      (item: any) => item.child === props.id
    )[0];
    setSelected(selectedState?.selected);

    const clickedTile = tileMap.filter(
      (item: any) => item.clicked === true && item.child === null
    )[0];
    const selectedTile = tileMap.filter(
      (item: any) => item.selected === true && item.child === props.id
    )[0];
    if (selectedTile && clickedTile) {
      moveGem(clickedTile);
      resetTileMap(selectedTile, clickedTile);
    }
  }, [tileMap]);

  const moveGem = (tile: TileProp) => {
    gsap.to(group.current.position, {
      x: tile.x,
      y: tile.y,
      duration: 0.5,
    });
  };

  const resetTileMap = (selected: TileProp, clicked: TileProp) => {
    setTileMap((oldMap) =>
      [...oldMap].map((item: any) => {
        const defState = { clicked: false, selected: false };
        if (item.child === props.id)
          return { ...item, ...defState, child: null };
        if (item.id === clicked.id)
          return { ...item, ...defState, child: props.id };
        return { ...item, ...defState };
      })
    );
  };

  const baseZ = 0.5;

  const wobbleSize = (size: number) => {
    gsap.to(wobbleMat.current, {
      factor: size,
      duration: 1.0,
    });
    gsap.to(gem.current.position, { z: baseZ + size / 2, duration: 1.0 });
  };

  return (
    <group ref={group} position={props.position}>
      <mesh ref={gem} position={[0, 0, baseZ]} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry />
        <meshStandardMaterial color={"red"} />
        {/*// @ts-ignore*/}
        <MeshWobbleMaterial
          ref={wobbleMat}
          factor={0}
          speed={5}
          color={new THREE.Color(color)}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={1.0}
        />
      </mesh>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={false}
      >
        <planeGeometry args={[1.0, 1.0, 1.0]} />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};
