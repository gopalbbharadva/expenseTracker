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
  currentItem.itemDate = new Date();

  // console.log(currentItem.itemDate);

  expenseAllItems.push(currentItem);
  // console.table(expenseAllItems);

  // const tableText = `<div>item amount::${currentItem.item}</div>
  // <div>item description::${currentItem.itemDesc}</div>`;

  const newItem = createItem(expenseAllItems);
  showItems(newItem);
  expenseAmt.value = "";
  expenseDesc.value = "";
};

function getDate(date) {
  return date.itemDate.toLocaleTimeString("en-Us", {});
}

function createItem(itemArray) {
  return itemArray.map((item) => {
    return `<div class="expenseItem">
    <div style="display:flex;flex-direction:column;align-items:flex-start">
    <p>${item.itemDesc}</p>
    <small>${getDate(item)}</small>
    </div>
    <div>
    <small>${item.itemAmt} <i class="fas fa-rupee-sign"></i></small>
    <button onclick="deleteItem(${item.itemDate.valueOf()})" style="background:transparent;margin:0;padding:0"><i id="delete"
     class="far fa-trash-alt"></i></button>
    </div>
    </div>`;
  });
}

function showItems(itemsArr) {
  const joinedExpenses = itemsArr.join("");
  output.innerHTML = joinedExpenses;
}

function deleteItem(deleteItem) {
  let newArray = [];
  newArray = expenseAllItems.filter((item) => {
    return item.itemDate.valueOf() !== deleteItem;
  });
  expenseAllItems = newArray;
  const newItem = createItem(newArray);
  showItems(newItem);
}
btn.addEventListener("click", btnHandler);
expenseAmt.addEventListener("input", inputHandler);
expenseDesc.addEventListener("input", inputHandler);
