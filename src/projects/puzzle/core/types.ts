type Vector2d = {
  x: number;
  y: number;
};

export interface GridSize {
  size: Vector2d;
}

export interface Position {
  position: Vector2d;
}

export interface GridOptions extends GridSize {
  setTiles: any;
}

export interface PuzzleOptions extends GridSize {
  colours: number;
}

export interface TilesProps extends Vector2d {
  id: number;
  empty: boolean;
  clickedTile: any;
}
