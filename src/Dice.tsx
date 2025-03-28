import diceGrid from "./diceGrid";

export interface DiceData {
  value: number;
  isLocked: boolean;
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
