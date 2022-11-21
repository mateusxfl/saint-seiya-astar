import House from './House';
import Knight from './Knight';

class BattleTeam {
  public knights: Knight[];

  public knightsTotal: number;

  public house: House;

  public time: number;

  public heuristic: number;

  constructor(
    knights: Knight[],
    house: House,
    time: number,
    powerByLife: number,
  ) {
    this.knights = knights;
    this.knightsTotal = this.knights.length || 0;
    this.time = time;
    this.heuristic = time / powerByLife;
    this.house = house;
  }

  public getTeamInfo() {
    return {
      house: this.house.title,
      knights: this.knights.map(item => item.name).join(', '),
      time: Number(this.time.toFixed(4)),
    };
  }
}

export default BattleTeam;
