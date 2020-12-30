import { gameOfLife } from ".";

describe("Test of gameOfLife()", function () {

  it("Should die due to underpopulation", function () {
    expect(gameOfLife(
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    )).toEqual(
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    );
  });

  it("Should survive", function () {
    expect(gameOfLife(
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    )).toEqual(
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    );
  });

  it("Example step #1", function () {
    expect(gameOfLife(
      [
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    )).toEqual(
      [
        [1, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
      ]
    );
  });

  it("Example step #2", function () {
    expect(gameOfLife(
      [
        [1, 0, 1, 0],
        [0, 0, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
      ]
    )).toEqual(
      [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
      ]
    );
  });

  it("Example step #3", function () {
    expect(gameOfLife(
      [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
      ]
    )).toEqual(
      [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 1],
        [0, 1, 1, 0],
      ]
    );
  });

});
