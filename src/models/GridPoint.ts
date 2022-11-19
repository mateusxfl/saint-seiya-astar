/* eslint-disable no-use-before-define */
class GridPoint {
  public x: number;

  public y: number;

  public f: number;

  public g: number;

  public h: number;

  public cost: number;

  public neighbors: GridPoint[];

  public parent: GridPoint | undefined;

  constructor(x: number, y: number, ground: number) {
    this.x = x; // Coluna do ponto.
    this.y = y; // Linha do ponto.
    this.f = 0; // F(x) Função de custo.
    this.g = 0; // G(x) Soma do custo dos caminhos até o ponto atual.
    this.h = 0; // H(X) Custo estimado até o ponto final.
    this.cost = 0; // Custo para atravessar no terreno.
    this.neighbors = []; // Vizinhos do ponto atual.
    this.parent = undefined; // Pai do do ponto atual.

    // Define um custo para atravessar esse terreno, com base no tipo do terreno.
    if (ground == 0) {
      this.cost = 200;
    } else if (ground == 1) {
      this.cost = 1;
    } else if (ground == 2) {
      this.cost = 5;
    }
  }

  public updateNeighbors(grid: Array<any>, cols: number, rows: number) {
    const i = this.x;
    const j = this.y;

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
  }
}

export default GridPoint;
