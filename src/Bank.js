export class Bank {
    #total;
    
    constructor() {
        this.#total = 0;
    }

    getTotal() {
        return this.#total;
    }

    add(value) {
        this.#total += value;
    }

    subtract(value) {
        if (value > this.#total) {
            throw Error("subtracting value too large from bank");
        }

        this.#total -= value;
    }
}