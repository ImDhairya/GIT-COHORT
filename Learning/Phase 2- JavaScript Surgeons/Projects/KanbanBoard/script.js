const allBoards = document.querySelectorAll(".board");
const allItems = document.querySelectorAll(".item");
const addTaskBtn = document.getElementById("add-task-btn");
const todoBoard = document.getElementById("todo-board");
const addBoardBtn = document.getElementById("add-board-btn");
const container = document.querySelector(".container");
const removeBtn = document.getElementById("#remove-board");

function removeBoard() {
  const removeBoardBtns = document.querySelectorAll("#remove-board");
  removeBoardBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
    });
  });
}

function attachDragEvents(target) {
  if (target.classList.contains("item")) {
    target.addEventListener("dragstart", () => {
      target.classList.add("flying");
    });

    target.addEventListener("dragend", () => {
      target.classList.remove("flying");
    });
  }

  if (target.classList.contains("board")) {
    target.addEventListener("dragover", (event) => {
      event.preventDefault();
      const flyingElem = document.querySelector(".flying");
      if (flyingElem && flyingElem.classList.contains("item")) {
        target.appendChild(flyingElem);
      }
    });
  }
}

function attachDeleteButton(target) {
  target.style.padding = "10px";
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", () => {
    target.remove();
  });
  target.appendChild(delBtn);
}

function attachEditingProperty(target) {
  target.addEventListener("dblclick", (e) => {
    const input = prompt("Edit the values");
    if (!input) return;
    target.innerText = input;
  });
}

function addEdit(target) {
  console.log(target, "DFSD");
  const btn = document.createElement("button");
  btn.style.margin = "10px";
  btn.textContent = "Edit";
  target.appendChild(btn);
}

addTaskBtn.addEventListener("click", (e) => {
  const input = prompt("What is the task?");
  if (!input) return;

  const taskCard = document.createElement("p");
  taskCard.classList.add("item");
  taskCard.setAttribute("draggable", true);
  taskCard.innerText = input;
  attachDragEvents(taskCard);
  attachEditingProperty(taskCard);
  attachDeleteButton(taskCard);
  todoBoard.appendChild(taskCard);
});

addBoardBtn.addEventListener("click", () => {
  const board = document.createElement("div");
  const heading = document.createElement("h4");
  const rmBtn = document.createElement("button");
  rmBtn.setAttribute("id", "remove-board");
  rmBtn.innerHTML = "remove";

  const input = prompt("Enter the board name");
  if (!input) return;

  heading.innerText = input;
  board.classList.add("board");

  board.setAttribute("id", `${input}-board`);
  board.appendChild(rmBtn);
  board.appendChild(heading);

  // board.addEventListener("dragover", (event) => {
  //   event.preventDefault(); // Allow drop
  //   const flyingElem = document.querySelector(".flying");
  //   if (flyingElem) board.appendChild(flyingElem);
  // });

  attachDragEvents(board);
  container.appendChild(board);
  removeBoard();
});

allItems.forEach((item) => attachDragEvents(item));
allItems.forEach((ele) => {
  attachEditingProperty(ele);
  attachDeleteButton(ele);
});

allBoards.forEach((board) => {
  board.addEventListener("dragover", () => {
    const flyingElem = document.querySelector(".flying");
    board.appendChild(flyingElem);
  });
});
