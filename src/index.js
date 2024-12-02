import { Bank } from "./Bank.js";
import { Button } from "./Button.js";
import { Farm } from "./Farm.js";

const mainButtonBtn = document.getElementById("main-button");
const bankP = document.getElementById("bank");
const upgradeBtn = document.getElementById("upgrade-button");

// Must add each new Farm button to farmBtnArray
let farmBtnArray = [];
const farmOneBtn = document.getElementById("farm1-button");
farmOneBtn.disabled = true;
farmBtnArray.push(farmOneBtn);
const farmTwoBtn = document.getElementById("farm2-button");
farmBtnArray.push(farmTwoBtn);
farmTwoBtn.disabled = true;

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
mainButtonBtn.innerText = "Add " + mainButton.getCurrentValue();

upgradeBtn.innerText = "Upgrade Button: " + mainButton.getNextValueCost();
upgradeBtn.disabled = true;

// Add to bank when main button is clicked
mainButtonBtn.addEventListener("click", (e) => {
    bank.add(mainButton.getCurrentValue());
    update();
});

// For each farm, allow the player to buy a farm when it is clicked and the player has enough money
for (let i = 0; i < farmBtnArray.length; i++) {
    farmBtnArray[i].addEventListener("click", (e) => {
        if (farmArray[i].getNextFarmCost() <= bank.getTotal()) {
            bank.subtract(farmArray[i].getNextFarmCost());
            farmArray[i].buyFarm();
            update();
            farmBtnArray[i].innerText = "Buy " + farmArray[i].getName() + ": " + farmArray[i].getNextFarmCost();
        }
    });
}

// Upgrade the main button when it is clicked and the player has enough money
upgradeBtn.addEventListener("click", (e) => {
    if (mainButton.getNextValueCost() <= bank.getTotal()) {
        bank.subtract(mainButton.getNextValueCost());
        update();
        mainButton.upgrade();
        mainButtonBtn.innerText = "Add " + mainButton.getCurrentValue();
        upgradeBtn.innerText = "Upgrade Button: " + mainButton.getNextValueCost();
    }
});

// Updates all updatable items on the screen
function update() {
    updateBankP();
    enableAffordableButtons();
}

// Updates the text of the bank
function updateBankP() {
    bankP.innerText = "" + bank.getTotal();
}

function enableAffordableButtons() {
    // Farms
    for (let i = 0; i < farmBtnArray.length; i++) {
        if (bank.getTotal() >= farmArray[i].getNextFarmCost()) {
            farmBtnArray[i].disabled = false;
        } else {
            farmBtnArray[i].disabled = true;
        }
    }

    // Upgrade
    if (bank.getTotal() >= mainButton.getNextValueCost()) {
        upgradeBtn.disabled = false;
    } else {
        upgradeBtn.disabled = true;
    }
}

// Loop clock code
const intervalID = setInterval(harvest, 1000);
function harvest() {
    let total = 0;

    farmArray.forEach(farm => {
        total += farm.getTotalAmountPerSecond();
    });

    bank.add(total);
    update();
}

function endHarvest() {
    clearInterval(intervalID);
}

// DEBUGGING CODE
const debugAddInput = document.getElementById("debug-add-input");
const debugAddBtn = document.getElementById("debug-add-button");

debugAddBtn.addEventListener("click", (e) => {
    const input = Number(debugAddInput.value);
    if (!isNaN(input) && isFinite(input)) {
        bank.add(input);
        update();
    }
});