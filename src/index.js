import { defaultMap } from './config/defaultMap.js';
import { houses } from './config/houses.js';
import { knights } from './config/knights.js';

import fs from 'fs';

let rows = defaultMap.length;      // Total de linhas da grid.
let cols = defaultMap[0].length;   // Total de colunas da grid.
let grid = new Array(rows);        // Definição da grid.
let openSet = [];                  // Array contendo pontos da grid não visitados.
let closedSet = [];                // Array contendo pontos da grid já visitados.
let start;                         // Ponto de partida.
let end;                           // Ponto de destino.
let path = [];                     // Array com o caminho traçado.

// Função para criar pontos da grid como objetos, contendo os dados do terreno.
function GridPoint(x, y, ground) {
  this.x = x;               // Coluna do ponto.
  this.y = y;               // Linha do ponto.
  this.f = 0;               // F(x) Função de custo.
  this.g = 0;               // G(x) Soma do custo dos caminhos até o ponto atual.
  this.h = 0;               // H(X) Custo estimado até o ponto final.
  this.cost = 0;            // Custo para atravessar no terreno.
  this.neighbors = [];      // Vizinhos do ponto atual.
  this.parent = undefined;  // Pai do do ponto atual.

  // Define um custo para atravessar esse terreno, com base no tipo do terreno.
  if (ground == 0) {
    this.cost = 200;
  } else if (ground == 1) {
    this.cost = 1;
  } else if (ground == 2) {
    this.cost = 5;
  }

  // Faz o mapeamento dos vizinhos, para este ponto.
  this.updateNeighbors = function() {
    let i = this.x;
    let j = this.y;

    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
};

// A heurística que usaremos será a distância de Manhattan.
function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

// Inicializa todos os pontos da grid, fazendo o mapeamento completo para cada um.
function initializeGrid() {
  // Cria uma matriz, adicionando colunas.
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  // Faz o mapeamento da grid, adicionando um GridPoint para cada posição da matriz, passando também o tipo de terreno.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new GridPoint(i, j, defaultMap[i][j]);
    }
  }

  // Faz o mapeamento de vizinhos, para cada ponto.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].updateNeighbors();
    }
  }

  // Define ponto inicial e final do percurso.
  start = grid[37][37];
  end = grid[4][37];

  // Adiciona o início do percurso no array de de pontos ainda não visitados. 
  openSet.push(start);
};

// Busca o indíce do ponto de menor F(x) dentre os as possibilidades em aberto, ou seja, não visitadas.
function getIndexOfLowestFxInOpenSet(){
  let indexOfLowestFx = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[indexOfLowestFx].f) {
      indexOfLowestFx = i;
    }
  }
  return indexOfLowestFx;
}

// Retorna o caminho final, caso a função objetivo tenha sido satisfeita.
function getFinalPath(currentPoint){
  let temp = currentPoint;

  path.push(temp);

  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }
  
  return path.reverse();
}

// Marca o caminho achado grid, no mapWithTracedPath.txt.
function drawPath(finalPath){
  for (let i = 0; i < finalPath.length; i++) {
    defaultMap[finalPath[i].x][finalPath[i].y] += 6;
  }
  
  let data = '[\n';
  for (let i = 0; i < rows; i++) {
    data += '\t['
    for (let j = 0; j < cols; j++) {
      data += defaultMap[i][j]
      if((j+1) != cols){
        data += ',';
      }
    }
    data += '],\n'
  }
  data += ']';
  
  fs.writeFile('./src/mapWithTracedPath.txt', data, (err) => {
    if (err) throw err;
  });
}

// Retorna um número aleatório em um intervalo.
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera uma grid com terrenos aleatórios, com base na grid default.
function generateRandomPath(){
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if(defaultMap[i][j] == 1 || defaultMap[i][j] == 2){
        defaultMap[i][j] = randomIntFromInterval(1,2);
      }
    }
  }
}

// Implementação de busca A*, retornando o caminho achado no array path.
function search() {
  initializeGrid();

  // Cada iteração desse while é uma visita.
  while (openSet.length > 0) {
    let indexOfLowestFx = getIndexOfLowestFxInOpenSet();

    let currentPoint = openSet[indexOfLowestFx];

    // Função objetivo, verificando se o nó atende a condição de parada.
    if (currentPoint === end) {
      console.log("Função objetivo satisfeita, o menor caminho foi encontrado!!!");
      return getFinalPath(currentPoint);
    }

    // Remove ponto atual do openSet.
    openSet.splice(indexOfLowestFx, 1);

    // Adiciona ponto atual no closedSet.
    closedSet.push(currentPoint);

    // Captura vizinhos do ponto atual.
    let neighbors = currentPoint.neighbors;

    // Irá iterar todos os vizinhos do ponto atual, mapeando informações do mesmo, e os inserindo no openSet para que possam ser visitados.
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      // Entra no IF caso o array closedSet não tenha esse vizinho ainda (para evitar looping).
      if (!closedSet.includes(neighbor)) {
        // Define (ou redefine) um possível novo G para esse vizinho.
        let possibleNewG = currentPoint.g + neighbor.f + neighbor.cost;
        
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
};

generateRandomPath();

drawPath(search());
