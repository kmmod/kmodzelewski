import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { container } from "../../styles/puzzle.module.scss";
import { PuzzleOptions, TileProp } from "./core/types";
import { TileGrid } from "./components/tileGrid";
import { Camera } from "./components/camera";
import { createTileMap } from "./core/build";
import { TileMap } from "./components/TileMap";
import { Tiles } from "./components/tiles";
import { Gems } from "./components/gems";

const PuzzleMain = (props: PuzzleOptions) => {
  const [tiles, setTiles] = useState<TileProp[]>([]);
  const [current, setCurrent] = useState<Number | null>();

  useEffect(() => {
    const tileMap = createTileMap(props.size);
    setTiles(tileMap);
    console.log(tiles, tileMap);
  }, [props.size]);

  // const setSelected = (id: number) => {
  //   console.log(id);
  //   const newSelected = tiles.map((item: TileProp) =>
  //     item.id === id
  //       ? item.selected
  //         ? { ...item, selected: false }
  //         : { ...item, selected: true }
  //       : { ...item, selected: false }
  //   );
  //   setTiles(newSelected);
  // };

  const setSelected = (id: number) => {
    setCurrent(id);
  };

  return (
    <div className={container}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 10, 5]} intensity={0.5} color={"orange"} />
        <pointLight position={[0, -10, 5]} intensity={0.2} color={"blue"} />

        {/*<TileGrid tiles={tiles} />*/}
        {/*<TileMap size={tiles} />*/}
        <Tiles tileMap={tiles} setSelected={setSelected} />
        <Gems tiles={tiles} current={current} />
        <Camera size={props.size} />
      </Canvas>
    </div>
  );
};

export default PuzzleMain;
