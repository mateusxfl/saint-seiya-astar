import { KnightInfo } from 'types';

import SaintBattles from './saintBattles';
import SearchPath from './models/SearchPath';

function execute(
  squadInfo: KnightInfo[],
  housesDiff: number[],
  isRandomMap: boolean,
) {
  const saintBattle = new SaintBattles(squadInfo, housesDiff);
  saintBattle.execute();

  const searchPath = new SearchPath(isRandomMap);
  searchPath.execute();
}

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

const housesDiff = [50, 55, 60, 70, 75, 80, 85, 90, 95, 100, 110, 120];

const isRandomMap = false;

execute(squadInfo, housesDiff, isRandomMap);
