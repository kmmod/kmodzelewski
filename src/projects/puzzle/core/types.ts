export interface Vector2d {
  x: number;
  y: number;
}

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
  idX: number;
  idY: number;
  child: number | null;
  color: string | null;
  remove: boolean;
  hovered: boolean;
  clicked: boolean;
  selected: boolean;
}

export interface TileComponent extends TileCoord {
  onHover: any;
  onClicked: any;
}
