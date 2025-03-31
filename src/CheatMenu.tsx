import { DiceData } from "./Dice";
import { Player } from "./player";
import Button from "./Button";
import _ from "lodash";
import { combinations } from "./combinations";

export default function CheatMenu(props: {
	dice: DiceData[] | null;
	onDiceChange: (newDice: DiceData[]) => void;
	players: Player[];
	onPlayerChange: (players: Player[]) => void;
}) {
	return (
		<>
			{props.dice != null ? (
				<div className="flex gap-4">
					{props.dice?.map((die, i) => (
						<div
							className="bg-gray-700 p-2 rounded-md flex flex-col items-center justify-center"
							key={i}
						>
							<div>die {i + 1}</div>
							<select
								className="border-gray-800 border-2 rounded-sm"
								value={die.value}
								onChange={(event) => {
									// impossible event, only here to please the typescript compiler
									if (props.dice == null) {
										return;
									}

									const newDice = [...props.dice];
									newDice[i].value = parseInt(event.target.value);
									props.onDiceChange(newDice);
								}}
							>
								{Array.from([1, 2, 3, 4, 5, 6]).map((i) => (
									<option
										className="bg-gray-700 text-gray-200 text-center"
										value={i}
										key={i}
									>
										{i}
									</option>
								))}
							</select>
						</div>
					))}
				</div>
			) : null}

			<div className="flex justify-center items-center">
				<Button
					onClick={() => {
						const newPlayers = _.cloneDeep(props.players);

						for (let player = 0; player < newPlayers.length; player++) {
							for (
								let combination = 0;
								combination < combinations.length;
								combination++
							) {
								const combinationValue =
									newPlayers[player].combinationScoreboard[combinations[combination].name];
								if (combinationValue != undefined) {
									continue;
								}
								newPlayers[player].combinationScoreboard[combinations[combination].name] = 0;
							}
						}

						console.log(newPlayers);
						props.onPlayerChange(newPlayers);
					}}
				>
					End Game
				</Button>
			</div>
		</>
	);
}
