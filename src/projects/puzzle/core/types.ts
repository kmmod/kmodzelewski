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

export interface TileCoord extends Vector2d {
  id: number;
}

export interface TileProp extends TileCoord {
  gemId: number | null;
  hovered: boolean;
  clicked: boolean;
  selected: boolean;
  empty: boolean;
}

export interface TileComponent extends TileCoord {
  onHover: any;
  onClicked: any;
}
