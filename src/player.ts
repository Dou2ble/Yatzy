export interface Player {
  name: string;
  combinationScoreboard: {
    [key: string]: number;
  };
}

export function playerBonusScore(player: Player): number {
  let higherSectionResult = 0;

  Object.entries(player.combinationScoreboard).forEach(([name, score]) => {
  	if (["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes"].includes(name)) {
		  console.log(name)
   	  higherSectionResult += score;
	  }
  });

  // source: https://en.wikipedia.org/wiki/Yatzy
  if (higherSectionResult >= 36) {
		return 50;
  } else {
		return 0;
  }
}

export function playerTotalScore(player: Player): number {
  let result = 0;

  Object.values(player.combinationScoreboard).forEach((score) => {
    result += score;
  });

  result += playerBonusScore(player)

  return result;
}

export function newPlayer(name: string): Player {
  return {
    name: name,
    combinationScoreboard: {},
  };
}
