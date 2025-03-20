export interface Player {
  name: string;
  combinationScoreboard: {
    [key: string]: number;
  };
}

export function playerTotalScore(player: Player): number {
  let result = 0;

  Object.values(player.combinationScoreboard).forEach((score) => {
    result += score;
  });

  return result;
}

export function newPlayer(name: string): Player {
  return {
    name: name,
    combinationScoreboard: {},
  };
}
