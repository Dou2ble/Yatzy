import { combinations } from "./combinations";
import type { Combination } from "./combinations";
import type { Player } from "./player";
import type { DiceData } from "./Dice";

function Row(props: {
  dice: DiceData[] | null;
  player: Player;
  combination: Combination;
  onSubmit: (combinationName: string, combinationScore: number) => void;
}) {
  return (
    <tr
      className={`relative odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700 transition-all ${props.dice != null ? "hover:bg-gray-600 hover:text-gray-200 active:bg-gray-500 active:text-gray-100" : ""}`}
    >
      <td
        className={`px-2 text-left ${props.combination.name in props.player.combinationScoreboard ? "line-through" : ""}`}
      >
        {props.combination.name}
      </td>
      <td className="px-2">
        {props.combination.name in props.player.combinationScoreboard
          ? props.player.combinationScoreboard[props.combination.name]
          : props.dice != null
            ? props.combination.check(props.dice)
            : null}
      </td>
      <button
        className={`absolute top-0 left-0 h-full w-full z-10 ${props.dice != null ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (props.dice == null) {
            return;
          }

          props.onSubmit(
            props.combination.name,
            props.combination.check(props.dice),
          );
        }}
      ></button>
    </tr>
  );
}

export default function CombinationBoard(props: {
  dice: DiceData[] | null;
  player: Player;
  onSubmit: (combinationName: string, combinationScore: number) => void;
}) {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="text-center text-gray-300">
        <thead>
          <tr className="uppercase text-lg bg-gray-700 text-gray-400">
            <th className="px-4">Combination</th>
            <th className="px-4">Score</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination) => (
            <Row
              key={combination.name}
              dice={props.dice}
              player={props.player}
              onSubmit={props.onSubmit}
              combination={combination}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
