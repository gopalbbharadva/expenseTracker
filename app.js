const btn = document.querySelector("button");
const result = document.querySelector("h3");
const expenseAmt = document.querySelector("#expenseAmount");
const expenseDesc = document.querySelector("#expenseDesc");
const output = document.querySelector(".output");

let expenseAmount = 0,
  expenseDescription = null;
totalAmount = 0;
let expenseAllItems = [];
const inputHandler = () => {
  expenseAmt.value && expenseDesc.value
    ? (btn.disabled = false)
    : (btn.disabled = true);
};
const btnHandler = () => {
  let currentItem = {};
  expenseAmount = expenseAmt.value;
  expenseDescription = expenseDesc.value;

  totalAmount += parseInt(expenseAmount);
  result.textContent = `Total:${totalAmount}`;

  currentItem.itemAmt = expenseAmount;
  currentItem.itemDesc = expenseDescription;

  expenseAllItems.push(currentItem);
  // console.table(expenseAllItems);

  // const tableText = `<div>item amount::${currentItem.item}</div>
  // <div>item description::${currentItem.itemDesc}</div>`;

  const newItem = expenseAllItems.map((item) => {
    return `<div class="expenseItem">
    <p>${item.itemDesc}</p>
    <div>
    <small>${item.itemAmt} <i class="fas fa-rupee-sign"></i></small>
    <i id="delete" class="far fa-trash-alt"></i>
    </div>
    </div>`;
  });

  const joinedExpenses = newItem.join("");
  console.log(joinedExpenses);

  output.innerHTML = joinedExpenses;
  expenseAmt.value = "";
  expenseDesc.value = "";
};

btn.addEventListener("click", btnHandler);
expenseAmt.addEventListener("input", inputHandler);
expenseDesc.addEventListener("input", inputHandler);
