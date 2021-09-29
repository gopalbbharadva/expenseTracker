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
const form = document.querySelector(".inputDiv");
let currentItem = {};
let expenseList = [];

let expenseAmount = 0,
  expenseDescription = null;
let amtToDelete = 0;
let totalAmount = 0;
const inputHandler = () => {
  expenseAmt.value && expenseDesc.value
    ? (btn.disabled = false)
    : (btn.disabled = true);
};
const btnHandler = (e) => {
  e.preventDefault();
  expenseAmount = expenseAmt.value;
  expenseDescription = expenseDesc.value;

  currentItem.itemAmt = expenseAmount;
  currentItem.itemDesc = expenseDescription;
  currentItem.itemDate = new Date();

  // result.textContent = `Total:${totalAmount}`;
  addItemDb(currentItem);

  expenseAmt.value = "";
  expenseDesc.value = "";
  inputHandler();
};
function getDate(date) {
  let time = `${date.toDate().getHours()}:${date.toDate().getMinutes()}`;
  return time;
}

function addItemDb(itemObj) {
  let d = new Date();
  let str = d.getTime();
  firebase.firestore().collection("expenses").add({
    id: str,
    itemAmount: itemObj.itemAmt,
    description: itemObj.itemDesc,
    createdAt: d,
  });
}
let mainDiv,count=0;
function createItem(itemObj) {
  console.log(count)
  let id = itemObj.doc.data().id;
  mainDiv = document.createElement("div");
  mainDiv.innerHTML =`<div id="${id}" class="expenseItem">
  <div  style="display:flex;flex-direction:column;align-items:flex-start">
  <p>${itemObj.doc.data().description}</p>
  <small>${getDate(itemObj.doc.data().createdAt)}</small>
  </div>
  <div>
  <small id="amt" >${
    itemObj.doc.data().itemAmount
  } <i class="fas fa-rupee-sign"></i></small>
  <button id="delBtn" onclick="deleteItem(${id})"
  style="background:transparent;margin:0;padding:0"><i id="delete"
   class="far fa-trash-alt"></i></button>
  </div>
  </div>`;
  output.appendChild(mainDiv);
}

// function calculateTotal() {
//   // console.log(div);
//   // let element = div.childNodes;
//   // amtToDelete = element[3].innerText;
// }

getData();
function getData() {
  firebase
    .firestore()
    .collection("expenses")
    .orderBy("createdAt")
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      // console.log(changes[0].doc.data().description);
      changes.forEach((item) => {
        if (item.type == "added") {
          count++;
          createItem(item);
          // totalAmount += Number(item.doc.data().itemAmount);
          // console.log(totalAmount)
        } else if (item.type == "removed") {
          count--;
          let div = document.getElementById(item.doc.data().id);
          // calculateTotal(div);
          // totalAmount += item.doc.data().itemAmount;
          div.remove();
          console.log(count)
        }
      });
    });
}

function deleteItem(itemId) {
  let isDelete = window.confirm(
    `Are you sure you want to delete this expense?`
  );
  if (isDelete) {
    let query = firebase
      .firestore()
      .collection("expenses")
      .where("id", "==", itemId);
    query.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }
}
// let del = document.querySelector("#delBtn");
// del.addEventListener("click", () => {
//   totalAmount -= amtToDelete;
// });
form.addEventListener("submit", (e) => btnHandler(e));
expenseAmt.addEventListener("input", inputHandler);
expenseDesc.addEventListener("input", inputHandler);
