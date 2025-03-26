import { combinations } from "./combinations";
import type { Combination } from "./combinations";
import { playerTotalScore, type Player } from "./player";
import type { DiceData } from "./Dice";
import { useMemo, useState } from "react";
import Button from "./Button";

function Row(props: {
  dice: DiceData[] | null;
  player: Player;
  combination: Combination;
  isSelected: boolean;
  // onSubmit: (combinationName: string, combinationScore: number) => void;
	onSelect: () => void;
}) {
  const isClickable = useMemo(() => {
    return !(
      props.dice == null ||
      props.combination.name in props.player.combinationScoreboard
    );
  }, [props.dice, props.combination.name, props.player]);

  return (
    <tr
      className={`relative border-b border-gray-700 transition-all ${props.isSelected ? "bg-primary text-gray-200" : "odd:bg-gray-850 even:bg-gray-900"} ${isClickable ? "hover:bg-primary hover:text-gray-200" : ""}`}
    >
      <th
        className={`px-2 text-left ${props.combination.name in props.player.combinationScoreboard ? "line-through decoration-2" : ""}`}
      >
        {props.combination.name}
      </th>
      <td className="px-2">
        {props.combination.name in props.player.combinationScoreboard
          ? props.player.combinationScoreboard[props.combination.name]
          : props.dice != null
            ? props.combination.check(props.dice)
            : null}
      </td>
      <button
        className={`absolute top-0 left-0 h-full w-full z-10 ${isClickable ? "cursor-pointer" : ""}`}
        onClick={() => {
          if (!isClickable) {
            return;
          }

					props.onSelect();
        }}
      ></button>
    </tr>
  );
}

export default function CombinationTable(props: {
  dice: DiceData[] | null;
  player: Player;
  onSubmit: (combinationName: string, combinationScore: number) => void;
}) {
	const [selectedRow, setSelectedRow] = useState<null | number>(null);

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="text-center text-gray-300">
        <thead>
          <tr className="uppercase text-lg bg-gray-700 text-gray-400">
            <th className="px-4">Combination</th>
            <th className="px-4">Score</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination, i) => (
            <Row
              key={combination.name}
              dice={props.dice}
              player={props.player}
              isSelected={i === selectedRow}
              onSelect={() => {setSelectedRow(i)}}
              combination={combination}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className={`bg-gray-700 text-gray-400 uppercase font-bold`}>
            <th className="px-2 text-left">Sum</th>
            <td className="px-2">{playerTotalScore(props.player)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="pt-2">
	      <Button className="w-full" disabled={selectedRow == null || props.dice == null} onClick={() => {
					if (selectedRow == null || props.dice == null) {
						return;
					}

		      const combination = combinations[selectedRow]
	      	props.onSubmit(combination.name, combination.check(props.dice))
					setSelectedRow(null);
	      }}><span className="icon-[mdi--check-bold]"></span></Button>
      </div>
    </div>
  );
}
