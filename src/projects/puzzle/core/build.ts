import { TileProp, Vector2d } from "./types";

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
      color: null,
      remove: false,
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

export const getRemoveList = (id: number, tileMap: TileProp[]) => {
  const checkMatrix = [
    [
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ],
    [
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: -1 },
    ],
    [
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: -1, y: 0 },
    ],
  ];

  const results = <any>[];
  const tile = tileMap.filter((item: any) => item.child === id)[0];
  checkMatrix.forEach((item: any[]) => {
    const colorMatch = item.map((elem: any) => compare(elem, tile, tileMap));
    if (colorMatch.every((item: any) => item !== null))
      results.push(...colorMatch);
  });

  if (results.length > 0) results.push(tile);

  return results;
};

const compare = (elem: any, tile: TileProp, tileMap: TileProp[]) => {
  const tileToCheck = tileMap.filter(
    (item: any) =>
      item.idX === tile.idX + elem.x && item.idY === tile.idY + elem.y
  );
  const sameTile =
    tileToCheck.length > 0 &&
    tileToCheck[0].color !== null &&
    tileToCheck[0].color === tile.color;
  return sameTile ? tileToCheck[0] : null;
};
