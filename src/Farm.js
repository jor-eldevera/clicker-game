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
        this.#nextFarmCost *= this.#nextFarmCostMultiplier;
    }

    getNextFarmCost() {
        return this.#nextFarmCost;
    }
}