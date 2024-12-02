import { Bank } from "./Bank.js";
import { Button } from "./Button.js";
import { Farm } from "./Farm.js";

const mainButtonBtn = document.getElementById("main-button");
const bankP = document.getElementById("bank");
const farmOneBtn = document.getElementById("farm1-button");
const farmTwoBtn = document.getElementById("farm2-button");

let mainButton = new Button();
let bank = new Bank();

let farmArray = [];
let farmOne = new Farm("Farm1", 1, 20, 1.5);
farmArray.push(farmOne);
farmOneBtn.innerText = "Buy " + farmOne.getName() + ": " + farmOne.getNextFarmCost();

let farmTwo = new Farm("Farm2", 10, 200, 1.5);
farmArray.push(farmTwo);
farmTwoBtn.innerText = "Buy " + farmTwo.getName() + ": " + farmTwo.getNextFarmCost();

let mainButtonText = "Add ";
let mainButtonValue = mainButton.getCurrentValue();

mainButtonBtn.addEventListener("click", (e) => {
    bank.add(mainButtonValue);
    updateBankP();
});

farmOneBtn.addEventListener("click", (e) => {
    if (farmOne.getNextFarmCost() <= bank.getTotal()) {
        bank.subtract(farmOne.getNextFarmCost());
        farmOne.buyFarm();
        updateBankP();
        farmOneBtn.innerText = "Buy " + farmOne.getName() + ": " + farmOne.getNextFarmCost();
    }
});

farmTwoBtn.addEventListener("click", (e) => {
    if (farmTwo.getNextFarmCost() <= bank.getTotal()) {
        bank.subtract(farmTwo.getNextFarmCost());
        farmTwo.buyFarm();
        updateBankP();
        farmTwoBtn.innerText = "Buy " + farmTwo.getName() + ": " + farmTwo.getNextFarmCost();
    }
});

// Updates the text of the bank
function updateBankP() {
    bankP.innerText = "" + bank.getTotal();
}

// Loop clock code
const intervalID = setInterval(harvest, 1000);
function harvest() {
    let total = 0;

    farmArray.forEach(farm => {
        total += farm.getTotalAmountPerSecond();
    });

    bank.add(total);
    updateBankP();
}

function endHarvest() {
    clearInterval(intervalID);
}