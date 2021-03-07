export interface Position {
  y: number;
  x: number;
}

export interface Cell {
  position: Position;
  alive: boolean;
}

const NEIGHBORS_OFFSETS: Position[] = [
  { y: -1, x: -1 },
  { y: -1, x: 0 },
  { y: -1, x: 1 },
  { y: 0, x: -1 },
  { y: 0, x: 1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
];

export function gameOfLife(game: Position[]): Position[] {

  const liveCells: Cell[] = game.map(toLiveCell);
  const neighbors: Cell[] = flatten(game.map(getNeighbors));
  const generation0: Cell[] = neighbors.reduce(appendIfNotPresent, liveCells);
  const generation1: Cell[] = generation0.map(nextGeneration);

  return generation1.reduce(appendPositionIfAlive, []);
}

function toLiveCell(position: Position): Cell {
  return { position, alive: true };
}

export function getNeighbors(position: Position): Cell[] {

  function toDeadCell(position: Position): (offset: Position) => Cell {
    return function (offset: Position): Cell {
      return {
        position: {
          y: position.y + offset.y,
          x: position.x + offset.x,
        },
        alive: false
      };
    }
  }

  return NEIGHBORS_OFFSETS.map(toDeadCell(position));
}

function appendIfNotPresent(matrix: Cell[], cell: Cell): Cell[] {
  if (!isInMatrix(matrix, cell)) {
    return [...matrix, cell];
  }
  return matrix;
}

function nextGeneration({ position, alive }: Cell, index: number, matrix: Cell[]): Cell {
  const nbLiveNeighbors = countLiveNeighbors(position, matrix);

  if ((alive && staysAlive(nbLiveNeighbors)) || !(alive || becomesAlive(nbLiveNeighbors))) {
    return { position: position, alive: alive };
  }

  return { position: position, alive: !alive };
}

function appendPositionIfAlive(game: Position[], { position, alive }: Cell): Position[] {
  if (alive) {
    return [...game, position];
  }
  return game;
}

export function isInMatrix(matrix: Cell[], cell: Cell): boolean {

  return matrix
    .map(isSamePosition(cell))
    .reduce(or, false);
}

export function countLiveNeighbors(position: Position, matrix: Cell[]): number {

  function incrementIfLiveNeighbor(nbLiveNeighbors: number, cell: Cell): number {
    if (cell.alive) {
      const squareDistance = getSquareDistance(position, cell.position);
      if (squareDistance === 1 || squareDistance === 2) nbLiveNeighbors++;
    }
    return nbLiveNeighbors;
  }

  return matrix.reduce(incrementIfLiveNeighbor, 0);
}

export function getSquareDistance(position0: Position, position1: Position): number {
  let deltaY = position1.y - position0.y;
  let deltaX = position1.x - position0.x;
  return deltaX * deltaX + deltaY * deltaY;
}

export function staysAlive(nbNeighbors: number): boolean {
  return nbNeighbors == 2 || nbNeighbors == 3;
}

export function becomesAlive(nbNeighbors: number): boolean {
  return nbNeighbors == 3;
}

function isSamePosition(cell1: Cell): (cell2: Cell) => boolean {
  return (cell2: Cell) => (cell1.position.x === cell2.position.x) && (cell1.position.y === cell2.position.y);
}

function flatten<T>(matrix: T[][]): T[] {  // cf. Lodash
  return matrix.reduce(concatArrays, [])
}

function concatArrays<T>(acc: T[], cur: T[]): T[] {
  return [...acc, ...cur];
}

function or(b1: boolean, b2: boolean): boolean {
  return b1 || b2;
}
