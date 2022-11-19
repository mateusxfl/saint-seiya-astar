import House from './House';
import Knight from './Knight';
import BattleSolution from './BattleSolution';

import getCombinations from '../utils/combination';

class Battle {
  private solution: BattleSolution | null = null;

  constructor(public knights: Knight[], public house: House) {}

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
    const list: BattleSolution[] = [];
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
          const solutionOfCombination = new BattleSolution(
            comb,
            timeOfCombination.time,
            timeOfCombination.powerByLife,
          );

          const isVisited = list.find(
            item =>
              JSON.stringify(item.knights) ===
              JSON.stringify(solutionOfCombination.knights),
          );

          if (!isVisited && solutionOfCombination.time <= 39) {
            list.push(solutionOfCombination);
            frontier.push(solutionOfCombination);
          }
        }
      }
    }

    const orderedList = list.sort((a, b) => a.heuristic - b.heuristic);

    this.solution = orderedList[orderedList.length - 1];
  }

  public getSolution() {
    return this.solution?.knights ? this.solution : null;
  }

  public printSolution() {
    if (this.solution?.knights) {
      console.table([
        {
          house: this.house.title,
          knights: this.solution.knights.map(item => item.name).join(', '),
          time: this.solution.time,
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
