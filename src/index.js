import { Bank } from "./Bank.js";
import { Button } from "./Button.js";
import { Farm } from "./Farm.js";

const mainButtonBtn = document.getElementById("main-button");
const bankP = document.getElementById("bank");
const farmOneBtn = document.getElementById("farm1-button");

let mainButton = new Button();
let bank = new Bank();

let farmOne = new Farm("Farm1", 1, 20, 1.2);
farmOneBtn.innerText = "Buy " + farmOne.getName() + ": " + farmOne.getNextFarmCost();

let mainButtonText = "Add ";
let mainButtonValue = mainButton.getCurrentValue();

mainButtonBtn.addEventListener("click", (e) => {
    bank.add(mainButtonValue);
    updateTotalCounterP();
});

farmOneBtn.addEventListener("click", (e) => {
    if (farmOne.getNextFarmCost() <= bank.getTotal()) {
        bank.subtract(farmOne.getNextFarmCost());
        farmOne.buyFarm();
        updateTotalCounterP();
        farmOneBtn.innerText = "Buy " + farmOne.getName() + ": " + farmOne.getNextFarmCost();
    }
});

function updateTotalCounterP() {
    bankP.innerText = "" + bank.getTotal();
}
const intervalID = setInterval(harvest, 1000);
function harvest() {
    let total = 0;

    // farm one
    total += farmOne.getTotalAmountPerSecond();

    bank.add(total);
    updateTotalCounterP();
}

function endHarvest() {
    clearInterval(intervalID);
}