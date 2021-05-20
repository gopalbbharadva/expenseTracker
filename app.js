var firebaseConfig = {
  apiKey: "AIzaSyAgPZCyMlIuQomaxxfWsJcGGSCzWpiLsAQ",
  authDomain: "expensetracker-8ba6c.firebaseapp.com",
  projectId: "expensetracker-8ba6c",
  storageBucket: "expensetracker-8ba6c.appspot.com",
  messagingSenderId: "124015567178",
  appId: "1:124015567178:web:58005032f6c930b199e1b3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const btn = document.querySelector("button");
const result = document.querySelector("h3");
const expenseAmt = document.querySelector("#expenseAmount");
const expenseDesc = document.querySelector("#expenseDesc");
const output = document.querySelector(".output");

let expenseAmount = 0,
  expenseDescription = null;
let expenseAllItems = [];
totalAmount = 0;
const inputHandler = () => {
  expenseAmt.value && expenseDesc.value
    ? (btn.disabled = false)
    : (btn.disabled = true);
};
getData();
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
  addItemDb(currentItem);
  // const tableText = `<div>item amount::${currentItem.item}</div>
  // <div>item description::${currentItem.itemDesc}</div>`;
  // createItem(expenseAllItems);
  // let newItem = createItem(expenseAllItems);
  // showItems(newItem);
  expenseAmt.value = "";
  expenseDesc.value = "";
  inputHandler();
};

function getDate(date) {
  return date.createdAt.toLocaleDateString("en-Us", {
    year:"numeric",
    month:"long",
    day:"numeric"
  });
}

function addItemDb(itemObj) {
  return firebase.firestore().collection("expenses").add({
    itemAmount: itemObj.itemAmt,
    description: itemObj.itemDesc,
    createdAt: itemObj.itemDate
  });
}

function createItem(itemArray) {
  // console.log(itemArray[0].itemAmount);
  return itemArray.map((item) => {
    return `<div class="expenseItem">
    <div style="display:flex;flex-direction:column;align-items:flex-start">
    <p>${item.description}</p>
    </div>
    <div>
    <small>${item.itemAmount} <i class="fas fa-rupee-sign"></i></small>
    <button onclick="deleteItem(${item.createdAt.valueOf()})" style="background:transparent;margin:0;padding:0"><i id="delete"
     class="far fa-trash-alt"></i></button>
    </div>
    </div>`;
  });
}
const tempArr=[];
function getData() {
  firebase
    .firestore()
    .collection("expenses")
    .onSnapshot((snap) => {
      snap.docs.map((item) => {
          tempArr.push(item.data());
          let newItem = createItem(tempArr);
          showItems(newItem);
      });
    });
}

function showItems(itemsArr) {
  const joinedExpenses = itemsArr.join("");
  output.innerHTML = joinedExpenses;
}
function deleteItem(deleteItem) {
  if (window.confirm("Are you sure you want to delete?")) {
      
    // let newArray = [];
    // newArray = expenseAllItems.filter((item) => {
    //   return item.itemDate.valueOf() !== deleteItem;
    // });
    // expenseAllItems = newArray;
    // const newItem = createItem(newArray);
    // showItems(newItem);
  }
}
btn.addEventListener("click", btnHandler);
expenseAmt.addEventListener("input", inputHandler);
expenseDesc.addEventListener("input", inputHandler);
