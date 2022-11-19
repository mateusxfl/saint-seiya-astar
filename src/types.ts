export type KnightName = 'seya' | 'shiryu' | 'hyoga' | 'shun' | 'ikki';

export interface KnightInfo {
  name: KnightName;
  power: number;
  life?: number;
}
