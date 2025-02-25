/**
 * Write your challenge solution here
 */
const addBtn = document.getElementById("addButton");
const inputData = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyList = document.getElementsByClassName("empty-list");

let isEmpty = true;

console.log(emptyList.remove);

function createItem(name) {
  let li = document.createElement("li");
  li.className = "task-item";
  console.log(li);
  li.textContent = name;
  return li;
}

addBtn.addEventListener("click", () => {
  taskList.appendChild(createItem(inputData.value));
  console.log(inputData.value);
  if (taskList.children.length > 1) {
    emptyList.style.display = "none";
  }
  console.log(taskList.children.length);
  inputData.value = "";
});

if (taskList.children.length > 1) {
  console.log("fdsaf");
}

list = document.getElementById("taskList");
console.log();
