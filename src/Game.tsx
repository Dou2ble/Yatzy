import Button from "./Button";
import CombinationTable from "./CombinationTable";
import type { DiceData } from "./Dice";
import Dice from "./Dice";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import _ from "lodash";
import logo from "./assets/logo.png";
import CheatMenu from "./CheatMenu";
import { Player } from "./player";
import Header from "./Header";

const DICE_COUNT = 5;
const ROLL_COUNT = 3;

export default function Game(props: {players: Player[], changePlayers: (players: Player[]) => void}) {
  const [dice, setDice] = useState(null as null | DiceData[]);
  const [rolls, setRolls] = useState(ROLL_COUNT);
  // const [players, setPlayers] = useState([newPlayer("Player 1"), newPlayer("Player 2")]);
	const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isCheatMenuOpen, setIsCheatMenuOpen] = useState(false);

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
          dice={dice}
          onChange={(newDice) => {
            setDice(newDice);
          }}
        />
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
	        <div className="flex justify-center items-center pb-1">
		        <div className="flex justify-center items-center gap-2 text-gray-500 transition-all text-xl">
							<span className="icon-[mdi--account-outline]"></span>
		  		    {props.players[currentPlayer].name}
		        </div>
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
            label="Roll"
            onClick={rollDice}
            disabled={rolls < 1}
            autofocus
          />
        </div>
      </main>
	  </>
  );
}
