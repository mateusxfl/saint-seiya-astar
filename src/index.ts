import fs from 'fs';

import defaultMap from './config/defaultMap';
import GridPoint from './models/GridPoint';
import House from './models/House';
import BattleSolution from './models/BattleSolution';
import Battle from './models/Battle';
import { KnightInfo } from './types';
import Squad from './squad';

const rows = defaultMap.length; // Total de linhas da grid.
const cols = defaultMap[0].length; // Total de colunas da grid.
const grid: GridPoint[][] = new Array(rows); // Definição da grid.
const openSet: GridPoint[] = []; // Array contendo pontos da grid não visitados.
const closedSet: GridPoint[] = []; // Array contendo pontos da grid já visitados.
let start: GridPoint; // Ponto de partida.
let end: GridPoint; // Ponto de destino.
const path: GridPoint[] = []; // Array com o caminho traçado.

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

const squad = new Squad(squadInfo);

const houses = [
  new House(37, 21, 50, 'Aries'),
  new House(31, 17, 55, 'Taurus'),
  new House(31, 33, 60, 'Gemini'),
  new House(24, 26, 70, 'Cancer'),
  new House(24, 9, 75, 'Leo'),
  new House(17, 9, 80, 'Virgo'),
  new House(17, 29, 85, 'Libra'),
  new House(13, 37, 90, 'Scorpius'),
  new House(9, 27, 95, 'Sagittarius'),
  new House(9, 14, 100, 'Capricornus'),
  new House(4, 13, 110, 'Aquarius'),
  new House(4, 30, 120, 'Pisces'),
];

const battlesSolutions: BattleSolution[] = [];

function getTimeAverage() {
  const AMOUNT_TO_DECREASE = 25;
  const housesDifficultyAverage =
    houses.reduce((acc, item) => acc + item.difficulty, 0) / 12;
  const knightsPowerAverage = squad.getPowerAverage();

  return housesDifficultyAverage / knightsPowerAverage - AMOUNT_TO_DECREASE;
}

// A heurística que usaremos será a distância de Manhattan.
function heuristic(position0: GridPoint, position1: GridPoint) {
  const d1 = Math.abs(position1.x - position0.x);
  const d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

// Inicializa todos os pontos da grid, fazendo o mapeamento completo para cada um.
function initializeGrid() {
  // Cria uma matriz, adicionando colunas.
  for (let i = 0; i < rows; i += 1) {
    grid[i] = new Array(cols);
  }

  // Faz o mapeamento da grid, adicionando um GridPoint para cada posição da matriz, passando também o tipo de terreno.
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      grid[i][j] = new GridPoint(i, j, defaultMap[i][j]);
    }
  }

  // Faz o mapeamento de vizinhos, para cada ponto.
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      grid[i][j].updateNeighbors(grid, cols, rows);
    }
  }

  // Define ponto inicial e final do percurso.
  // eslint-disable-next-line prefer-destructuring
  start = grid[37][37];
  // eslint-disable-next-line prefer-destructuring
  end = grid[4][37];

  // Adiciona o início do percurso no array de de pontos ainda não visitados.
  openSet.push(start);
}

// Busca o indíce do ponto de menor F(x) dentre os as possibilidades em aberto, ou seja, não visitadas.
function getIndexOfLowestFxInOpenSet() {
  let indexOfLowestFx = 0;
  for (let i = 0; i < openSet.length; i += 1) {
    if (openSet[i].f < openSet[indexOfLowestFx].f) {
      indexOfLowestFx = i;
    }
  }
  return indexOfLowestFx;
}

// Retorna o caminho final, caso a função objetivo tenha sido satisfeita.
function getFinalPath(currentPoint: GridPoint) {
  let temp = currentPoint;

  path.push(temp);

  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }

  return path.reverse();
}

// Marca o caminho achado grid, no mapWithTracedPath.txt.
function drawPath(finalPath: GridPoint[]) {
  for (let i = 0; i < finalPath.length; i += 1) {
    defaultMap[finalPath[i].x][finalPath[i].y] += 6;
  }

  let data = '[\n';
  for (let i = 0; i < rows; i += 1) {
    data += '\t[';
    for (let j = 0; j < cols; j += 1) {
      data += defaultMap[i][j];
      if (j + 1 !== cols) {
        data += ',';
      }
    }
    data += '],\n';
  }
  data += ']';

  fs.writeFile('./src/mapWithTracedPath.txt', data, err => {
    if (err) throw err;
  });
}

// Retorna um número aleatório em um intervalo.
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera uma grid com terrenos aleatórios, com base na grid default.
function generateRandomPath() {
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (defaultMap[i][j] === 1 || defaultMap[i][j] === 2) {
        defaultMap[i][j] = randomIntFromInterval(1, 2);
      }
    }
  }
}

// Implementação de busca A*, retornando o caminho achado no array path.
function search() {
  initializeGrid();

  // Cada iteração desse while é uma visita.
  while (openSet.length > 0) {
    const indexOfLowestFx = getIndexOfLowestFxInOpenSet();

    const currentPoint = openSet[indexOfLowestFx];

    // Função objetivo, verificando se o nó atende a condição de parada.
    if (currentPoint === end) {
      console.log(
        'Função objetivo satisfeita, o menor caminho foi encontrado!!!',
      );
      return getFinalPath(currentPoint);
    }

    const findHouse = houses.find(
      house =>
        house.position_x === currentPoint.x &&
        house.position_y === currentPoint.y,
    );

    if (findHouse) {
      const maxTimeByBattle = getTimeAverage();
      const availableKnights = squad.getAvailableKnightsToBattle();

      const battle = new Battle(availableKnights, findHouse, maxTimeByBattle);
      battle.searchBetterTeam();

      const solution = battle.getSolution();
      battle.printSolution();

      if (solution) {
        squad.updateKnightsAfterBattle(solution.knights);
        battlesSolutions.push(solution);
      }
    }

    // Remove ponto atual do openSet.
    openSet.splice(indexOfLowestFx, 1);

    // Adiciona ponto atual no closedSet.
    closedSet.push(currentPoint);

    // Captura vizinhos do ponto atual.
    const { neighbors } = currentPoint;

    // Irá iterar todos os vizinhos do ponto atual, mapeando informações do mesmo, e os inserindo no openSet para que possam ser visitados.
    for (let i = 0; i < neighbors.length; i += 1) {
      const neighbor = neighbors[i];

      // Entra no IF caso o array closedSet não tenha esse vizinho ainda (para evitar looping).
      if (!closedSet.includes(neighbor)) {
        // Define (ou redefine) um possível novo G para esse vizinho.
        const possibleNewG = currentPoint.g + neighbor.f + neighbor.cost;

        // Adiciona o vizinho no array openSet, caso ainda não tenha o mesmo.
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleNewG >= neighbor.g) {
          continue;
        }

        // Caso esse vizinho tenha sido adicionado agora em openSet, ou openSet já tenha esse vizinho, porém com custo maior, o mapearemos com os novos dados.
        neighbor.g = possibleNewG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h + neighbor.cost;
        neighbor.parent = currentPoint;
      }
    }
  }

  // Valor default, caso não tenha encontrado solução.
  return [];
}

generateRandomPath();

drawPath(search());

const totalBattleTime = battlesSolutions.reduce(
  (acc, item) => acc + item.time,
  0,
);

console.log(`Tempo total das batalhas: ${totalBattleTime / 60}`);
