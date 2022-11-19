import House from './House';
import Knight from './Knight';
import BattleSolution from './BattleSolution';

import getCombinations from '../utils/combination';
import { isValid } from '../utils/battle';

class Battle {
  private solutions: BattleSolution[] = [];

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

  public searchBetterTeam() {
    const frontier: BattleSolution[] = [];

    const { powerByLife, time } = this.getTime(this.knights);

    const battleSolution = new BattleSolution(this.knights, time, powerByLife);
    frontier.push(battleSolution);

    while (frontier.length > 0) {
      const v = frontier.pop() || ({} as BattleSolution);

      if (v?.knightsTotal > 1) {
        const knightsCombination = getCombinations(
          v.knights,
          v.knightsTotal - 1,
        );

        for (const comb of knightsCombination) {
          const timeOfCombination = this.getTime(comb);
          const solution = isValid(
            comb,
            this.solutions,
            timeOfCombination,
            this.maxTime,
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

  public printSolution() {
    const solution = this.getSolution();

    if (solution?.knights) {
      console.table([
        {
          house: this.house.title,
          knights: solution.knights
            .map(item => `${item.name} - ${item.life}`)
            .join(', '),
          time: solution.time,
        },
      ]);
    } else {
      console.table([
        {
          house: this.house.title,
          knights: 'NO SOLUTION',
          time: '---',
        },
      ]);
    }
  }
}

export default Battle;
