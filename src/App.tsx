// import { useState } from 'react'
import Button from "./Button"
import type { DiceData } from "./Dice";
import { FancyDice } from "./Dice";
import { useState } from "react";
import { combinations } from "./combinations";
import _ from "lodash"

interface Player {
	name: string,
	combinationScoreboard: {
		[key: string]: number
	}
}

function newPlayer(name: string): Player {
	return {
		name: name,
		combinationScoreboard: {
		}
	}
}

const DICE_COUNT = 5;
const ROLL_COUNT = 3;

export default function App() {
	const [dice, setDice] = useState(null as null | DiceData[])
	const [rolls, setRolls] = useState(ROLL_COUNT);
	const [player, setPlayer] = useState(newPlayer("Otto"));

	function randomDiceValue(): number {
		return Math.floor(Math.random() * 6 + 1)
	}

	function rollDice() {
		if (dice == null) {
			setDice(Array.from({ length: DICE_COUNT }).map(() => ({ value: randomDiceValue(), isLocked: false })))
		} else {
			const newDice = [...dice]
			newDice.forEach((dice, i) => {
				if (!dice.isLocked) {
					newDice[i].value = randomDiceValue();
				}
			})
			setDice(newDice)
		}

		setRolls(rolls - 1)
	}

	function toggleLock(i: number) {
		if (dice == null) {
			return
		}

		const newDice = [...dice];
		newDice[i].isLocked = !newDice[i].isLocked;
		setDice(newDice)
	}

	return (
		<div className="min-h-lvh bg-gray-900 flex lg:justify-center items-center flex-col gap-4">
			<div className="lg:absolute lg:top-16 text-gray-100 text-8xl pt-8 pb-4 font-bold">Yatzy</div>
			<div className="lg:absolute lg:left-20 pb-4 lg:pb-0">
				<div className="relative overflow-x-auto shadow-md rounded-lg">
					<table className="text-center text-gray-400">
						<thead className="uppercase text-lg bg-gray-700 text-gray-400">
							<th className="px-4">Combination</th>
							<th className="px-4">Score</th>
						</thead>
						<tbody>
							{combinations.map((combination) => (
								<tr
									className={`relative odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700 ${dice != null ? "hover:bg-gray-600 active:bg-gray-500" : ""} transition-all ${combination.name in player.combinationScoreboard ? "line-through decoration-2" : ""}`}
								>
									<td className="px-2 text-left">
										{combination.name}
									</td>
									<td className="px-2">
										{
											combination.name in player.combinationScoreboard ? player.combinationScoreboard[combination.name] : (dice != null ? combination.check(dice) : null)
										}
									</td>
									<button className="absolute top-0 left-0 h-full w-full z-10" onClick={() => {
										if (dice == null) {
											return
										}

										const newPlayer = _.cloneDeep(player)
										newPlayer.combinationScoreboard[combination.name] = combination.check(dice)
										setPlayer(newPlayer);
										setRolls(ROLL_COUNT);
										setDice(null);
									}}></button>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="flex gap-2 items-center min-h-16">
				{dice != null &&
					dice.map((dice, i) => (
						<button onClick={() => toggleLock(i)}><FancyDice value={dice.value} isLocked={dice.isLocked} /></button>
					)) ||
					<strong className="text-gray-200 text-2xl">Please roll the dice</strong>
				}
			</div>
			<Button label="Roll" onClick={rollDice} disabled={rolls < 1} autofocus />
		</div >
	)
}
