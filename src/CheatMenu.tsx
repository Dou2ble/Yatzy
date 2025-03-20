import { DiceData } from "./Dice";

export default function CheatMenu(props: {
  dice: DiceData[] | null;
  onChange: (newDice: DiceData[]) => void;
}) {
  if (props.dice == null) {
    return <p>Please roll the dice to access the cheat menu</p>;
  }

  return (
    <div className="flex gap-4">
      {props.dice?.map((die, i) => (
        <div
          className="bg-gray-700 p-2 rounded-md flex flex-col items-center justify-center"
          key={i}
        >
          <div>die {i + 1}</div>
          <select
            className="border-gray-800 border-2 rounded-sm"
            onChange={(event) => {
              // impossible event, only here to please the typescript compiler
              if (props.dice == null) {
                return;
              }

              const newDice = [...props.dice];
              newDice[i].value = parseInt(event.target.value);
              props.onChange(newDice);
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <option
                className="bg-gray-700 text-gray-200 text-center"
                value={i + 1}
              >
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
