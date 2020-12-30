export function gameOfLife(board) {

  return board.map(
    (row, rowIndex) => { return getNewGenerationRow(board, rowIndex, row); }
  );

}

export function getNewGenerationRow(board, rowIndex, row) {

  return row.map(
    (cell, cellIndex) => { return getNewGenerationCell(board, rowIndex, cellIndex, cell); }
  );

}

export function getNewGenerationCell(board, rowIndex, cellIndex, cell) {

  return livesOrDies(cell, countNeighbors(board, rowIndex, cellIndex));

}

export function livesOrDies(cell, nbNeighbors) {
  if (isAlive(cell)) {
    if (nbNeighbors < 2) return dead();
    else if (nbNeighbors < 4) return alive();
    else return dead();
  }
  else {
    if (nbNeighbors == 3) return alive();
    else return dead();
  };
}

export function countNeighbors(board, rowIndex, cellIndex) {
  let count = 0;

  if (rowIndex > 0)
    count += countNeighborsInOtherRow(board, rowIndex - 1, cellIndex);

  count += countNeighborsInSameRow(board, rowIndex, cellIndex);

  if (rowIndex < board.length - 1)
    count += countNeighborsInOtherRow(board, rowIndex + 1, cellIndex);

  return count;
}

export function countNeighborsInOtherRow(board, rowIndex, cellIndex) {
  let count = 0;
  let row = board[rowIndex];

  if (cellIndex > 0)
    if (isAlive(row[cellIndex - 1]))
      count++;

  if (isAlive(row[cellIndex]))
    count++;

  if (cellIndex < row.length - 1)
    if (isAlive(row[cellIndex + 1]))
      count++;

  return count;
}

export function countNeighborsInSameRow(board, rowIndex, cellIndex) {
  let count = 0;
  let row = board[rowIndex];

  if (cellIndex > 0)
    if (isAlive(row[cellIndex - 1]))
      count++;

  if (cellIndex < row.length - 1)
    if (isAlive(row[cellIndex + 1]))
      count++;

  return count;
}

function isAlive(cell) { return cell > 0; }

function alive() { return 1; }

function dead() { return 0; }
