export interface DiceData {
  value: number;
  isLocked: boolean;
}

function diceGrid(value: number): boolean[][] {
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

export default function Dice(props: DiceData) {
  return (
    <div
      className={`border-4 size-16 rounded-xl flex justify-center items-center transition-all hover:scale-115 ${props.isLocked ? "border-primary" : "border-gray-200"}`}
      title={`Value: ${props.value} ${props.isLocked ? "(locked)" : ""}`}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        {diceGrid(props.value).map((row, i) =>
          row.map((dot, j) => (
            <div
              className={`size-2.5 transition-all ${dot ? `rounded-full ${props.isLocked ? "bg-primary" : "bg-gray-200"}` : ""}`}
              key={`${i}-${j}`}
            >
              {dot}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

Dice.defaultProps = {
  isLocked: false,
};
