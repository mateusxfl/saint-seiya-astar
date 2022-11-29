import House from './House';
import Knight from './Knight';

class Battle {
  private knights: Knight[] = [];

  constructor(public house: House) {}

  public addKnight(knight: Knight) {
    this.knights.push(knight);
  }

  public getKnightsTeam() {
    return this.knights;
  }

  public getKnightsPower() {
    return this.knights.reduce((acc, item) => acc + item.power, 0);
  }

  public getTime() {
    const housesDifficulty = this.house.difficulty;
    const knightsPower = this.getKnightsPower();

    return housesDifficulty / knightsPower;
  }

  public getTeamInfo() {
    const time = this.getTime();

    return {
      house: this.house.title,
      difficulty: this.house.difficulty,
      knights: this.knights.map(item => item.name).join(', '),
      amountPower: Number(this.getKnightsPower().toFixed(1)),
      time: Number(time.toFixed(2)),
    };
  }
}

export default Battle;
