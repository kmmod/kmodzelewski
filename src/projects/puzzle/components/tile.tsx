import { TileComponent, TileProp } from "../core/types";
import React, { MutableRefObject, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { content } from "../../../styles/puzzle.module.scss";
import { useRecoilState } from "recoil";
import { tilesState } from "../core/state";

export const Tile = (props: TileComponent) => {
  const mesh = useRef(null) as MutableRefObject<any>;
  const mat = useRef(null) as MutableRefObject<any>;

  const [tileMap, setTileMap] = useRecoilState(tilesState);

  const onClicked = () => {
    const tile = tileMap.filter((item: TileProp) => item.id === props.id)[0];
    console.log(tile.idX, tile.idY);
    const preparedTile = () => {
      if (tile.child === null) return { ...tile, clicked: true };
      if (!tile.selected) return { ...tile, clicked: true, selected: true };
      if (tile.selected) return { ...tile, clicked: true, selected: false };
    };
    setTileMap((oldMap) =>
      [...oldMap].map((item: any) => {
        if (item.id === props.id) return preparedTile();
        if (preparedTile().selected)
          return { ...item, clicked: false, selected: false };
        return { ...item, clicked: false };
      })
    );
  };

  const onHover = () => {};

  const onHoverMove = (event: ThreeEvent<PointerEvent>) => {
    if (event && event.uv !== undefined) {
      const distanceX = (event.uv.x - 0.5) * 0.8;
      const distanceY = (0.5 - event.uv.y) * 0.8;
      animateRotation(distanceY, distanceX);
      animatePosition(-0.3);
      animateScale(0.88);
      animateMaterial(0.6);
    }
  };

  const onOut = () => {
    animateRotation(0, 0);
    animatePosition(0);
    animateScale(0.95);
    animateMaterial(0.4);
  };

  const animateRotation = (destX: number, destY: number) => {
    gsap.to(mesh.current.rotation, { x: destX, y: destY, duration: 0.5 });
  };

  const animatePosition = (distance: number) => {
    gsap.to(mesh.current.position, { z: distance, duration: 0.5 });
  };

  const animateScale = (value: number) => {
    gsap.to(mesh.current.scale, {
      x: value,
      y: value,
      z: value,
      duration: 0.5,
    });
  };

  const animateMaterial = (value: number) => {
    gsap.to(mat.current, { metalness: value, duration: 0.8 });
  };

  const debug = false;

  return (
    <group position={[props.x, props.y, 0]}>
      <mesh ref={mesh} scale={[0.95, 0.95, 0.95]}>
        <planeGeometry />
        <meshStandardMaterial
          ref={mat}
          color={"white"}
          roughness={0.9}
          metalness={0.4}
        />
        {debug ? (
          <Html distanceFactor={3}>
            <div className={content}>
              <p>id:{props.id}</p>
              <p>child:{tileMap[props.id]?.child}</p>
              <p>clicked:{tileMap[props.id]?.clicked.toString()}</p>
              <p>selected:{tileMap[props.id]?.selected.toString()}</p>
              <p>color:{tileMap[props.id]?.color}</p>
            </div>
          </Html>
        ) : null}
      </mesh>
      <mesh
        onPointerOver={(event) => onHover()}
        onPointerMove={(event) => onHoverMove(event)}
        onPointerOut={() => onOut()}
        onPointerDown={() => onClicked()}
        visible={false}
      >
        <planeGeometry />
        <meshBasicMaterial wireframe={true} />
      </mesh>
    </group>
  );
};
