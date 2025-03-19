// import { useState } from 'react'
import Button from "./Button"
import type { DiceData } from "./Dice";
import { FancyDice } from "./Dice";
import { useEffect, useState } from "react";
import { combinations } from "./combinations";
import _ from "lodash"
import Modal from "./Modal";

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
	const [isCheatMenuOpen, setIsCheatMenuOpen] = useState(false);

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

	function toggleDiceLock(i: number) {
		if (dice == null) {
			return
		}

		const newDice = [...dice];
		newDice[i].isLocked = !newDice[i].isLocked;
		setDice(newDice)
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.repeat) {
			return
		}

		// control + alt + c
		if (event.ctrlKey && event.altKey && event.key == "c") {
			setIsCheatMenuOpen(prevState => !prevState);
			console.log("cheat menu toggled")
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown)

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);


	return (
		<div className="min-h-lvh h-full bg-gray-900 flex flex-col">
			{isCheatMenuOpen ?
				<Modal>
					<h1 className="text-xl pb-4">Cheats</h1>
					{dice == null ?
						<p>Please roll the dice to access the cheat menu</p> :
						<div className="flex gap-4">
							{dice?.map((die, i) => (
								<div>
									<div>
										die {i}
									</div>
									<input className="bg-gray-700 rounded-md p-2" type="number" value={die.value} max={6} min={1} onChange={(event) => {
										const newDice = [...dice]
										newDice[i].value = parseInt(event.target.value);
										setDice(newDice);
									}} />
								</div>
							))}
						</div>
					}
				</Modal> : null
			}

			<header className="text-center text-gray-100 text-8xl pt-8 pb-4 lg:pt-20 lg:pb-0 font-bold">Yatzy</header>
			<aside className="lg:absolute lg:left-20 lg:h-lvh lg:flex lg:justify-center lg:items-center py-8 lg:py-0">
				<div className="relative overflow-x-auto shadow-md rounded-lg">
					<table className="text-center text-gray-400">
						<thead>
							<tr className="uppercase text-lg bg-gray-700 text-gray-400">
								<th className="px-4">Combination</th>
								<th className="px-4">Score</th>
							</tr>
						</thead>
						<tbody>
							{combinations.map((combination, key) => (
								<tr
									className={`relative odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700 ${dice != null ? "hover:bg-gray-600 active:bg-gray-500" : ""} transition-all ${combination.name in player.combinationScoreboard ? "line-through decoration-2" : ""}`}
									key={key}
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
			</aside>
			<main className="lg:flex-1 flex justify-center items-center">
				<div className="lg:pb-34 flex items-center justify-center flex-col gap-4">
					<div className="flex gap-2 items-center min-h-16 ">
						{dice != null &&
							dice.map((dice, i) => (
								<button onClick={() => toggleDiceLock(i)}><FancyDice value={dice.value} isLocked={dice.isLocked} /></button>
							)) ||
							<strong className="text-gray-200 text-2xl text-center">Please roll the dice</strong>
						}
					</div>
					<Button label="Roll" onClick={rollDice} disabled={rolls < 1} autofocus />
				</div>
			</main >
		</div>
	)
}
