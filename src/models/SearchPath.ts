import defaultMap from '../config/defaultMap';
import GridPoint from './GridPoint';

class SearchPath {
  private rows: number; // Total de linhas da grid.

  private cols: number; // Total de colunas da grid.

  private grid: GridPoint[][]; // Definição da grid.

  private openSet: GridPoint[] = []; // Array contendo pontos da grid não visitados.

  private closedSet: GridPoint[] = []; // Array contendo pontos da grid já visitados.

  private start: GridPoint; // Ponto de partida.

  private end: GridPoint; // Ponto de destino.

  private path: GridPoint[] = []; // Array com o caminho traçado.

  constructor(isRandomMap: boolean) {
    this.rows = defaultMap.length;
    this.cols = defaultMap[0].length;
    this.grid = new Array(this.rows);

    if (isRandomMap) this.generateRandomPath();

    this.initializeGrid();

    // Define ponto inicial e final do percurso.
    // eslint-disable-next-line prefer-destructuring
    this.start = this.grid[37][37];

    // eslint-disable-next-line prefer-destructuring
    this.end = this.grid[4][37];

    // Adiciona o início do percurso no array de de pontos ainda não visitados.
    this.openSet.push(this.start);
  }

  // A heurística que usaremos será a distância de Manhattan (Distância em linha "reta" entre dois pontos).
  public heuristic(start: GridPoint, end: GridPoint) {
    const d1 = Math.abs(end.row - start.row);
    const d2 = Math.abs(end.column - start.column);

    return d1 + d2;
  }

  // Inicializa todos os pontos da grid, fazendo o mapeamento completo para cada um.
  public initializeGrid() {
    // Cria uma matriz, adicionando colunas.
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.cols);
    }

    // Faz o mapeamento da grid, adicionando um GridPoint para cada posição da matriz, passando também o tipo de terreno.
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        this.grid[i][j] = new GridPoint(i, j, defaultMap[i][j]);
      }
    }

    // Faz o mapeamento de vizinhos, para cada ponto.
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        this.grid[i][j].updateNeighbors(this.grid, this.cols, this.rows);
      }
    }
  }

  // Busca o indíce do ponto de menor F(x) dentre os as possibilidades em aberto, ou seja, não visitadas.
  public getIndexOfLowestFxInOpenSet() {
    let indexOfLowestFx = 0;
    for (let i = 0; i < this.openSet.length; i += 1) {
      if (this.openSet[i].f < this.openSet[indexOfLowestFx].f) {
        indexOfLowestFx = i;
      }
    }
    return indexOfLowestFx;
  }

  // Retorna o caminho traçado, caso a função objetivo tenha sido satisfeita.
  public getTracedPath(currentPoint: GridPoint) {
    let temp = currentPoint;

    this.path.push(temp);

    while (temp.parent) {
      this.path.push(temp.parent);
      temp = temp.parent;
    }

    return this.path.reverse();
  }

  // Imprime a matriz (mapa) com o caminho encontrado.
  public drawPath(finalPath: GridPoint[]) {
    for (let i = 0; i < finalPath.length; i += 1) {
      defaultMap[finalPath[i].row][finalPath[i].column] += 6;
    }

    let data = '[\n';
    for (let i = 0; i < this.rows; i += 1) {
      data += '\t[';
      for (let j = 0; j < this.cols; j += 1) {
        data += j + 1 !== this.cols ? `${defaultMap[i][j]},` : defaultMap[i][j];
      }
      data += '],\n';
    }
    data += ']';

    console.log(data); // Mapa com caminho.
  }

  // Retorna um número aleatório em um intervalo.
  public randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Gera uma grid com terrenos aleatórios, com base na grid default.
  public generateRandomPath() {
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        if (defaultMap[i][j] === 1 || defaultMap[i][j] === 2) {
          defaultMap[i][j] = this.randomIntFromInterval(1, 2);
        }
      }
    }
  }

  // Implementação de busca A*, retornando o caminho achado no array path.
  public search() {
    // Cada iteração desse while é uma visita.
    while (this.openSet.length > 0) {
      const indexOfLowestFx = this.getIndexOfLowestFxInOpenSet();

      const currentPoint = this.openSet[indexOfLowestFx];

      // Função objetivo, verificando se o nó atende a condição de parada.
      if (currentPoint === this.end) {
        return this.getTracedPath(currentPoint);
      }

      // Remove ponto atual do openSet.
      this.openSet.splice(indexOfLowestFx, 1);

      // Adiciona ponto atual no closedSet.
      this.closedSet.push(currentPoint);

      // Captura vizinhos do ponto atual.
      const { neighbors } = currentPoint;

      // Irá iterar todos os vizinhos do ponto atual, mapeando informações do mesmo, e os inserindo no openSet para que possam ser visitados.
      for (let i = 0; i < neighbors.length; i += 1) {
        const neighbor = neighbors[i];

        // Entra no IF caso o array closedSet não tenha esse vizinho ainda (para evitar looping).
        if (!this.closedSet.includes(neighbor)) {
          // Define (ou redefine) um possível novo G para esse vizinho.
          const possibleNewG = currentPoint.g + neighbor.f + neighbor.cost;

          // Adiciona o vizinho no array openSet, caso ainda não tenha o mesmo.
          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor);
          } else if (possibleNewG >= neighbor.g) {
            // eslint-disable-next-line no-continue
            continue;
          }

          // Caso esse vizinho tenha sido adicionado agora em openSet, ou openSet já tenha esse vizinho, porém com custo maior, o mapearemos com os novos dados.
          neighbor.g = possibleNewG;
          neighbor.h = this.heuristic(neighbor, this.end);
          neighbor.f = neighbor.g + neighbor.h + neighbor.cost;
          neighbor.parent = currentPoint;
        }
      }
    }

    // Valor default, caso não tenha encontrado solução.
    return [];
  }

  public printSolutions(tracedPath: GridPoint[]) {
    const solutions: any[] = [];

    tracedPath.forEach((point, i) => {
      solutions.push({
        row: point.row,
        column: point.column,
        f: point.f,
        g: point.g,
        h: point.h,
        cost: point.cost,
        time: this.minuteToHours(point.g),
      });
    });

    console.table(solutions);
  }

  public minuteToHours(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }

  public execute() {
    const tracedPath = this.search();

    this.printSolutions(tracedPath);
    this.drawPath(tracedPath);
  }
}

export default SearchPath;
