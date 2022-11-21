/* eslint-disable prettier/prettier */
/*
 * 0  -> Terreno montanhoso, + 200 minutos.
 * 1  -> Terreno plano,      + 1 minuto.
 * 2  -> Terreno rochoso,    + 5 minutos.
 * 3  -> Casas do zodíaco.
 * 4  -> Casa do grande mestre (destino).
 * 5  -> Entrada do santuário (partida).
 * 6  -> Montanhoso, com caminho traçado.
 * 7  -> Plano, com caminho traçado.
 * 8  -> Rochoso, com caminho traçado.
 * 9  -> Casas do zodíaco, com caminho traçado.
 * 10 -> Casa do grande mestre, com caminho traçado.
 * 11 -> Entrada do santuário, com caminho traçado.
 */

const defaultMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,2,2,1,2,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,2,2,2,1,2,1,2,1,1,3,1,1,2,1,1,1,1,2,1,2,1,2,2,2,1,1,3,1,1,1,1,1,1,4,1,0,0,0],
  [0,0,0,1,1,1,1,1,2,1,2,1,1,0,1,1,2,1,2,2,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,2,1,2,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,0,0,0],
  [0,0,0,1,2,1,1,2,1,2,2,2,1,1,3,1,1,2,1,1,2,1,2,2,2,1,1,3,1,1,2,1,1,2,1,1,2,2,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,2,1,1,0,1,1,2,1,1,1,1,1,1,2,1,1,0,1,1,2,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,1,1,1,1,2,1,0,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,2,1,2,1,0,0,0],
  [0,0,0,1,1,1,1,2,1,3,1,2,2,1,1,2,1,1,2,1,2,2,1,1,2,1,2,2,1,3,1,1,2,1,1,2,1,2,1,0,0,0],
  [0,0,0,2,2,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,0,1,1,1,2,1,1,2,1,1,1,1,1,0,0,0],
  [0,0,0,1,2,2,1,2,1,3,1,1,2,2,1,2,2,2,1,2,2,2,1,2,2,1,3,1,2,1,2,2,1,2,1,2,1,1,1,0,0,0],
  [0,0,0,1,1,1,1,2,1,0,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,2,2,2,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,0,0,0],
  [0,0,0,1,1,1,1,2,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,1,1,2,2,2,1,1,1,2,1,0,1,2,1,2,1,0,0,0],
  [0,0,0,2,2,2,1,2,1,2,1,1,2,1,2,2,1,3,1,1,2,1,2,2,1,2,1,1,1,1,1,2,1,3,1,2,1,2,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,1,1,2,1,1,2,1,2,1,1,2,2,1,1,1,0,1,1,1,1,1,0,0,0],
  [0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,2,2,2,1,2,1,1,2,1,1,2,2,2,1,2,1,3,1,2,1,2,2,1,2,1,2,1,1,2,1,1,1,5,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,0,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

export default defaultMap;
