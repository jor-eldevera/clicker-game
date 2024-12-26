export class Bank {
    #total;
    
    constructor() {
        this.#total = 0;
    }

    getTotal() {
        return this.#total;
    }

    add(value) {
        this.#total = +(this.#total + value).toFixed(2);
    }

    subtract(value) {
        if (value > this.#total) {
            throw Error("subtracting value too large from bank");
        }

        this.#total = +(this.#total - value).toFixed(2);
    }
}