import type { DiceData } from "./Dice";

export interface Combination {
	name: string
	check: (dice: DiceData[]) => number
}

function upperSectionCheck(value: number): (dice: DiceData[]) => number {
	return (dice: DiceData[]) => {
		let result = 0;
		dice.forEach((die) => {
			if (die.value == value) {
				result++;
			}
		})

		return result * value;
	};
}

export const combinations: Combination[] = [
	{
		name: "Ones",
		check: upperSectionCheck(1)
	},
	{
		name: "Twos",
		check: upperSectionCheck(2)
	},
	{
		name: "Threes",
		check: upperSectionCheck(3)
	},
	{
		name: "Fours",
		check: upperSectionCheck(4)
	},
	{
		name: "Fives",
		check: upperSectionCheck(5)
	},
	{
		name: "Sixes",
		check: upperSectionCheck(6)
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
				})

				if (occurances >= 2) {
					return i * 2;
				}
			}

			return 0;
		}
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
				})

				if (occurances >= 2) {
					result += i * 2;
					pair_count++;
				}
			}

			return result;
		}
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
				})

				if (occurances >= 3) {
					return i * 3;
				}
			}

			return 0;
		}
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
				})

				if (occurances >= 4) {
					return i * 4;
				}
			}

			return 0;
		}
	},
	{
		name: "Small Straight",
		check: (dice: DiceData[]) => {
			for (let i = 1; i < 5; i++) {
				let foundI = false;

				dice.forEach((die) => {
					if (die.value == i) {
						foundI = true;
					}
				})

				if (!foundI) {
					return 0;
				}
			}

			return 15
		}
	},
	{
		name: "Large Straight",
		check: (dice: DiceData[]) => {
			for (let i = 1; i < 5; i++) {
				let foundI = false;

				dice.forEach((die) => {
					if (die.value == i) {
						foundI = true;
					}
				})

				if (!foundI) {
					return 0;
				}
			}

			return 20
		}
	},
	{
		name: "Chance",
		check: (dice: DiceData[]) => {
			let sum = 0;

			dice.forEach((die) => {
				sum += die.value
			})

			return sum;
		}
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
				})

				if (occurances == 5) {
					return 50;
				}
			}

			return 0;
		}
	},
]
