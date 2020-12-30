import { gameOfLife, livesOrDies } from ".";

describe("Test of livesOrDies()", function () {

  it("Should die due to underpopulation (0)", function () {
    expect(livesOrDies(1, 0)).toEqual(0);
  });

  it("Should die due to underpopulation (1)", function () {
    expect(livesOrDies(1, 1)).toEqual(0);
  });

  it("Should survive (2)", function () {
    expect(livesOrDies(1, 2)).toEqual(1);
  });

  it("Should survive (3)", function () {
    expect(livesOrDies(1, 3)).toEqual(1);
  });

  it("Should die due to overpopulation", function () {
    expect(livesOrDies(1, 4)).toEqual(0);
  });

  it("Should stay dead (0)", function () {
    expect(livesOrDies(0, 0)).toEqual(0);
  });

  it("Should stay dead (1)", function () {
    expect(livesOrDies(0, 1)).toEqual(0);
  });

  it("Should stay dead (2)", function () {
    expect(livesOrDies(0, 2)).toEqual(0);
  });

  it("Should reproduce", function () {
    expect(livesOrDies(0, 3)).toEqual(1);
  });

  it("Should stay dead", function () {
    expect(livesOrDies(0, 4)).toEqual(0);
  });

});

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
