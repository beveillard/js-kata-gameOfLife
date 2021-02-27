export function gameOfLife(game) {
  let extendedGame = [];
  let nextGame = [];

  game.forEach((cell) => {
    extendedGame.push([cell, true]);
  });

  game.forEach((cell) => {
    extendGame(extendedGame, getNeighborhood(cell));
  });

  extendedGame.forEach((cellWithStatus) => {
    let nbLiveNeighbors = countLiveNeighbors(cellWithStatus[0], extendedGame);
    if (isAlive(cellWithStatus)) {
      if (staysAlive(nbLiveNeighbors)) nextGame.push(cellWithStatus[0]);
    }
    else {
      if (becomesAlive(nbLiveNeighbors)) nextGame.push(cellWithStatus[0]);
    }
  });

  return nextGame;
}

export function getNeighborhood(cell) {
  return cellNeighborhood.map((neighbor) => {
    return [
      cell[0] + neighbor[0],
      cell[1] + neighbor[1],
    ]
  })
}

export function extendGame(extendedGame, neighborhood) {
  neighborhood.forEach((cell) => {
    if (!isInExtendedGame(cell, extendedGame)) extendedGame.push([cell, false])
  });
}

export function isInExtendedGame(cell, extendedGame) {
  for (let index = 0; index < extendedGame.length; index++) {
    if ((cell[0] === extendedGame[index][0][0]) && (cell[1] === extendedGame[index][0][1])) return true;
  }
  return false;
}

export function getSquareDistance(cell0, cell1) {
  let deltaY = cell1[0] - cell0[0];
  let deltaX = cell1[1] - cell0[1];
  return deltaX * deltaX + deltaY * deltaY;
}

export function countLiveNeighbors(cell, extendedGame) {
  let nbLiveNeighbors = 0;

  extendedGame.forEach((cellWithStatus) => {
    if (isAlive(cellWithStatus)) {
      let squareDistance = getSquareDistance(cell, cellWithStatus[0]);
      if ((squareDistance === 1) || (squareDistance === 2)) nbLiveNeighbors++;
    }
  });

  return nbLiveNeighbors;
}

export function staysAlive(nbNeighbors) {
  return (nbNeighbors == 2) || (nbNeighbors == 3);
}

export function becomesAlive(nbNeighbors) {
  return (nbNeighbors == 3);
}

function isAlive(cell) {
  return cell[1];
}

const cellNeighborhood = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
