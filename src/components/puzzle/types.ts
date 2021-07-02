type Vector2d = {
  x: number;
  y: number;
};

export interface GridSize {
  size: Vector2d;
}

export interface PuzzleOptions extends GridSize {
  colours: number;
}

export interface TileProperties {
  position: Vector2d;
}
