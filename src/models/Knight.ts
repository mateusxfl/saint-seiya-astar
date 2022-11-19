import { v4 as uuid } from 'uuid';
import { KnightName } from '../types';

class Knight {
  public readonly id?: string;

  public power: number;

  public name: KnightName;

  public image?: string;

  public life: number;

  constructor(name: KnightName, power: number, life = 5) {
    this.id = uuid();
    this.name = name;
    this.power = power;
    this.image = `${name}.png`;
    this.life = life;
  }

  public decreaseLife() {
    this.life -= 1;
  }

  public isAvailableToBattle(): boolean {
    return this.life > 0;
  }
}

export default Knight;
