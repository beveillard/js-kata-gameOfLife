import {
  Position,
  staysAlive,
  becomesAlive,
  getSquareDistance,
  countLiveNeighbors,
  isInMatrix,
  getNeighbors,
  gameOfLife,
} from ".";

describe("Test of staysAlive()", function () {
  it("Should die due to underpopulation (0)", function () {
    expect(staysAlive(0)).toEqual(false);
  });

  it("Should die due to underpopulation (1)", function () {
    expect(staysAlive(1)).toEqual(false);
  });

  it("Should survive (2)", function () {
    expect(staysAlive(2)).toEqual(true);
  });

  it("Should survive (3)", function () {
    expect(staysAlive(3)).toEqual(true);
  });

  it("Should die due to overpopulation (4)", function () {
    expect(staysAlive(4)).toEqual(false);
  });
});

describe("Test of becomesAlive()", function () {
  it("Should stay dead (0)", function () {
    expect(becomesAlive(0)).toEqual(false);
  });

  it("Should stay dead (1)", function () {
    expect(becomesAlive(1)).toEqual(false);
  });

  it("Should stay dead (2)", function () {
    expect(becomesAlive(2)).toEqual(false);
  });

  it("Should become alive (3)", function () {
    expect(becomesAlive(3)).toEqual(true);
  });

  it("Should stay dead (4)", function () {
    expect(becomesAlive(4)).toEqual(false);
  });
});

describe("Test of getSquareDistance()", function () {
  it("Should return 0", function () {
    expect(getSquareDistance({ y: 0, x: 0 }, { y: 0, x: 0 })).toEqual(0);
  });

  it("Should return 1", function () {
    expect(getSquareDistance({ y: 0, x: 0 }, { y: 1, x: 0 })).toEqual(1);
  });

  it("Should return 2", function () {
    expect(getSquareDistance({ y: 0, x: 0 }, { y: 1, x: -1 })).toEqual(2);
  });

  it("Should return 5", function () {
    expect(getSquareDistance({ y: 0, x: 0 }, { y: 1, x: -2 })).toEqual(5);
  });
});

describe("Test of countLiveNeighbors()", function () {
  it("Should return 0", function () {
    expect(countLiveNeighbors({ y: 0, x: 0 }, [{ position: { y: 0, x: 0 }, alive: true }])).toEqual(0);
  });

  it("Should return 0", function () {
    expect(countLiveNeighbors({ y: 0, x: 0 }, [{ position: { y: 0, x: 1 }, alive: false }])).toEqual(0);
  });

  it("Should return 1", function () {
    expect(countLiveNeighbors({ y: 0, x: 0 }, [{ position: { y: 0, x: 1 }, alive: true }])).toEqual(1);
  });
});

describe("Test of isInMatrix", function () {
  it("is not in matrix", function () {
    // Given
    const cell = { position: { y: 1, x: 1 }, alive: false };
    const matrix = [];
    // When
    const result = isInMatrix(matrix, cell);
    // Then
    expect(result).toEqual(false);
  });

  it("is not in matrix", function () {
    // Given
    const cell = { position: { y: 1, x: 1 }, alive: false };
    const matrix = [{ position: { y: 0, x: 0 }, alive: undefined }];
    // When
    const result = isInMatrix(matrix, cell);
    // Then
    expect(result).toEqual(false);
  });

  it("is in matrix", function () {
    // Given
    const cell = { position: { y: 1, x: 1 }, alive: false };
    const matrix = [
      { position: { y: 0, x: 0 }, alive: undefined },
      { position: { y: 1, x: 1 }, alive: undefined },
    ];
    // When
    const result = isInMatrix(matrix, cell);
    // Then
    expect(result).toEqual(true);
  });
});

describe("Test of getNeighbors", function () {
  it("Should return the neighbors", function () {
    // Given
    const position = { y: 1, x: 1 };
    // When
    const neigbhors = getNeighbors(position);
    // Then
    expect(neigbhors).toEqual(
      [
        { position: { y: 0, x: 0 }, alive: false },
        { position: { y: 0, x: 1 }, alive: false },
        { position: { y: 0, x: 2 }, alive: false },
        { position: { y: 1, x: 0 }, alive: false },
        { position: { y: 1, x: 2 }, alive: false },
        { position: { y: 2, x: 0 }, alive: false },
        { position: { y: 2, x: 1 }, alive: false },
        { position: { y: 2, x: 2 }, alive: false },
      ]
    );
  });
});

describe("Test basics of gameOfLife()", function () {
  it("Should stay dead", function () {
    // Given
    const start = { y: 0, x: 0 };
    const end = { y: 3, x: 3 };
    const generation0 = [];
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });

  it("Should die", function () {
    // Given
    const start = { y: 0, x: 0 };
    const end = { y: 3, x: 3 };
    const generation0 = [
      { y: 1, x: 1 },
      { y: 1, x: 2 },
    ];
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual([]);
  });
});

describe("Test Still lifes", function () {
  it("Block", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 3, x: 3 };
    const generation0 = [
      { y: 1, x: 1 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 2, x: 2 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });

  it("Bee-hive", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 4, x: 5 };
    const generation0 = [
      { y: 1, x: 2 },
      { y: 1, x: 3 },
      { y: 2, x: 1 },
      { y: 2, x: 4 },
      { y: 3, x: 2 },
      { y: 3, x: 3 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });

  it("Loaf", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 5, x: 5 };
    const generation0 = [
      { y: 1, x: 2 },
      { y: 1, x: 3 },
      { y: 2, x: 1 },
      { y: 2, x: 4 },
      { y: 3, x: 2 },
      { y: 3, x: 4 },
      { y: 4, x: 3 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });

  it("Boat", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 4, x: 4 };
    const generation0 = [
      { y: 1, x: 1 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 2, x: 3 },
      { y: 3, x: 2 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });

  it("Tub", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 4, x: 4 };
    const generation0 = [
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 2, x: 3 },
      { y: 3, x: 2 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    // Then
    expect(generation1).toEqual(generation0);
  });
});

describe("Test Oscillators", function () {
  it("Blinker", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 4, x: 4 };
    const generation0 = [
      { y: 2, x: 1 },
      { y: 2, x: 2 },
      { y: 2, x: 3 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    // Then
    expect(generation2.sort(comparePositions)).toEqual(generation0.sort(comparePositions));
  });

  it("Toad", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 5, x: 5 };
    const generation0 = [
      { y: 2, x: 2 },
      { y: 2, x: 3 },
      { y: 2, x: 4 },
      { y: 3, x: 1 },
      { y: 3, x: 2 },
      { y: 3, x: 3 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    // Then
    expect(generation2.sort(comparePositions)).toEqual(generation0.sort(comparePositions));
  });

  it("Beacon", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 5, x: 5 };
    const generation0 = [
      { y: 1, x: 1 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 3, x: 4 },
      { y: 4, x: 3 },
      { y: 4, x: 4 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    // Then
    expect(generation2.sort(comparePositions)).toEqual(generation0.sort(comparePositions));
  });

  it("Pulsar", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 16, x: 16 };
    const generation0 = [
      { y: 2, x: 4 },
      { y: 2, x: 5 },
      { y: 2, x: 6 },
      { y: 2, x: 10 },
      { y: 2, x: 11 },
      { y: 2, x: 12 },

      { y: 4, x: 2 },
      { y: 4, x: 7 },
      { y: 4, x: 9 },
      { y: 4, x: 14 },
      { y: 5, x: 2 },
      { y: 5, x: 7 },
      { y: 5, x: 9 },
      { y: 5, x: 14 },
      { y: 6, x: 2 },
      { y: 6, x: 7 },
      { y: 6, x: 9 },
      { y: 6, x: 14 },

      { y: 7, x: 4 },
      { y: 7, x: 5 },
      { y: 7, x: 6 },
      { y: 7, x: 10 },
      { y: 7, x: 11 },
      { y: 7, x: 12 },

      { y: 9, x: 4 },
      { y: 9, x: 5 },
      { y: 9, x: 6 },
      { y: 9, x: 10 },
      { y: 9, x: 11 },
      { y: 9, x: 12 },

      { y: 10, x: 2 },
      { y: 10, x: 7 },
      { y: 10, x: 9 },
      { y: 10, x: 14 },
      { y: 11, x: 2 },
      { y: 11, x: 7 },
      { y: 11, x: 9 },
      { y: 11, x: 14 },
      { y: 12, x: 2 },
      { y: 12, x: 7 },
      { y: 12, x: 9 },
      { y: 12, x: 14 },

      { y: 14, x: 4 },
      { y: 14, x: 5 },
      { y: 14, x: 6 },
      { y: 14, x: 10 },
      { y: 14, x: 11 },
      { y: 14, x: 12 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    // Then
    expect(generation3.sort(comparePositions)).toEqual(generation0.sort(comparePositions));
  });

  it("Penta-decathlon", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 17, x: 10 };
    const generation0 = [
      { y: 3, x: 4 },
      { y: 3, x: 5 },
      { y: 3, x: 6 },

      { y: 4, x: 3 },
      { y: 4, x: 7 },
      { y: 5, x: 3 },
      { y: 5, x: 7 },

      { y: 6, x: 4 },
      { y: 6, x: 5 },
      { y: 6, x: 6 },

      { y: 11, x: 4 },
      { y: 11, x: 5 },
      { y: 11, x: 6 },

      { y: 12, x: 3 },
      { y: 12, x: 7 },
      { y: 13, x: 3 },
      { y: 13, x: 7 },

      { y: 14, x: 4 },
      { y: 14, x: 5 },
      { y: 14, x: 6 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    let generation5 = gameOfLife(generation4);
    let generation6 = gameOfLife(generation5);
    let generation7 = gameOfLife(generation6);
    let generation8 = gameOfLife(generation7);
    let generation9 = gameOfLife(generation8);
    let generation10 = gameOfLife(generation9);
    let generation11 = gameOfLife(generation10);
    let generation12 = gameOfLife(generation11);
    let generation13 = gameOfLife(generation12);
    let generation14 = gameOfLife(generation13);
    let generation15 = gameOfLife(generation14);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    displayGame(generation5, start, end, log);
    displayGame(generation6, start, end, log);
    displayGame(generation7, start, end, log);
    displayGame(generation8, start, end, log);
    displayGame(generation9, start, end, log);
    displayGame(generation10, start, end, log);
    displayGame(generation11, start, end, log);
    displayGame(generation12, start, end, log);
    displayGame(generation13, start, end, log);
    displayGame(generation14, start, end, log);
    displayGame(generation15, start, end, log);
    // Then
    expect(generation15.sort(comparePositions)).toEqual(generation0.sort(comparePositions));
  });
});

describe("Test Spaceships", function () {
  it("Glider", function () {
    // Given
    const log = false;
    const start = { y: -1, x: -1 };
    const end = { y: 4, x: 4 };
    const shift = { y: 1, x: 1 };
    const generation0 = [
      { y: 0, x: 2 },
      { y: 1, x: 0 },
      { y: 1, x: 2 },
      { y: 2, x: 1 },
      { y: 2, x: 2 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    // Then
    expect(generation4.sort(comparePositions)).toEqual(shiftGame(generation0, shift).sort(comparePositions));
  });

  it("Light-weight spaceship", function () {
    // Given
    const log = false;
    const start = { y: -1, x: 0 };
    const end = { y: 4, x: 7 };
    const shift = { y: 0, x: 2 };
    const generation0 = [
      { y: 0, x: 0 },
      { y: 0, x: 3 },
      { y: 1, x: 4 },
      { y: 2, x: 0 },
      { y: 2, x: 4 },
      { y: 3, x: 1 },
      { y: 3, x: 2 },
      { y: 3, x: 3 },
      { y: 3, x: 4 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    // Then
    expect(generation4.sort(comparePositions)).toEqual(shiftGame(generation0, shift).sort(comparePositions));
  });

  it("Middle-weight spaceship", function () {
    // Given
    const log = false;
    const start = { y: -2, x: 0 };
    const end = { y: 4, x: 7 };
    const shift = { y: 0, x: 2 };
    const generation0 = [
      { y: 0, x: 1 },
      { y: 0, x: 2 },
      { y: 0, x: 3 },
      { y: 0, x: 4 },
      { y: 0, x: 5 },
      { y: 1, x: 0 },
      { y: 1, x: 5 },
      { y: 2, x: 5 },
      { y: 3, x: 0 },
      { y: 3, x: 4 },
      { y: 4, x: 2 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    // Then
    expect(generation4.sort(comparePositions)).toEqual(shiftGame(generation0, shift).sort(comparePositions));
  });

  it("Heavy-weight spaceship", function () {
    // Given
    const log = false;
    const start = { y: 0, x: 0 };
    const end = { y: 6, x: 8 };
    const shift = { y: 0, x: 2 };
    const generation0 = [
      { y: 0, x: 2 },
      { y: 0, x: 3 },
      { y: 1, x: 0 },
      { y: 1, x: 5 },
      { y: 2, x: 6 },
      { y: 3, x: 0 },
      { y: 3, x: 6 },
      { y: 4, x: 1 },
      { y: 4, x: 2 },
      { y: 4, x: 3 },
      { y: 4, x: 4 },
      { y: 4, x: 5 },
      { y: 4, x: 6 },
    ];
    displayGame(generation0, start, end, log);
    // When
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    // Then
    expect(generation4.sort(comparePositions)).toEqual(shiftGame(generation0, shift).sort(comparePositions));
  });
});

function displayGame(game: Position[], start: Position, end: Position, log: boolean) {
  if (!log) return;

  let dy = end.y - start.y + 1;
  let dx = end.x - start.x + 1;

  let board = new Array(dy).fill(undefined).map(() => {
    return new Array(dx).fill(0);
  });

  let y: number, x: number;
  game.forEach((position) => {
    y = position.y - start.y;
    x = position.x - start.x;
    if (x >= 0 && y >= 0 && x < dx && y < dy) board[y][x] = 1;
  });

  let string = "";
  board.forEach((line) => {
    string += "- ";
    line.forEach((cell) => {
      if (cell == 0) string += "  ";
      else string += "* ";
    });
    string += "-\n";
  });

  console.log(string);
}

function shiftGame(game: Position[], shift: Position): Position[] {
  return game.map((position) => {
    return { y: position.y + shift.y, x: position.x + shift.x };
  });
}

function comparePositions(a: Position, b: Position) {
  if (a.y < b.y) return -1;
  if (a.y > b.y) return +1;
  if (a.x < b.x) return -1;
  if (a.x > b.x) return +1;
  return 0;
}
