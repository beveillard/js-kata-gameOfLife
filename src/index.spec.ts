import {
  isInExtendedGame,
  extendGame,
  getNeighborhood,
  getSquareDistance,
  countLiveNeighbors,
  staysAlive,
  becomesAlive,
  gameOfLife,
} from ".";

describe("Test of isInGameArea()", function () {

  it("Should return false", function () {
    expect(
      isInExtendedGame([1, 1], [])
    ).toEqual(false);
  });

  it("Should return false", function () {
    expect(
      isInExtendedGame(
        [1, 1],
        [
          [[0, 0], undefined],
        ]
      )
    ).toEqual(false);
  });

  it("Should return true", function () {
    expect(
      isInExtendedGame(
        [1, 1],
        [
          [[0, 0], undefined],
          [[1, 1], undefined],
        ]
      )
    ).toEqual(true);
  });

});

describe("Test of extendGameArea()", function () {

  it("Shouldn't extend game area", function () {
    let gameArea =
      [
        [[0, 0], true],
      ];
    extendGame(
      gameArea,
      [
        [0, 0],
      ]
    );
    expect(gameArea).toEqual(
      [
        [[0, 0], true],
      ]
    );
  });

  it("Should extend game area", function () {
    let gameArea =
      [
        [[0, 0], true],
      ];
    extendGame(
      gameArea,
      [
        [0, 1],
      ]
    );
    expect(gameArea).toEqual(
      [
        [[0, 0], true],
        [[0, 1], false],
      ]
    );
  });
});

describe("Test of getCellNeighborhood()", function () {

  it("Should return neighborhood", function () {
    expect(
      getNeighborhood([1, 1])
    ).toEqual(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ]
    );
  });

});

describe("Test of getSquareDistance()", function () {

  it("Should return 0", function () {
    expect(getSquareDistance([0, 0], [0, 0])).toEqual(0);
  });

  it("Should return 1", function () {
    expect(getSquareDistance([0, 0], [1, 0])).toEqual(1);
  });

  it("Should return 2", function () {
    expect(getSquareDistance([0, 0], [1, -1])).toEqual(2);
  });

  it("Should return 5", function () {
    expect(getSquareDistance([0, 0], [1, -2])).toEqual(5);
  });
});

describe("Test of countLiveNeighbors()", function () {

  it("Should return 0", function () {
    expect(countLiveNeighbors(
      [0, 0],
      [
        [[0, 0], true],
      ]
    )).toEqual(0);
  });

  it("Should return 0", function () {
    expect(countLiveNeighbors(
      [0, 0],
      [
        [[0, 1], false],
      ]
    )).toEqual(0);
  });

  it("Should return 1", function () {
    expect(countLiveNeighbors(
      [0, 0],
      [
        [[0, 1], true],
      ]
    )).toEqual(1);
  });

});

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

  it("Should die due to overpopulation", function () {
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

  it("Should reproduce", function () {
    expect(becomesAlive(3)).toEqual(true);
  });

  it("Should stay dead", function () {
    expect(becomesAlive(4)).toEqual(false);
  });

});

describe("Test basics of gameOfLife()", function () {

  it("Should stay dead", function () {
    const start = [0, 0];
    const end = [3, 3];
    const generation0 = [];
    let generation1 = gameOfLife(generation0);
    expect(generation1).toEqual(generation0);
  });

  it("Should die", function () {
    const start = [0, 0];
    const end = [3, 3];
    const generation0 =
      [
        [1, 1],
        [1, 2],
      ];
    let generation1 = gameOfLife(generation0);
    expect(generation1).toEqual([]);
  });

});

describe("Test Still lifes", function () {

  it("Block", function () {
    const log = false;
    const start = [0, 0];
    const end = [3, 3];
    const generation0 =
      [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
      ];
    let generation1 = gameOfLife(generation0);
    displayGame(generation0, start, end, log);
    expect(generation1).toEqual(generation0);
  });

  it("Bee-hive", function () {
    const log = false;
    const start = [0, 0];
    const end = [4, 5];
    const generation0 =
      [
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 4],
        [3, 2],
        [3, 3],
      ];
    let generation1 = gameOfLife(generation0);
    displayGame(generation0, start, end, log);
    expect(generation1).toEqual(generation0);
  });

  it("Loaf", function () {
    const log = false;
    const start = [0, 0];
    const end = [5, 5];
    const generation0 =
      [
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 4],
        [3, 2],
        [3, 4],
        [4, 3],
      ];
    let generation1 = gameOfLife(generation0);
    displayGame(generation0, start, end, log);
    expect(generation1).toEqual(generation0);
  });

  it("Boat", function () {
    const log = false;
    const start = [0, 0];
    const end = [4, 4];
    const generation0 =
      [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 3],
        [3, 2],
      ];
    let generation1 = gameOfLife(generation0);
    displayGame(generation0, start, end, log);
    expect(generation1).toEqual(generation0);
  });

  it("Tub", function () {
    const log = false;
    const start = [0, 0];
    const end = [4, 4];
    const generation0 =
      [
        [1, 2],
        [2, 1],
        [2, 3],
        [3, 2],
      ];
    let generation1 = gameOfLife(generation0);
    displayGame(generation0, start, end, log);
    expect(generation1).toEqual(generation0);
  });

});

describe("Test Oscillators", function () {

  it("Blinker", function () {
    const log = false;
    const start = [0, 0];
    const end = [4, 4];
    const generation0 =
      [
        [2, 1],
        [2, 2],
        [2, 3],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    expect(generation2.sort()).toEqual(generation0.sort());
  });

  it("Toad", function () {
    const log = false;
    const start = [0, 0];
    const end = [5, 5];
    const generation0 =
      [
        [2, 2],
        [2, 3],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 3],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    expect(generation2.sort()).toEqual(generation0.sort());
  });

  it("Beacon", function () {
    const log = false;
    const start = [0, 0];
    const end = [5, 5];
    const generation0 =
      [
        [1, 1],
        [1, 2],
        [2, 1],
        [3, 4],
        [4, 3],
        [4, 4],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    expect(generation2.sort()).toEqual(generation0.sort());
  });

  it("Pulsar", function () {
    const log = false;
    const start = [0, 0];
    const end = [16, 16];
    const generation0 =
      [
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 10],
        [2, 11],
        [2, 12],

        [4, 2],
        [4, 7],
        [4, 9],
        [4, 14],
        [5, 2],
        [5, 7],
        [5, 9],
        [5, 14],
        [6, 2],
        [6, 7],
        [6, 9],
        [6, 14],

        [7, 4],
        [7, 5],
        [7, 6],
        [7, 10],
        [7, 11],
        [7, 12],

        [9, 4],
        [9, 5],
        [9, 6],
        [9, 10],
        [9, 11],
        [9, 12],

        [10, 2],
        [10, 7],
        [10, 9],
        [10, 14],
        [11, 2],
        [11, 7],
        [11, 9],
        [11, 14],
        [12, 2],
        [12, 7],
        [12, 9],
        [12, 14],

        [14, 4],
        [14, 5],
        [14, 6],
        [14, 10],
        [14, 11],
        [14, 12],

      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    expect(generation3.sort()).toEqual(generation0.sort());
  });

  it("Penta-decathlon", function () {
    const log = false;
    const start = [0, 0];
    const end = [17, 10];
    const generation0 =
      [
        [3, 4],
        [3, 5],
        [3, 6],

        [4, 3],
        [4, 7],
        [5, 3],
        [5, 7],

        [6, 4],
        [6, 5],
        [6, 6],

        [11, 4],
        [11, 5],
        [11, 6],

        [12, 3],
        [12, 7],
        [13, 3],
        [13, 7],

        [14, 4],
        [14, 5],
        [14, 6],

      ];
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
    displayGame(generation0, start, end, log);
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
    expect(generation15.sort()).toEqual(generation0.sort());
  });

});

describe("Test Spaceships", function () {

  it("Glider", function () {
    const log = false;
    const start = [-1, -1];
    const end = [4, 4];
    const generation0 =
      [
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 1],
        [2, 2],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    expect(generation4.sort()).toEqual(shiftGame(generation0, [1, 1]).sort());
  });

  it("Light-weight spaceship", function () {
    const log = false;
    const start = [-1, 0];
    const end = [4, 7];
    const generation0 =
      [
        [0, 0],
        [0, 3],
        [1, 4],
        [2, 0],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    expect(generation4.sort()).toEqual(shiftGame(generation0, [0, 2]).sort());
  });

  it("Middle-weight spaceship", function () {
    const log = false;
    const start = [-1, 0];
    const end = [4, 7];
    const generation0 =
      [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [1, 0],
        [1, 5],
        [2, 5],
        [3, 0],
        [3, 4],
        [4, 2],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    expect(generation4.sort()).toEqual(shiftGame(generation0, [0, 2]).sort());
  });

  it("Heavy-weight spaceship", function () {
    const log = false;
    const start = [-1, 0];
    const end = [4, 7];
    const generation0 =
      [
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 5],
        [2, 6],
        [3, 0],
        [3, 6],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [4, 5],
        [4, 6],
      ];
    let generation1 = gameOfLife(generation0);
    let generation2 = gameOfLife(generation1);
    let generation3 = gameOfLife(generation2);
    let generation4 = gameOfLife(generation3);
    displayGame(generation0, start, end, log);
    displayGame(generation1, start, end, log);
    displayGame(generation2, start, end, log);
    displayGame(generation3, start, end, log);
    displayGame(generation4, start, end, log);
    expect(generation4.sort()).toEqual(shiftGame(generation0, [0, 2]).sort());
  });

});

function displayGame(game, start, end, log) {
  let dy = end[0] - start[0] + 1;
  let dx = end[1] - start[1] + 1;

  let board = new Array(dy).fill([]).map((cell) => {
    let line = new Array(dx);
    return line.fill(0);
  });

  let y, x;
  game.forEach((cell) => {
    y = cell[0] - start[0];
    x = cell[1] - start[1];
    if (x >= 0 && y >= 0 && x < dx && y < dy) board[y][x] = 1;
  });

  let string = "";
  board.forEach((line) => {
    string += "-";
    line.forEach((cell) => {
      if (cell == 0) string += "  ";
      else string += "* ";
    });
    string += "-\n";
  })

  if (log) console.log(string);
}

function shiftGame(game, shift) {
  return game.map((cell) => {
    return [cell[0] + shift[0], cell[1] + shift[1]];
  });
}
