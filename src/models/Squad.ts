import { KnightInfo } from '../types';
import Knight from './Knight';

class Squad {
  private knights: Knight[] = [];

  constructor(squadKnights: KnightInfo[]) {
    squadKnights.forEach(({ name, power, life = 5 }) => {
      this.knights.push(new Knight(name, power, life));
    });
  }

  public updateKnightsAfterBattle(choosedKnights: Knight[]) {
    const knightsIds = choosedKnights.map(item => item.id);

    this.knights = this.knights.map(item => {
      if (knightsIds.includes(item.id)) {
        item.decreaseLife();
      }

      return item;
    });
  }

  public getKnights() {
    return this.knights;
  }

  public getPowerAverage() {
    const powerTotal = this.knights.reduce((acc, item) => acc + item.power, 0);

    return powerTotal / 5;
  }

  public getAvailableKnightsToBattle() {
    return this.knights.filter(knight => knight.isAvailableToBattle());
  }
}

export default Squad;
