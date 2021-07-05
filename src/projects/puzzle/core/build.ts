import { TilesProps } from "./types";

export const createTileMap = (props: any): TilesProps[] => {
  const factor = 1;
  const step = 1;
  const size = props.size.x * props.size.y;

  return [...Array(size)].map((item: any, index: number) => {
    const currentRow = Math.trunc(index / props.size.x);
    const offsetY = 0 - props.size.y / 2 + step / 2;
    const offsetX = 0 - props.size.x / 2 + step / 2;

    const positionY = (offsetY + currentRow) * factor;
    const positionX = (offsetX + index - currentRow * props.size.x) * factor;

    return {
      x: positionX,
      y: positionY,
      id: index,
      empty: true,
      clickedTile: null,
    };
  });
};

export const getRandomId = (range: number) => {
  return Math.trunc(Math.random() * (range + 1));
};

export const getRandomTiles = (
  count: number,
  tiles: TilesProps[]
): TilesProps[] => {
  console.log(tiles);

  const remainingTiles = [...tiles];
  const returningTiles = [];

  for (let i = 0; i < count; i++) {
    const random =
      remainingTiles[Math.floor(Math.random() * remainingTiles.length)];
    remainingTiles.splice(remainingTiles.indexOf(random), 1);
    returningTiles.push(random);
  }
  return returningTiles;
};
