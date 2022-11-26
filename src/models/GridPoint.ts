/* eslint-disable no-use-before-define */
class GridPoint {
  public row: number;

  public column: number;

  public f: number;

  public g: number;

  public h: number;

  public cost: number;

  public neighbors: GridPoint[];

  public parent: GridPoint | undefined;

  constructor(row: number, column: number, ground: number) {
    this.row = row; // Linha do ponto.
    this.column = column; // Coluna do ponto.
    this.f = 0; // F(x) Função de custo.
    this.g = 0; // G(x) Soma do custo dos caminhos até o ponto atual.
    this.h = 0; // H(X) Custo estimado até o ponto final.
    this.cost = 0; // Custo para atravessar no terreno.
    this.neighbors = []; // Vizinhos do ponto atual.
    this.parent = undefined; // Pai do do ponto atual.

    // Define um custo para atravessar esse terreno, com base no tipo do terreno.
    if (ground === 0) {
      this.cost = 200;
    } else if (ground === 1) {
      this.cost = 1;
    } else if (ground === 2) {
      this.cost = 5;
    }
  }

  public updateNeighbors(grid: Array<any>, rows: number, columns: number) {
    const { row, column } = this; // col i || line j

    // Vizinho de baixo.
    if (row < rows - 1) this.neighbors.push(grid[row + 1][column]);

    // Vizinho de cima.
    if (row > 0) this.neighbors.push(grid[row - 1][column]);

    // Vizinho da direita.
    if (column < columns - 1) this.neighbors.push(grid[row][column + 1]);

    // Vizinho da esquerda.
    if (column > 0) this.neighbors.push(grid[row][column - 1]);
  }
}

export default GridPoint;
