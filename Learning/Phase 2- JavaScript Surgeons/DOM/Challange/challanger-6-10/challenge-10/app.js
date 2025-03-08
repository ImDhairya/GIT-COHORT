const symbols = ["🐶", "🐱", "🐭", "🐰", "🐹", "🦊", "🦁", "🐺"];
const cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let time = 0;
let timerInterval;

const gameContainer = document.getElementById("gameContainer");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameContainer.innerHTML = "";
  shuffle(cards).forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-front">${symbol}</div>
      <div class="card-back">?</div>
    `;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkMatch();
}

function checkMatch() {
  moves++;
  movesDisplay.textContent = moves;

  let isMatch = firstCard.innerHTML === secondCard.innerHTML;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
  moves = 0;
  movesDisplay.textContent = moves;
  clearInterval(timerInterval);
  time = 0;
  timeDisplay.textContent = "0:00";
  startTimer();
  createBoard();
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  startTimer();
  createBoard();
});
