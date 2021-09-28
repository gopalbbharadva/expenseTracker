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

let expenseAmount = 0,
  expenseDescription = null;
totalAmount = 0;
const inputHandler = () => {
  expenseAmt.value && expenseDesc.value
    ? (btn.disabled = false)
    : (btn.disabled = true);
};
const btnHandler = (e) => {
  e.preventDefault();
  expenseAmount = expenseAmt.value;
  expenseDescription = expenseDesc.value;

  totalAmount += parseInt(expenseAmount);
  result.textContent = `Total:${totalAmount}`;

  currentItem.itemAmt = expenseAmount;
  currentItem.itemDesc = expenseDescription;
  currentItem.itemDate = new Date();

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
let mainDiv;
function createItem(itemObj) {
  let id = itemObj.doc.data().id;
  mainDiv = document.createElement("div");
  mainDiv.innerHTML = `<div id="${id}" class="expenseItem">
  <div  style="display:flex;flex-direction:column;align-items:flex-start">
  <p>${itemObj.doc.data().description}</p>
  <small>${getDate(itemObj.doc.data().createdAt)}</small>
  </div>
  <div>
  <small>${
    itemObj.doc.data().itemAmount
  } <i class="fas fa-rupee-sign"></i></small>
  <button onclick="deleteItem(${id})"
  style="background:transparent;margin:0;padding:0"><i id="delete"
   class="far fa-trash-alt"></i></button>
  </div>
  </div>`;
  output.appendChild(mainDiv);
}
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
          createItem(item);
        } else if (item.type == "removed") {
          let div = document.getElementById(item.doc.data().id);
          div.remove();
        }
      });
    });
}

function deleteItem(itemId, itemDate) {
  console.log(itemId);
  console.log(itemDate);
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
form.addEventListener("submit", (e) => btnHandler(e));
expenseAmt.addEventListener("input", inputHandler);
expenseDesc.addEventListener("input", inputHandler);
