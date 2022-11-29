import { KnightInfo } from './types';

import Battle from './models/Battle';
import House from './models/House';
import Sanctuary from './models/Sanctuary';
import Squad from './models/Squad';

class SaintBattles {
  private squad: Squad;

  private houses: House[];

  private sanctuary: Sanctuary;

  private battles: Battle[] = [];

  constructor(squadKnights: KnightInfo[], housesDifficulty: number[] = []) {
    this.squad = new Squad(squadKnights);
    this.sanctuary = new Sanctuary(housesDifficulty);

    this.houses = this.sanctuary.getHouses();
    this.populateBattles();
  }

  private populateBattles() {
    const houses = [...this.houses].sort((a, b) => b.difficulty - a.difficulty);

    this.battles = houses.map(house => new Battle(house));
  }

  public startBattles() {
    while (this.squad.hasAvailableKnights()) {
      this.battles.forEach(battle => {
        const mostPowerfulKnight = this.squad.getMostPowerfulKnight();

        if (mostPowerfulKnight) {
          battle.addKnight(mostPowerfulKnight);
          mostPowerfulKnight.decreaseLife();
        }
      });
    }
  }

  public getTime() {
    const totalBattleTime = this.battles.reduce(
      (acc, item) => acc + item.getTime(),
      0,
    );

    return totalBattleTime / 60;
  }

  public printTimeSpent() {
    console.log(`Total time of the battles: ${this.getTime()}`);
  }

  public printSolutions() {
    const solutions: any[] = [];

    this.battles.sort((a, b) => a.house.difficulty - b.house.difficulty);

    this.battles.forEach(battle => {
      if (battle.getKnightsTeam().length) {
        solutions.push(battle.getTeamInfo());
      } else {
        solutions.push({
          house: battle.house.title,
          knights: 'NO SOLUTION',
          time: 0,
        });
      }
    });

    console.table(solutions);
  }

  public execute() {
    this.startBattles();
    this.printSolutions();
    this.printTimeSpent();
  }
}

export default SaintBattles;
