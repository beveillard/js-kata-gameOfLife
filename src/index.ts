export class Position {
  y: number;
  x: number;
}

export class Cell {
  position: Position;
  alive: boolean;
}

export function gameOfLife(game: Array<Position>): Array<Position> {
  let extendedGame: Array<Cell> = [];
  let nextGame = [];

  game.forEach((position) => {
    extendedGame.push({ position: position, alive: true });
  });

  game.forEach((position) => {
    extendGame(extendedGame, getNeighborhood(position));
  });

  extendedGame.forEach((cell) => {
    let nbLiveNeighbors = countLiveNeighbors(cell.position, extendedGame);
    if (cell.alive) {
      if (staysAlive(nbLiveNeighbors)) nextGame.push(cell.position);
    }
    else {
      if (becomesAlive(nbLiveNeighbors)) nextGame.push(cell.position);
    }
  });

  return nextGame;
}

export function getNeighborhood(position: Position): Array<Position> {
  return cellNeighborhood.map((neighbor) => {
    return {
      y: position.y + neighbor.y,
      x: position.x + neighbor.x,
    }
  })
}

export function extendGame(extendedGame: Array<Cell>, neighborhood: Array<Position>) {
  neighborhood.forEach((position) => {
    if (!isInExtendedGame(extendedGame, position)) extendedGame.push({ position: position, alive: false })
  });
}

export function isInExtendedGame(extendedGame: Array<Cell>, position: Position): boolean {
  for (let index = 0; index < extendedGame.length; index++) {
    if ((position.y === extendedGame[index].position.y) && (position.x === extendedGame[index].position.x))
      return true;
  }
  return false;
}

export function getSquareDistance(position0: Position, position1: Position): number {
  let deltaY = position1.y - position0.y;
  let deltaX = position1.x - position0.x;
  return deltaX * deltaX + deltaY * deltaY;
}

export function countLiveNeighbors(position: Position, extendedGame: Array<Cell>): number {
  let nbLiveNeighbors = 0;

  extendedGame.forEach((cell) => {
    if (cell.alive) {
      let squareDistance = getSquareDistance(position, cell.position);
      if ((squareDistance === 1) || (squareDistance === 2)) nbLiveNeighbors++;
    }
  });

  return nbLiveNeighbors;
}

export function staysAlive(nbNeighbors: number): boolean {
  return (nbNeighbors == 2) || (nbNeighbors == 3);
}

export function becomesAlive(nbNeighbors: number): boolean {
  return (nbNeighbors == 3);
}

const cellNeighborhood: Array<Position> = [
  { y: -1, x: -1 },
  { y: -1, x: 0 },
  { y: -1, x: 1 },
  { y: 0, x: -1 },
  { y: 0, x: 1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
];
