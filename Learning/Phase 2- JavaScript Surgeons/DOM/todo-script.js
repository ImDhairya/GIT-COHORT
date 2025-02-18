const addBtn = document.getElementById("add-btn");
const todoItemsContainer = document.getElementById("todo-items-container");
const deleteAll = document.getElementById("delete-all");
const todoInput = document.getElementById("todo-input");

addBtn.addEventListener("click", () => {
  const value = todoInput.value;
  console.log("User entered ", value);

  const li = document.createElement("li");
  li.innerHTML = value;

  const delButton = document.createElement("button");
  delButton.innerText = "X";

  delButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(delButton);

  todoItemsContainer.appendChild(li);
  todoInput.value = "";
});

deleteAll.addEventListener("click", () => {
  todoItemsContainer.innerHTML = "";
});
