import { KnightInfo } from 'types';

import Battle from './models/Battle';
import BattleTeam from './models/BattleTeam';
import House from './models/House';
import Sanctuary from './models/Sanctuary';
import Squad from './models/Squad';

// TODO: remover isso aqui depois
const squadInfo: KnightInfo[] = [
  {
    name: 'seya',
    power: 1.5,
  },
  {
    name: 'shiryu',
    power: 1.4,
  },
  {
    name: 'hyoga',
    power: 1.3,
  },
  {
    name: 'shun',
    power: 1.2,
  },
  {
    name: 'ikki',
    power: 1.1,
  },
];

// TODO: remover isso aqui depois
const housesDiff = [50, 55, 60, 70, 75, 80, 85, 90, 95, 100, 110, 120];

class SaintBattles {
  private squad: Squad;

  private houses: House[];

  private sanctuary: Sanctuary;

  private battles: BattleTeam[] = [];

  constructor(squadKnights: KnightInfo[], housesDifficulty: number[] = []) {
    this.squad = new Squad(squadKnights);
    this.sanctuary = new Sanctuary(housesDifficulty);

    this.houses = this.sanctuary.getHouses();
  }

  private getTimeAverage() {
    const AMOUNT_TO_DECREASE = 25;
    const housesDifficultyAverage =
      this.houses.reduce((acc, item) => acc + item.difficulty, 0) / 12;
    const knightsPowerAverage = this.squad.getPowerAverage();

    return housesDifficultyAverage / knightsPowerAverage - AMOUNT_TO_DECREASE;
  }

  public startBattles() {
    this.houses.forEach(house => {
      const maxTimeByBattle = this.getTimeAverage();
      const availableKnights = this.squad.getAvailableKnightsToBattle();

      const battle = new Battle(availableKnights, house, maxTimeByBattle);
      battle.searchBetterTeam();

      const solution = battle.getSolution();

      if (solution) {
        this.squad.updateKnightsAfterBattle(solution.knights);
        this.battles.push(solution);
      }
    });
  }

  public getTime() {
    const totalBattleTime = this.battles.reduce(
      (acc, item) => acc + item.time,
      0,
    );

    return totalBattleTime / 60;
  }

  public printTimeSpent() {
    console.log(`Total time of the battles: ${this.getTime()}`);
  }

  public printSolutions() {
    const solutions: any[] = [];

    this.houses.forEach((house, i) => {
      const battleForHouse = this.battles[i];
      if (battleForHouse) {
        solutions.push(battleForHouse.getTeamInfo());
      } else {
        solutions.push({
          house: house.title,
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

const saintBattle = new SaintBattles(squadInfo, housesDiff);
saintBattle.execute();
