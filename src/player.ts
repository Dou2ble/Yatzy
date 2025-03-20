export interface Player {
  name: string;
  combinationScoreboard: {
    [key: string]: number;
  };
}

export function newPlayer(name: string): Player {
  return {
    name: name,
    combinationScoreboard: {},
  };
}
