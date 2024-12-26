export class Button {
    #currentValue; // current value the button pays out per click
    #indexIntoAllValues; // index into the allValues array
    #allValues = [1, 2, 5, 10]; // possible values the button can have
    #nextValueCost; // cost of the next value

    constructor() {
        this.#currentValue = 1;
        this.#indexIntoAllValues = 0;
        this.#nextValueCost = 100; // set initial upgrade cost
    }

    getCurrentValue() {
        return this.#currentValue;
    }

    getNextValueCost() {
        return this.#nextValueCost;
    }

    upgrade() {
        this.#indexIntoAllValues++;
        this.#currentValue = this.#allValues[this.#indexIntoAllValues];

        // CHANGE THIS LATER, AFTER TESTING
        this.#nextValueCost = +(this.#nextValueCost * 1.5).toFixed(2);
    }
}