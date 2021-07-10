import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRecoilState, useRecoilValue } from "recoil";
import { gemsState, scoreState, tilesState, turnState } from "../core/state";
import { TileProp } from "../core/types";
import { getRemoveList } from "../core/build";

export const Gem = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const [tileMap, setTileMap] = useRecoilState(tilesState);
  const [gems, setGems] = useRecoilState(gemsState);
  const [turn, setTurn] = useRecoilState(turnState);
  const [score, setScore] = useRecoilState(scoreState);

  const gem = useRef(null) as MutableRefObject<any>;
  const group = useRef(null) as MutableRefObject<any>;
  const wobbleMat = useRef(null) as MutableRefObject<any>;

  useEffect(() => {
    const scale = hovered ? 0.69 : 0.6;
    gsap.to(gem.current.scale, { x: scale, y: scale, z: scale, duration: 0.5 });
  }, [hovered]);

  useEffect(() => {
    wobbleSize(selected ? 0.5 : 0);
  }, [selected]);

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
      removeList();
      newTurn();
    }
  }, [tileMap]);

  useEffect(() => {
    if (tileMap.filter((item: any) => item.child === props.id)[0]?.remove) {
      removeGem();
      setScore((oldValue) => oldValue + 10);
    }
  }, [turn]);

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
          return { ...item, ...defState, child: null, color: null };
        if (item.id === clicked.id)
          return { ...item, ...defState, child: props.id, color: props.color };
        return { ...item, ...defState };
      })
    );
  };

  const removeList = () => {
    setTileMap((oldMap) => {
      const colorMatch = getRemoveList(props.id, oldMap);
      return [...oldMap].map((item: any) => {
        if (colorMatch.some((match: any) => match.id === item.id))
          return { ...item, remove: true };
        return item;
      });
    });
  };

  const newTurn = () => {
    setTurn((oldTurn) => oldTurn + 1);
  };

  const removeGem = () => {
    setTileMap((oldMap: any) =>
      [...oldMap].map((item: any) => {
        if (item.child === props.id)
          return { ...item, child: null, color: null, remove: false };
        return item;
      })
    );

    const removeFromList = () => {
      setGems((oldGems) =>
        [...oldGems].filter((item: any) => item.props.id !== props.id)
      );
    };

    gsap.to(group.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      delay: 0.5,
    });
    gsap.to(group.current.position, {
      z: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => removeFromList(),
    });
  };

  const baseZ = 0.5;

  const wobbleSize = (size: number) => {
    gsap.to(wobbleMat.current, {
      factor: size,
      duration: 0.5,
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
          speed={9}
          color={new THREE.Color(props.color)}
          emissive={new THREE.Color(props.color)}
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
