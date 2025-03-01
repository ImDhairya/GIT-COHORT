/**
 * Write your challenge solution here
 */
const addBtn = document.getElementById("addButton");
const inputData = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyList = document.getElementsByClassName("empty-list");
const deleteBtn = document.getElementById("delbtn");
const checkId = document.getElementById("checkId");

let isEmpty = true;

// console.log(emptyList.remove);

function createItem(name) {
  let li = document.createElement("li");
  let Delete = document.createElement("button");
  Delete.id = "delbtn";
  let check = document.createElement("input");
  check.id = "checkId";
  check.type = "checkbox";
  Delete.innerText = "Delete";
  Delete.addEventListener("click", (e) => {
    console.log("HEFEHSED");
  });

  li.className = "task-item";
  console.log(li);
  li.textContent = name;
  li.appendChild(check);
  li.appendChild(Delete);
  return li;
}

addBtn.addEventListener("click", () => {
  taskList.appendChild(createItem(inputData.value));

  console.log(inputData.value);
  if (taskList.children.length > 1) {
    // emptyList.style.display = "none";
  }
  console.log(taskList.children.length);
  inputData.value = "";
});

if (taskList.children.length > 1) {
  console.log("fdsaf");
}

list = document.getElementById("taskList");
console.log();

/* 
avatar
Dhairya Pandya .
(You)
11:02 PM
I have a question, bind will return a function, apply will execute the function then what will call do?
MP
Mukul Padwal
11:03 PM
-> bind():Returns a new function with this fixed.

-> apply(): Calls the function immediately, passing arguments as an array.

-> call(): Calls the function immediately, passing arguments one by one
avatar
Dhairya Pandya .
(You)
11:45 PM
Args ke undar function aur delay hota hai kay?
avatar
Dhairya Pandya .
(You)
11:46 PM
Matlab parent function ke andar jo bhi arguments milte hai
MP
Mukul Padwal
11:48 PM
...args me sirf wahi hota hai jo aap function ko pass karte ho, function ya delay tabhi hoga jab aap khud doge.
*/

/* 
Args ke undar function aur delay hota hai kay?
AJ
Anirudh Jwala
11:49 PM
args contains only the arguments passed to the debounced function, not the function (cb) or delay
*/
