import { Bank } from "./Bank.js";
import { Button } from "./Button.js";

const mainButtonBtn = document.getElementById("main-button");
const totalCounterP = document.getElementById("total-counter");

let mainButton = new Button();
let bank = new Bank();

let mainButtonText = "Add ";
let mainButtonValue = mainButton.getCurrentValue();

mainButtonBtn.addEventListener("click", (e) => {
    bank.add(mainButtonValue);
    totalCounterP.innerText = "" + bank.getTotal();
});