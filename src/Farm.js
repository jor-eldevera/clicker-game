export class Farm {
    #name;
    #amountPerSecond;
    #numFarms;
    #nextFarmCost;
    #nextFarmCostMultiplier;

    constructor(name, amountPerSecond, nextFarmCost, nextFarmCostMultiplier) {
        this.#name = name;
        this.#amountPerSecond = amountPerSecond;
        this.#numFarms = 0;
        this.#nextFarmCost = nextFarmCost;
        this.#nextFarmCostMultiplier = nextFarmCostMultiplier;
    }

    buyFarm() {
        this.#numFarms++;
        this.#nextFarmCost = +(this.#nextFarmCost * this.#nextFarmCostMultiplier).toFixed(2);
    }

    getName() {
        return this.#name;
    }

    /**
     * 
     * @returns amount that one farm returns per second
     */
    getAmountPerSecond() {
        return this.#amountPerSecond;
    }

    getNumFarms() {
        return this.#numFarms;
    }

    getNextFarmCost() {
        return this.#nextFarmCost;
    }

    /**
     * 
     * @returns amount that all farms combined return per second
     */
    getTotalAmountPerSecond() {
        return this.#amountPerSecond * this.#numFarms;
    }

}