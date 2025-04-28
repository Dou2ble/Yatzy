import Button from "./Button";
import CombinationTable from "./CombinationTable";
import type { DiceData } from "./Dice";
import Dice from "./Dice";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import _ from "lodash";
import CheatMenu from "./CheatMenu";
import { Player, playerTotalScore } from "./player";
import Header from "./Header";
import { combinations } from "./combinations";

const DICE_COUNT = 5;
const ROLL_COUNT = 3;

export default function Game(props: {players: Player[], changePlayers: (players: Player[]) => void}) {
  const [dice, setDice] = useState(null as null | DiceData[]);
  const [rolls, setRolls] = useState(ROLL_COUNT);
  // const [players, setPlayers] = useState([newPlayer("Player 1"), newPlayer("Player 2")]);
	const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isCheatMenuOpen, setIsCheatMenuOpen] = useState(false);

  const isGameEnded = useMemo(() => {
		for (let i = 0; i < props.players.length; i++) {
			if (Object.keys(props.players[i].combinationScoreboard).length != combinations.length) {
				return false
			}
		}

		return true;
  }, [props.players])

  const winners: {names: string[], score: number} = useMemo(() => {
		let bestPlayers: string[] = [];
		let bestScore = -1;

		props.players.forEach((player) => {
			const score = playerTotalScore(player)

			if (score == bestScore) {
				bestPlayers.push(player.name)
			} else if (score > bestScore) {
				bestPlayers = [player.name]
				bestScore = score
			}
		})

		return {names: bestPlayers, score: bestScore}
  }, [props.players])

  function randomDiceValue(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  function rollDice() {
    if (dice == null) {
      setDice(
        Array.from({ length: DICE_COUNT }).map(() => ({
          value: randomDiceValue(),
          isLocked: false,
        })),
      );
    } else {
      const newDice = [...dice];
      newDice.forEach((dice, i) => {
        if (!dice.isLocked) {
          newDice[i].value = randomDiceValue();
        }
      });
      setDice(newDice);
    }

    setRolls(rolls - 1);
  }

  function toggleDiceLock(i: number) {
    if (dice == null) {
      return;
    }

    const newDice = [...dice];
    newDice[i].isLocked = !newDice[i].isLocked;
    setDice(newDice);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.repeat) {
      return;
    }

    // control + alt + c
    if (event.ctrlKey && event.altKey && event.key == "c") {
      setIsCheatMenuOpen((prevState) => !prevState);
      console.log("cheat menu toggled");
    }
  }

  function nextPlayer() {
	  if (currentPlayer >= props.players.length - 1) {
		  setCurrentPlayer(0)
	  } else {
			setCurrentPlayer(currentPlayer + 1);
	  }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
	  <>
      <Modal
        title="Cheat menu"
        onClose={() => {
          setIsCheatMenuOpen(false);
        }}
        isOpen={isCheatMenuOpen}
      >
        <CheatMenu
	        isGameEnded={isGameEnded}
	        players={props.players}
	        onPlayerChange={props.changePlayers}
          dice={dice}
          onDiceChange={(newDice) => {
            setDice(newDice);
          }}
        />
      </Modal>

      <Modal
      	title="Game Has Ended"
       	onClose={() => {
        location.reload()
        }}
        isOpen={isGameEnded}
      >
				<div>The {winners.names.length > 1 ? "winners are" : "winner is"} {winners.names.join(" and ")} with a score of {winners.score} points!</div>
      </Modal>

      <Header barWidth={`${(100 / 3) * rolls}%`} />

      <aside className="lg:absolute lg:left-20 lg:h-lvh lg:flex lg:flex-col lg:justify-center lg:items-center pb-8 pt-3 lg:pb-0 lg:pt-0">
        <CombinationTable
          dice={dice}
          player={props.players[currentPlayer]}
          onSubmit={(combinationName: string, combinationScore: number) => {
            const newPlayers = _.cloneDeep(props.players);
            newPlayers[currentPlayer].combinationScoreboard[combinationName] = combinationScore;

						props.changePlayers(newPlayers);
            setRolls(ROLL_COUNT);
            setDice(null);
						nextPlayer();
          }}
        />
      </aside>

      <main className="lg:flex-1 flex justify-center items-center">
        <div className="lg:pb-34 flex items-center justify-center flex-col gap-4">
	        <div key={currentPlayer} className="flex justify-center items-center pb-1 gap-2 text-gray-500 transition-all text-xl current-player-label">
						<span className="icon-[mdi--account-outline]"></span>
	  		    {props.players[currentPlayer].name}
	        </div>

          <div className="flex gap-2 items-center min-h-16 ">
            {(dice != null &&
              dice.map((dice, i) => (
                <button key={i} onClick={() => toggleDiceLock(i)}>
                  <Dice value={dice.value} isLocked={dice.isLocked} />
                </button>
              ))) || (
              <strong className="text-gray-200 text-2xl text-center">
                Please roll the dice
              </strong>
            )}
          </div>
          <Button
            onClick={rollDice}
            disabled={rolls < 1}
            autofocus
          >Roll</Button>
        </div>
      </main>
	  </>
  );
}
