import { Bank } from "./Bank.js";
import { Button } from "./Button.js";
import { Farm } from "./Farm.js";

const mainButtonBtn = document.getElementById("main-button");
const bankP = document.getElementById("bank");
const upgradeBtn = document.getElementById("upgrade-button");

// Must add each new Farm button to farmBtnArray
let farmBtnArray = [];
const farmOneBtn = document.getElementById("farm1-button");
farmBtnArray.push(farmOneBtn);
const farmTwoBtn = document.getElementById("farm2-button");
farmBtnArray.push(farmTwoBtn);

// Must add each new Farm object to farmArray
let farmArray = [];
let farmOne = new Farm("Farm1", 1, 20, 1.5);
farmArray.push(farmOne);
farmOneBtn.innerText = "Buy " + farmOne.getName() + ": " + farmOne.getNextFarmCost();

let farmTwo = new Farm("Farm2", 10, 200, 1.5);
farmArray.push(farmTwo);
farmTwoBtn.innerText = "Buy " + farmTwo.getName() + ": " + farmTwo.getNextFarmCost();

let bank = new Bank();

let mainButton = new Button();
let mainButtonValue = mainButton.getCurrentValue();
mainButtonBtn.innerText = "Add " + mainButton.getCurrentValue();

upgradeBtn.innerText = "Upgrade Button: " + mainButton.getNextValueCost();

// Add to bank when main button is clicked
mainButtonBtn.addEventListener("click", (e) => {
    bank.add(mainButtonValue);
    updateBankP();
});

// For each farm, allow the player to buy a farm when it is clicked and the player has enough money
for (let i = 0; i < farmBtnArray.length; i++) {
    farmBtnArray[i].addEventListener("click", (e) => {
        if (farmArray[i].getNextFarmCost() <= bank.getTotal()) {
            bank.subtract(farmArray[i].getNextFarmCost());
            farmArray[i].buyFarm();
            updateBankP();
            farmBtnArray[i].innerText = "Buy " + farmArray[i].getName() + ": " + farmArray[i].getNextFarmCost();
        }
    });
}

// Upgrade the main button when it is clicked and the player has enough money
upgradeBtn.addEventListener("click", (e) => {
    if (mainButton.getNextValueCost() <= bank.getTotal()) {
        bank.subtract(mainButton.getNextValueCost());
        mainButton.upgrade();
        mainButtonBtn.innerText = "Add " + mainButton.getCurrentValue();
        upgradeBtn.innerText = "Upgrade Button: " + mainButton.getNextValueCost();
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