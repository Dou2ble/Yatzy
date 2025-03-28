export default function diceGrid(value: number): boolean[][] {
  switch (value) {
    case 1:
      return [
        [false, false, false],
        [false, true, false],
        [false, false, false],
      ];
    case 2:
      return [
        [false, false, true],
        [false, false, false],
        [true, false, false],
      ];
    case 3:
      return [
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ];
    case 4:
      return [
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ];
    case 5:
      return [
        [true, false, true],
        [false, true, false],
        [true, false, true],
      ];
    case 6:
      return [
        [true, false, true],
        [true, false, true],
        [true, false, true],
      ];
    default:
      return [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ];
  }
}
