import Knight from '../models/Knight';
import BattleSolution from '../models/BattleSolution';

export function isValid(
  comb: Knight[],
  list: BattleSolution[],
  timeOfCombination: { time: number; powerByLife: number },
  maxTime: number,
) {
  if (timeOfCombination.time > maxTime) return false;

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

  if (isVisited) return false;

  return solutionOfCombination;
}
