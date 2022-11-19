import { KnightInfo } from 'types';
import Knight from './models/Knight';

class Squad {
  private knights: Knight[] = [];

  constructor(knightInfo: KnightInfo[]) {
    knightInfo.forEach(({ name, power, life = 5 }) => {
      this.knights.push(new Knight(name, power, life));
    });
  }

  public getKnights() {
    return this.knights;
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

  public getAvailableKnightsToBattle() {
    return this.knights.filter(knight => knight.isAvailableToBattle());
  }
}

export default Squad;
