import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { gemColor, maxColors } from "../core/config";
import { getRandomId } from "../core/build";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedGem,
  selectedTile,
  startState,
  tilesState,
} from "../core/state";

export const Gem = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [color, setColor] = useState(String);

  const [current, setCurrent] = useRecoilState(selectedGem);
  const [tileMap, setTileMap] = useRecoilState(tilesState);

  const currentTile = useRecoilValue(selectedTile);

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
    setSelected(current === props.id);
  }, [current]);

  useEffect(() => {
    setCurrent(null);
  }, [start]);

  useEffect(() => {
    console.log(currentTile);

    const sameTile = currentTile === props.parent;

    if (selected && !sameTile) {
      moveToTile();

      console.log("now move");
    }
  }, [currentTile]);

  const moveToTile = () => {
    const tileEmpty = tileMap.filter((item: any) => item.id === currentTile);
    console.log(tileEmpty[0]);
    if (tileEmpty[0].empty) {
      gsap.to(group.current.position, {
        x: tileEmpty[0].x,
        y: tileEmpty[0].y,
        duration: 0.5,
      });
      setTileMap((oldTiles) =>
        [...oldTiles].map((tile: any) => {
          if (tile.id === tileEmpty[0].id) {
            return { ...tile, empty: false, gemId: props.id };
          }
          if (tile.id === props.parent) {
            return { ...tile, empty: true, gemId: null };
          } else {
            return tile;
          }
        })
      );
      setSelected(false);
    }
  };

  const onSelected = () => {
    const checkCurrent = current === props.id;
    setCurrent(checkCurrent ? null : props.id);
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
          emissive={new THREE.Color("#000000")}
        />
      </mesh>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => onSelected()}
        visible={false}
      >
        <planeGeometry args={[1.0, 1.0, 1.0]} />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};
