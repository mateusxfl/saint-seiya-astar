import { KnightInfo } from '../types';

import SaintBattles from '../implementations/saintBattles';
import SearchPath from '../implementations/searchPath';
import { testPath } from './testPath';

export function getPathAndBattles(
  squadInfo: KnightInfo[],
  housesDiff: number[],
  isRandomMap: boolean,
) {
  const saintBattles = new SaintBattles(squadInfo, housesDiff);
  saintBattles.execute();

  const searchPath = new SearchPath(isRandomMap);
  searchPath.execute();

  return {
    battles: saintBattles.getBattles(),
    timeOfBattles: saintBattles.getTime(),
    path: testPath, // implementar uma função lá pra retornar o path sem precisar passar parametro
  };
}
