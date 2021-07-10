import { GridSize, TileCoord, TileProp, Vector2d } from "./types";

export const createTileMap = (size: Vector2d): TileProp[] => {
  const factor = 1;
  const step = 1;
  const listSize = size.x * size.y;

  return [...Array(listSize)].map((item: any, index: number) => {
    const currentRow = Math.trunc(index / size.x);
    const offsetX = 0 - size.x / 2 + step / 2;
    const offsetY = 0 - size.y / 2 + step / 2;

    const positionX = (offsetX + index - currentRow * size.x) * factor;
    const positionY = (offsetY + currentRow) * factor;

    const idX = index - currentRow * size.x;
    const idY = currentRow;

    return {
      x: positionX,
      y: positionY,
      id: index,
      idX,
      idY,
      child: null,
      hovered: false,
      clicked: false,
      selected: false,
    };
  });
};

export const getRandomId = (range: number) => {
  return Math.trunc(Math.random() * (range + 1));
};

export const getRandomTiles = (
  count: number,
  tiles: TileProp[]
): TileProp[] => {
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
