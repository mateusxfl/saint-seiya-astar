export type KnightName = 'seiya' | 'shiryu' | 'hyoga' | 'shun' | 'ikki';

export interface KnightInfo {
  name: KnightName;
  power: number;
  life?: number;
}
