export interface Position {
  y: number;
  x: number;
}

export interface Cell {
  position: Position;
  alive: boolean;
}

export function gameOfLife(game: Position[]): Position[] {
  const aliveGame: Cell[] = game.map(toLiveCell);

  const neighbors: Cell[] = game.map((position) => getNeighbors(position).map(toDeadCell)).reduce(concat, []); // flatten cf. Lodash

  const extendedGame: Cell[] = neighbors.reduce((acc, cur) => {
    if (!isInExtendedGame(acc, cur.position)) {
      return [...acc, cur];
    }
    return acc;
  }, aliveGame);

  return extendedGame.reduce((acc, { position, alive }) => {
    const nbLiveNeighbors = countLiveNeighbors(position, extendedGame);

    if ((alive && staysAlive(nbLiveNeighbors)) || (!alive && becomesAlive(nbLiveNeighbors))) {
      return [...acc, position];
    }

    return acc;
  }, []);
}

function toLiveCell(position: Position): Cell {
  return { position, alive: true };
}

function toDeadCell(position: Position): Cell {
  return { position, alive: false };
}

function concat<T>(acc: T[], cur: T[]): T[] {
  return [...acc, ...cur];
}

export function getNeighbors(position: Position): Position[] {
  return CELL_NEIGHBORS.map((neighbor) => {
    return {
      y: position.y + neighbor.y,
      x: position.x + neighbor.x,
    };
  });
}

export function isInExtendedGame(extendedGame: Cell[], positionToLookFor: Position): boolean {
  return extendedGame.map(getPosition)
    .map(comparePositions(positionToLookFor)).reduce(or, false);
}

function getPosition({ position }: Cell): Position {
  return position
}

function comparePositions(p1: Position) {
  return function comparePositions(p2: Position): boolean {
    return p1.x === p2.x && p1.y === p2.y;
  }
}

function or(b1: boolean, b2: boolean): boolean {
  return b1 || b2;
}

export function getSquareDistance(position0: Position, position1: Position): number {
  let deltaY = position1.y - position0.y;
  let deltaX = position1.x - position0.x;
  return deltaX * deltaX + deltaY * deltaY;
}

export function countLiveNeighbors(position: Position, extendedGame: Cell[]): number {
  let nbLiveNeighbors = 0;

  extendedGame.forEach((cell) => {
    if (cell.alive) {
      let squareDistance = getSquareDistance(position, cell.position);
      if (squareDistance === 1 || squareDistance === 2) nbLiveNeighbors++;
    }
  });

  return nbLiveNeighbors;
}

export function staysAlive(nbNeighbors: number): boolean {
  return nbNeighbors == 2 || nbNeighbors == 3;
}

export function becomesAlive(nbNeighbors: number): boolean {
  return nbNeighbors == 3;
}

const CELL_NEIGHBORS: Position[] = [
  { y: -1, x: -1 },
  { y: -1, x: 0 },
  { y: -1, x: 1 },
  { y: 0, x: -1 },
  { y: 0, x: 1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
];
