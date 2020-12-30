export function gameOfLife(board) {
  let newGenerationBoard = [];

  board.forEach((row, rowIndex) => {
    pushNewGenerationRow(newGenerationBoard, [board, rowIndex, row]);
  });

  return newGenerationBoard;
}

export function pushNewGenerationRow(newGenerationBoard, [board, rowIndex, row]) {
  let newGenerationRow = [];

  row.forEach((cell, cellIndex) => {
    pushNewGenerationCell(newGenerationRow, [board, rowIndex, cellIndex, cell]);
  });

  newGenerationBoard.push(newGenerationRow);
}

export function pushNewGenerationCell(newGenerationRow, [board, rowIndex, cellIndex, cell]) {
  let nbNeighbors = countNeighbors(board, rowIndex, cellIndex);

  if (cell > 0) {
    if (nbNeighbors < 2) newGenerationRow.push(0);
    else if (nbNeighbors < 4) newGenerationRow.push(1);
    else newGenerationRow.push(0);
  } else if (nbNeighbors == 3) {
    newGenerationRow.push(1);
  } else {
    newGenerationRow.push(0);
  }
}

export function countNeighbors(board, rowIndex, cellIndex) {
  let count = 0;

  if (rowIndex > 0) count += countNeighborsInOtherRow(board, rowIndex - 1, cellIndex);
  count += countNeighborsInSameRow(board, rowIndex, cellIndex);
  if (rowIndex < board.length - 1) count += countNeighborsInOtherRow(board, rowIndex + 1, cellIndex);

  return count;
}

export function countNeighborsInOtherRow(board, rowIndex, cellIndex) {
  let count = 0;
  let row = board[rowIndex];

  if (cellIndex > 0) count += row[cellIndex - 1] > 0 ? 1 : 0;
  count += row[cellIndex] > 0 ? 1 : 0;
  if (cellIndex < row.length - 1) count += row[cellIndex + 1] > 0 ? 1 : 0;

  return count;
}
export function countNeighborsInSameRow(board, rowIndex, cellIndex) {
  let count = 0;
  let row = board[rowIndex];

  if (cellIndex > 0) count += row[cellIndex - 1] > 0 ? 1 : 0;
  if (cellIndex < row.length - 1) count += row[cellIndex + 1] > 0 ? 1 : 0;

  return count;
}
