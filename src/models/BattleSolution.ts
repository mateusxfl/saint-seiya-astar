import Knight from './Knight';

class BattleSolution {
  public knights: Knight[];

  public knightsTotal: number;

  public time: number;

  public heuristic: number;

  constructor(knights: Knight[], time: number, powerByLife: number) {
    this.knights = knights;
    this.knightsTotal = this.knights.length || 0;
    this.time = time;
    this.heuristic = time / powerByLife;
  }
}

export default BattleSolution;
