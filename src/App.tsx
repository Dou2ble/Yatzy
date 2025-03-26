import { useState, useRef } from "react";
import { newPlayer } from "./player";
import Game from "./Game";
import Button from "./Button";
import Footer from "./Footer";
import _ from "lodash";
import Header from "./Header";

function PlayerNameInput(props: {
	value: string;
	onChange: (value: string) => void;
	onDelete: () => void;
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="relative transition-all text-xl border-gray-500 border-2 rounded-md">
			<input
				type="text"
				value={props.value}
				ref={inputRef}
				className="text-center bg-transparent max-w-[88vw]"
				onChange={(event) => {
					props.onChange(event.target.value);
				}}
			/>
			<div className="absolute top-0 left-0 h-full flex justify-center items-center px-1.5" onClick={() => {inputRef.current?.focus()}}>
				<span className="icon-[mdi--account-edit]"></span>
			</div>
			<div className="absolute top-0 right-0 h-full flex justify-center items-center px-1.5" onClick={props.onDelete}>
				<span className="icon-[mdi--delete]"></span>
			</div>
		</div>
	);
}

export default function App() {
	const [players, setPlayers] = useState([newPlayer("Player 1")]);
	const [isGameStarted, setIsGameStarted] = useState(false);

	return (
		<div className="min-h-lvh h-full bg-gray-800 flex flex-col items-center overflow-x-hidden">
			{isGameStarted ? (
				<Game
					players={players}
					changePlayers={(newPlayers) => {
						setPlayers(newPlayers);
					}}
				/>
			) : (
				<>
					<Header barWidth="100%" />
					<div className="flex-1 flex justify-center items-center">
						<div className="flex flex-col items-center gap-4 pb-32">
							<div className="flex flex-col overflow-y-auto max-h-46 justify-center gap-1.5 items-center pb-1 text-gray-500">
								{players.map((player, i) => (
									<PlayerNameInput
										key={i}
										value={player.name}
										onChange={(value) => {
											const newPlayers = _.cloneDeep(players);
											newPlayers[i].name = value;
											setPlayers(newPlayers);
										}}
										onDelete={() => {
											const newPlayers = _.cloneDeep(players);
											newPlayers.splice(i, 1);
											setPlayers(newPlayers);
										}}
									/>
								))}
								<button
									className="flex justify-center items-center border-gray-500 border-2 rounded-md p-1 transition-all hover:text-gray-300 hover:border-gray-300"
									onClick={() => {
										setPlayers((previous) => [
											...previous,
											newPlayer(`Player ${previous.length + 1}`),
										]);
									}}
								>
									<span className="icon-[mdi--account-add]"></span>
								</button>
							</div>
							<strong className="flex justify-center items-center text-center text-gray-200 text-2xl min-h-16">
								Select players and start the game
							</strong>
							<Button
								label="Start"
								onClick={() => {
									setIsGameStarted(true);
								}}
							/>
						</div>
					</div>
				</>
			)}
			<Footer></Footer>
		</div>
	);
}
