
import Heap from 'heap-js';

import { getCombinations } from "../utils/math";
import House from "./House";
import Knight from "./Knight";

class Vertice {
    public knights: Knight[];
    public knightsTotal: number;
    public time: number;
    public heuristic: number;

    constructor(knights: Knight[], time: number, powerByLife: number) {
        this.knights = knights;
        this.knightsTotal = this.knights.length || 0;
        this.time = time;
        this.heuristic = time / powerByLife; 
    }
}

class Battle {
    constructor(
        public knights: Knight[],
        public house: House 
    ){}

    public getTime(knights: Knight[]) {
        let powerAmount = 0;
        let powerByLife = 0;

        knights.forEach((knight) => {
            powerAmount += knight.power;

            if (knight.life < 5) {
                powerByLife += knight.power * (5 - knight.life +2)
            } else {
                powerByLife += knight.power;
            }
        });

        return {
            time: this.house.difficulty / powerAmount,
            powerByLife
        };
    }

    public search() {
        const list = [];

        const frontier: Vertice[] = [];
        const { powerByLife, time } = this.getTime(this.knights);

        const vertice = new Vertice(this.knights, time, powerByLife);
        frontier.push(vertice);

        while (frontier.length > 0) {
            const v = frontier.pop() || {} as Vertice;

            if (v?.knightsTotal > 1) {
                const knightsCombination = getCombinations(v.knights, v.knightsTotal - 1);

                for (const comb of knightsCombination) {
                    const timeOfCombination = this.getTime(comb);
                    const verticeOfCombination = new Vertice(comb, timeOfCombination.time, timeOfCombination.powerByLife);

                    list.push(verticeOfCombination);
                    frontier.push(verticeOfCombination);
                }
            }
        }

        const orderedList = list.sort((a, b) => a.heuristic - b.heuristic);
        
        console.log(orderedList);
        
        return orderedList[0];
    }
}

export default Battle;