import House from './House';
import Knight from './Knight';
import BattleTeam from './BattleTeam';

import getCombinations from '../utils/combination';

class Battle {
  private solutions: BattleTeam[] = [];

  constructor(
    public knights: Knight[],
    public house: House,
    private maxTime: number,
  ) {}

  public getTime(knights: Knight[]) {
    let powerAmount = 0;
    let powerByLife = 0;

    knights.forEach(knight => {
      powerAmount += knight.power;

      if (knight.life < 5) {
        powerByLife += knight.power * (5 - knight.life + 2);
      } else {
        powerByLife += knight.power;
      }
    });

    return {
      time: this.house.difficulty / powerAmount,
      powerByLife,
    };
  }

  public isValidBattleTeam(
    comb: Knight[],
    list: BattleTeam[],
    timeOfCombination: { time: number; powerByLife: number },
  ) {
    if (timeOfCombination.time > this.maxTime) return false;

    const solutionOfCombination = new BattleTeam(
      comb,
      this.house,
      timeOfCombination.time,
      timeOfCombination.powerByLife,
    );

    const isVisited = list.find(
      item =>
        JSON.stringify(item.knights) ===
        JSON.stringify(solutionOfCombination.knights),
    );

    if (isVisited) return false;

    return solutionOfCombination;
  }

  public searchBetterTeam() {
    const frontier: BattleTeam[] = [];

    const { powerByLife, time } = this.getTime(this.knights);

    const battleSolution = new BattleTeam(
      this.knights,
      this.house,
      time,
      powerByLife,
    );
    frontier.push(battleSolution);

    while (frontier.length > 0) {
      const v = frontier.pop() || ({} as BattleTeam);

      if (v?.knightsTotal > 1) {
        const knightsCombination = getCombinations(
          v.knights,
          v.knightsTotal - 1,
        );

        for (const comb of knightsCombination) {
          const timeOfCombination = this.getTime(comb);
          const solution = this.isValidBattleTeam(
            comb,
            this.solutions,
            timeOfCombination,
          );

          if (solution) {
            this.solutions.push(solution);
            frontier.push(solution);
          }
        }
      }
    }
  }

  public getSolution() {
    const orderedSolutions = [...this.solutions].sort(
      (a, b) => a.heuristic - b.heuristic,
    );

    return orderedSolutions.pop();
  }
}

export default Battle;
