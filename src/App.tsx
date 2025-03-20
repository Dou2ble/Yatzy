// import { useState } from 'react'
import Button from "./Button";
import CombinationBoard from "./CombinationBoard";
import type { DiceData } from "./Dice";
import Dice from "./Dice";
import { useEffect, useState } from "react";
import { newPlayer } from "./player";
import Modal from "./Modal";
import _ from "lodash";
import logo from "./assets/logo.png";
import Footer from "./Footer";

const DICE_COUNT = 5;
const ROLL_COUNT = 3;

export default function App() {
  const [dice, setDice] = useState(null as null | DiceData[]);
  const [rolls, setRolls] = useState(ROLL_COUNT);
  const [player, setPlayer] = useState(newPlayer("Otto"));
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-lvh h-full bg-background flex flex-col items-center">
      <Modal
        title="Cheat menu"
        onClose={() => {
          setIsCheatMenuOpen(false);
        }}
        isOpen={isCheatMenuOpen}
      >
        {dice == null ? (
          <p>Please roll the dice to access the cheat menu</p>
        ) : (
          <div className="flex gap-4">
            {dice?.map((die, i) => (
              <div className="bg-gray-700 p-2 rounded-md flex flex-col items-center justify-center">
                <div>die {i + 1}</div>
                <input
                  className="bg-gray-700 rounded-md p-2"
                  type="number"
                  value={die.value}
                  max={6}
                  min={1}
                  onChange={(event) => {
                    const newDice = [...dice];
                    newDice[i].value = parseInt(event.target.value);
                    setDice(newDice);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Modal>

      <header className="flex justify-center items-center gap-4 text-gray-100 text-8xl pt-8 pb-4 lg:pt-20 lg:pb-0 font-bold">
        <img src={logo} alt="logo" className="h-[1em] p-2" /> Yatzy
      </header>

      <aside className="lg:absolute lg:left-20 lg:h-lvh lg:flex lg:justify-center lg:items-center py-8 lg:py-0">
        <CombinationBoard
          dice={dice}
          player={player}
          onSubmit={(combinationName: string, combinationScore: number) => {
            const newPlayer = _.cloneDeep(player);
            newPlayer.combinationScoreboard[combinationName] = combinationScore;
            setPlayer(newPlayer);

            setPlayer(newPlayer);
            setRolls(ROLL_COUNT);
            setDice(null);
          }}
        />
      </aside>

      <main className="lg:flex-1 flex justify-center items-center">
        <div className="lg:pb-34 flex items-center justify-center flex-col gap-4">
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
      <Footer />
    </div>
  );
}
