import type { DiceData } from "./Dice";

export interface Combination {
  name: string;
  check: (dice: DiceData[]) => number;
}

function upperSectionCheck(value: number): (dice: DiceData[]) => number {
  return (dice: DiceData[]) => {
    let result = 0;
    dice.forEach((die) => {
      if (die.value == value) {
        result++;
      }
    });

    return result * value;
  };
}

function diceContains(dice: DiceData[], value: number): boolean {
  for (let i = 0; i < dice.length; i++) {
    if (dice[i].value == value) {
      return true;
    }
  }

  return false;
}

export const combinations: Combination[] = [
  {
    name: "Ones",
    check: upperSectionCheck(1),
  },
  {
    name: "Twos",
    check: upperSectionCheck(2),
  },
  {
    name: "Threes",
    check: upperSectionCheck(3),
  },
  {
    name: "Fours",
    check: upperSectionCheck(4),
  },
  {
    name: "Fives",
    check: upperSectionCheck(5),
  },
  {
    name: "Sixes",
    check: upperSectionCheck(6),
  },
  {
    name: "One Pair",
    check: (dice: DiceData[]) => {
      for (let i = 6; i > 0; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances >= 2) {
          return i * 2;
        }
      }

      return 0;
    },
  },
  {
    name: "Two Pair",
    check: (dice: DiceData[]) => {
      let pair_count = 0;
      let result = 0;

      for (let i = 6; i > 0 && pair_count < 2; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances >= 2) {
          result += i * 2;
          pair_count++;
        }
      }

      if (pair_count == 2) {
        return result;
      }
      return 0;
    },
  },
  {
    name: "Three of a Kind",
    check: (dice: DiceData[]) => {
      for (let i = 6; i > 0; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances >= 3) {
          return i * 3;
        }
      }

      return 0;
    },
  },
  {
    name: "Four of a Kind",
    check: (dice: DiceData[]) => {
      for (let i = 6; i > 0; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances >= 4) {
          return i * 4;
        }
      }

      return 0;
    },
  },
  {
    name: "Full House",
    check: (dice: DiceData[]) => {
      let pair_count = 0;
      let result = 0;
      let containsThreeOfAKind = false;

      for (let i = 6; i > 0 && pair_count < 2; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances >= 2) {
          if (occurances == 3) {
            containsThreeOfAKind = true;
          }
          result += i * occurances;
          pair_count++;
        }
      }

      if (pair_count == 2 && containsThreeOfAKind) {
        return result;
      }
      return 0;
    },
  },
  {
    name: "Small Straight",
    check: (dice: DiceData[]) => {
      for (let i = 1; i < 6; i++) {
        if (!diceContains(dice, i)) {
          return 0;
        }
      }

      return 15;
    },
  },
  {
    name: "Large Straight",
    check: (dice: DiceData[]) => {
      for (let i = 2; i < 7; i++) {
        if (!diceContains(dice, i)) {
          return 0;
        }
      }

      return 20;
    },
  },
  {
    name: "Chance",
    check: (dice: DiceData[]) => {
      let sum = 0;

      dice.forEach((die) => {
        sum += die.value;
      });

      return sum;
    },
  },
  {
    name: "Yatzy",
    check: (dice: DiceData[]) => {
      for (let i = 6; i > 0; i--) {
        let occurances = 0;

        dice.forEach((die) => {
          if (die.value == i) {
            occurances++;
          }
        });

        if (occurances == 5) {
          return 50;
        }
      }

      return 0;
    },
  },
];
