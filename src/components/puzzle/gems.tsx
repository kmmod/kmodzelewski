import React, { useEffect, useState } from "react";
import { Gem } from "./gem";

export const Gems = (props: any) => {
  console.log(props.tiles);

  const [gems, setGems] = useState<any>([]);

  const tileCount = props.tiles.length;

  useEffect(() => {
    const initAmount = Math.floor(tileCount / 2);
    const initGems = [<Gem position={[1, 1, 0]} key={0} />];
    setGems(initGems);
  }, []);

  return <>{gems}</>;
};
