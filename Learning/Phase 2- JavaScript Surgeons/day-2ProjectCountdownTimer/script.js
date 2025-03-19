const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");
let isPaused = false;

const countDownDisplay = document.getElementById("countdownDisplay");
const timeInput = document.getElementById("timeInput");

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);

function pauseTimer() {
  isPaused = true;
}

function resumeTimer() {
  isPaused = false;
}

function startTimer() {
  let valueInSeconds = parseInt(timeInput.value);
  console.log("Button clicked");
  if (isNaN(valueInSeconds)) {
    alert("Please enter a valid number");
    return;
  }

  timeRemaining = valueInSeconds;
  countDownDisplay.innerText = `Time remaining :${resumeTimer} seconds`;

  if (valueInSeconds <= 0) {
    alert("Please enter seconds greater than zero");
  }

  const timer = setInterval(() => {
    if (!isPaused) {
      valueInSeconds--;
      if (valueInSeconds < 0) {
        clearInterval(timer);
        countDownDisplay.innerText = "Times up";
      }
      countDownDisplay.innerText = `Time remaining ${valueInSeconds} seconds`;
    }
  }, 1000);

  console.log(valueInSeconds, typeof valueInSeconds);
}
