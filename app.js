const btn = document.querySelector("button");
const result = document.querySelector("h3");
const expenseAmt = document.querySelector("#expenseAmount");
const expenseDesc = document.querySelector("#expenseDesc");

let expenseAmount = 0,
  expenseDescription = null;
totalAmount = 0;
let expenseAllItems = [];
const inputHandler = () => {
  expenseAmt.value ? (btn.disabled = false) : (btn.disabled = true);
};
const btnHandler = () => {
  let currentItem = {};
  expenseAmount = expenseAmt.value;
  expenseDescription = expenseDesc.value;
  totalAmount += parseInt(expenseAmount);
  result.textContent = `Total:${totalAmount}`;
  currentItem.item = expenseAmount;
  currentItem.itemDesc = expenseDescription;
  expenseAllItems.push(currentItem);
  console.table(expenseAllItems);
  expenseAmt.value = "";
  expenseDesc.value = "";
};
btn.addEventListener("click", btnHandler);
expenseAmt.addEventListener("input", inputHandler);
